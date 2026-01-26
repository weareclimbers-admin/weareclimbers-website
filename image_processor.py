"""
Script de traitement d'images par lot
Applique des réglages colorimétriques similaires à un preset Lightroom

Paramètres appliqués:
- Température: -35
- Teinte: -68
- Contraste: -100
- Tons clairs: +4
- Ombres: -10
- Brillance: -25
- Saturation: -10

Installation requise:
pip install Pillow numpy opencv-python
"""

from PIL import Image, ImageEnhance
import numpy as np
import cv2
import os
from pathlib import Path


def apply_temperature(image, value):
    """
    Applique un réglage de température (-100 à +100)
    Valeurs négatives = plus froid (bleuté)
    Valeurs positives = plus chaud (orangé)
    """
    # Convertir PIL Image en array numpy
    img_array = np.array(image, dtype=np.float32)

    # Normaliser la valeur entre -1 et 1
    temp_factor = value / 100.0

    if temp_factor < 0:  # Plus froid
        # Augmenter le bleu, diminuer le rouge
        img_array[:, :, 0] = np.clip(img_array[:, :, 0] * (1 + temp_factor * 0.3), 0, 255)  # R
        img_array[:, :, 2] = np.clip(img_array[:, :, 2] * (1 - temp_factor * 0.3), 0, 255)  # B
    else:  # Plus chaud
        # Augmenter le rouge, diminuer le bleu
        img_array[:, :, 0] = np.clip(img_array[:, :, 0] * (1 + temp_factor * 0.3), 0, 255)  # R
        img_array[:, :, 2] = np.clip(img_array[:, :, 2] * (1 - temp_factor * 0.3), 0, 255)  # B

    return Image.fromarray(img_array.astype(np.uint8))


def apply_tint(image, value):
    """
    Applique un réglage de teinte (-100 à +100)
    Valeurs négatives = plus vert
    Valeurs positives = plus magenta
    """
    img_array = np.array(image, dtype=np.float32)
    tint_factor = value / 100.0

    if tint_factor < 0:  # Plus vert
        img_array[:, :, 1] = np.clip(img_array[:, :, 1] * (1 - tint_factor * 0.2), 0, 255)  # G
    else:  # Plus magenta
        img_array[:, :, 0] = np.clip(img_array[:, :, 0] * (1 + tint_factor * 0.15), 0, 255)  # R
        img_array[:, :, 2] = np.clip(img_array[:, :, 2] * (1 + tint_factor * 0.15), 0, 255)  # B
        img_array[:, :, 1] = np.clip(img_array[:, :, 1] * (1 - tint_factor * 0.1), 0, 255)   # G

    return Image.fromarray(img_array.astype(np.uint8))


def apply_contrast(image, value):
    """
    Applique un réglage de contraste (-100 à +100)
    Note: -100 = 0 contraste (gris), 0 = normal, +100 = double contraste
    """
    # Limiter le contraste minimum à -50 pour éviter les images grises
    # Un contraste de -100 donnerait factor=0 ce qui rend l'image complètement grise
    if value < -50:
        # Pour des valeurs très basses, on limite à 0.5 minimum
        factor = 0.5 + (value + 100) / 100.0 * 0.5
    else:
        factor = 1.0 + (value / 100.0)

    enhancer = ImageEnhance.Contrast(image)
    return enhancer.enhance(factor)


def apply_highlights_shadows(image, highlights, shadows):
    """
    Applique des réglages de tons clairs et ombres
    highlights: -100 à +100
    shadows: -100 à +100
    """
    img_array = np.array(image, dtype=np.float32)

    # Créer un masque pour les hautes lumières (pixels clairs)
    gray = cv2.cvtColor(img_array.astype(np.uint8), cv2.COLOR_RGB2GRAY)
    highlight_mask = (gray > 180).astype(np.float32)
    shadow_mask = (gray < 75).astype(np.float32)

    # Appliquer le réglage des tons clairs
    if highlights != 0:
        highlight_factor = 1 + (highlights / 100.0) * 0.3
        for i in range(3):
            img_array[:, :, i] = img_array[:, :, i] * (1 - highlight_mask) + \
                                 img_array[:, :, i] * highlight_factor * highlight_mask

    # Appliquer le réglage des ombres
    if shadows != 0:
        shadow_factor = 1 + (shadows / 100.0) * 0.4
        for i in range(3):
            img_array[:, :, i] = img_array[:, :, i] * (1 - shadow_mask) + \
                                 img_array[:, :, i] * shadow_factor * shadow_mask

    img_array = np.clip(img_array, 0, 255)
    return Image.fromarray(img_array.astype(np.uint8))


