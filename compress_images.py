"""
Convertit les images hero en WebP avec compression
"""
from PIL import Image
import os

def compress_to_webp(input_path, output_path, quality=85):
    """Convertit une image JPG en WebP avec compression"""
    try:
        img = Image.open(input_path)

        # Redimensionner si l'image est trop grande (max 1920px de largeur)
        max_width = 1920
        if img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.LANCZOS)

        # Sauvegarder en WebP
        img.save(output_path, 'WEBP', quality=quality, method=6)

        # Afficher les tailles
        input_size = os.path.getsize(input_path) / (1024 * 1024)
        output_size = os.path.getsize(output_path) / (1024 * 1024)
        compression_ratio = (1 - output_size / input_size) * 100

        print(f"OK {os.path.basename(input_path)}")
        print(f"  Taille originale: {input_size:.2f} MB")
        print(f"  Taille WebP: {output_size:.2f} MB")
        print(f"  Compression: {compression_ratio:.1f}%\n")

    except Exception as e:
        print(f"Erreur pour {input_path}: {str(e)}")

# Compresser les deux images hero
print("Compression des images hero en WebP...\n")
compress_to_webp("public/hero-home.jpg", "public/hero-home.webp", quality=85)
compress_to_webp("public/hero-mission.jpg", "public/hero-mission.webp", quality=85)

print("Compression terminee!")
