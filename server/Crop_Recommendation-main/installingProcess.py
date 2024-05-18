import subprocess

# Liste des bibliothèques à installer
libraries = [
    "joblib",
    "scikit-learn",
    "matplotlib",
    "seaborn",
    "pandas",
    "numpy"
]

# Installer chaque bibliothèque
for lib in libraries:
    subprocess.call(["pip", "install", lib])

print("Toutes les bibliothèques ont été installées avec succès !")
