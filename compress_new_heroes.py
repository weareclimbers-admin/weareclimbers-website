from PIL import Image
import os

def compress_to_webp(input_path, output_path, quality=85):
    try:
        # Ouvrir et convertir
        img = Image.open(input_path)

        # Convertir en RGB si nécessaire
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGB')

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

# Compresser les deux nouvelles images hero
print("Compression des nouvelles images hero en WebP...\n")
compress_to_webp("public/hero-roadmap-rse.jpg", "public/hero-roadmap-rse.webp", quality=85)
compress_to_webp("public/hero-fonctionnalites.jpg", "public/hero-fonctionnalites.webp", quality=85)

print("Compression terminee!")