def apply_brightness(image, value):
    """
    Applique un réglage de brillance (-100 à +100)
    """
    factor = 1 + (value / 100.0)
    enhancer = ImageEnhance.Brightness(image)
    return enhancer.enhance(factor)


def apply_saturation(image, value):
    """
    Applique un réglage de saturation (-100 à +100)
    """
    factor = 1 + (value / 100.0)
    enhancer = ImageEnhance.Color(image)
    return enhancer.enhance(factor)


def process_image(input_path, output_path, settings):
    """
    Traite une image avec les réglages spécifiés
    """
    try:
        # Ouvrir l'image
        image = Image.open(input_path)

        # Convertir en RGB si nécessaire
        if image.mode != 'RGB':
            image = image.convert('RGB')

        print(f"Traitement de {input_path.name}...")

        # Appliquer les réglages dans l'ordre
        image = apply_temperature(image, settings['temperature'])
        image = apply_tint(image, settings['tint'])
        image = apply_contrast(image, settings['contrast'])
        image = apply_highlights_shadows(image, settings['highlights'], settings['shadows'])
        image = apply_brightness(image, settings['brightness'])
        image = apply_saturation(image, settings['saturation'])

        # Sauvegarder l'image
        image.save(output_path, quality=95)
        print(f"✓ Sauvegardé: {output_path.name}")

    except Exception as e:
        print(f"✗ Erreur pour {input_path.name}: {str(e)}")


def process_folder(input_folder, output_folder, settings):
    """
    Traite toutes les images d'un dossier
    """
    # Créer le dossier de sortie s'il n'existe pas
    output_folder.mkdir(parents=True, exist_ok=True)

    # Extensions d'images supportées
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'}

    # Trouver toutes les images
    image_files = [f for f in input_folder.iterdir()
                   if f.is_file() and f.suffix.lower() in image_extensions]

    if not image_files:
        print(f"Aucune image trouvée dans {input_folder}")
        return

    print(f"\n{len(image_files)} images trouvées")
    print(f"Dossier de sortie: {output_folder}\n")

    # Traiter chaque image
    for i, input_path in enumerate(image_files, 1):
        print(f"[{i}/{len(image_files)}] ", end="")
        output_path = output_folder / input_path.name
        process_image(input_path, output_path, settings)

    print(f"\n✓ Traitement terminé! {len(image_files)} images traitées.")


if __name__ == "__main__":
    # Paramètres de réglage (équivalent preset AR05)
    settings = {
        'temperature': -35,   # Plus froid (bleuté)
        'tint': -68,          # Plus vert
        'contrast': 0,     # Contraste réduit
        'highlights': 4,      # Tons clairs légèrement augmentés
        'shadows': -10,       # Ombres légèrement réduites
        'brightness': -25,    # Brillance réduite
        'saturation': -10     # Saturation légèrement réduite
    }

    # Chemins des dossiers
    # Modifie ces chemins selon tes besoins
    input_folder = Path("./images_input")
    output_folder = Path("./images_output")

    print("=" * 60)
    print("TRAITEMENT D'IMAGES - PRESET AR05")
    print("=" * 60)
    print("\nParamètres appliqués:")
    for key, value in settings.items():
        print(f"  {key}: {value:+d}" if value != 0 else f"  {key}: {value}")
    print()

    # Vérifier que le dossier d'entrée existe
    if not input_folder.exists():
        print(f"Erreur: Le dossier '{input_folder}' n'existe pas!")
        print(f"\nCrée un dossier '{input_folder}' et place tes images dedans,")
        print("puis relance le script.")
    else:
        # Traiter les images
        process_folder(input_folder, output_folder, settings)
