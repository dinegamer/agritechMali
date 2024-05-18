from flask_mongoengine import MongoEngine

# Initialisation de l'extension MongoEngine
db = MongoEngine()

def initialize_db(app):
    # Configuration de l'URL de connexion à MongoDB
    app.config['MONGODB_SETTINGS'] = {
        'host': 'mongodb+srv://teenagerdine:Teenagerdine98@cluster0.zqwg2av.mongodb.net/agri'
    }
    # Initialisation de l'extension avec l'application Flask
    db.init_app(app)

