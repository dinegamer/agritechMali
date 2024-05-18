import os

def check_image_formats(directory):
    unsupported_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp')):
                continue  # Fichier dans un format pris en charge, passe au suivant
            else:
                unsupported_files.append(os.path.join(root, file))
    return unsupported_files

# Spécifiez le chemin d'accès complet au répertoire contenant les images
directory = 'chemin/vers/votre/repertoire'

# Vérifiez les formats des images dans le répertoire spécifié
unsupported_files = check_image_formats(directory)

# Affichez les fichiers qui ne sont pas dans un format pris en charge
if unsupported_files:
    print("Les fichiers suivants ne sont pas dans un format pris en charge :")
    for file in unsupported_files:
        print(file)
else:
    print("Toutes les images sont dans des formats pris en charge (JPEG, PNG, GIF, BMP).")
