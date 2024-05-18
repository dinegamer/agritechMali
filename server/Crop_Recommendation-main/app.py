from flask import Flask, request, jsonify, render_template, redirect, abort, url_for, session
# from flask_oauthlib.client import OAuth
import numpy as np
import joblib
import os
from flask_cors import CORS, cross_origin
from openai import OpenAI, Completion
from dotenv import load_dotenv
from flask_pymongo import PyMongo
from bson import ObjectId
import bcrypt
import jwt
from datetime import datetime, timedelta
from marshmallow import Schema, fields, ValidationError
import requests  # Importez le module requests
from google_auth_oauthlib.flow import Flow
from google.oauth2 import id_token
from pip._vendor import cachecontrol
import google.auth.transport.requests
import pathlib
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai
from dotenv import load_dotenv
import tensorflow as tf
import numpy as np
from tensorflow import keras
from skimage import io
from tensorflow.keras.preprocessing import image
# Flask utils
from werkzeug.utils import secure_filename
# from gevent.pywsgi import WSGIServer
from PIL import Image


# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Accéder à la variable d'environnement
# SITE_SECRET = os.getenv('SITE_SECRET')
# APP_SECRET_KEY = 'your_secret_key_here'
app = Flask(__name__)
CORS(app)
# openai_api_key = os.getenv("OPENAI_API_KEY")
# if not openai_api_key:
#     raise ValueError("OpenAI API key not configured")

# # Créer une instance de client OpenAI
# client = OpenAI(api_key=openai_api_key)

# Récupérer le chemin absolu du répertoire actuel
dir_path = os.path.dirname(os.path.realpath(__file__))

# Charger les modèles et les scalers en utilisant le chemin absolu
model = joblib.load(os.path.join(dir_path, 'model.joblib'))
sc = joblib.load(os.path.join(dir_path, 'standscaler.joblib'))
mx = joblib.load(os.path.join(dir_path, 'minmaxscaler.joblib'))

base_dir2 = os.path.dirname(__file__)

# Chemin relatif vers le dossier contenant le modèle
model_dir2 = os.path.join(base_dir2, 'Plante')

# Charger le modèle depuis le dossier "Plante"
model_path2 = os.path.join(model_dir2, 'model.keras')
model2 = tf.keras.models.load_model(model_path2, compile=False)



# Définir les limites d'utilisation du modèle
MODEL_TPM_LIMIT = 90000  # Limite TPM pour le modèle gpt-3.5-turbo-instruct

@app.after_request
def add_cors_headers(response):
    # Ajouter les en-têtes CORS
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers["Access-Control-Allow-Headers"] = "Access-Control-Request-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept"
    return response

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/predict", methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        # Répondre aux requêtes OPTIONS avec les en-têtes CORS appropriés
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        return response
    
    try:
        data = request.json
        # Récupérer les données
        N = float(data['Nitrogen'])
        P = float(data['Phosporus'])
        K = float(data['Potassium'])
        temp = float(data['Temperature'])
        humidity = float(data['Humidity'])
        ph = float(data['pH'])
        rainfall = float(data['Rainfall'])

        if any(np.isnan(x) for x in [N, P, K, temp, humidity, ph, rainfall]):
            return jsonify({'error': 'Invalid data format. Please enter numerical values'}), 400

        # Scaling
        features = np.array([[N, P, K, temp, humidity, ph, rainfall]])
        mx_features = mx.transform(features)
        sc_mx_features = sc.transform(mx_features)

        # Prediction
        prediction = model.predict(sc_mx_features)

        crop_dict = {
            1: "Le riz", 2: "Le maïs", 3: "Le jute", 4: "Le coton", 5: "La noix de coco", 6: "La papaye", 7: "L'orange",
            8: "La pomme", 9: "Le cantaloup", 10: "La pastèque", 11: "Le raisin", 12: "La mangue", 13: "La banane",
            14: "La grenade", 15: "La lentille", 16: "Le gram noir", 17: "Le haricot mungo", 18: "Les haricots moth",
            19: "Le pois d'Angole", 20: "Le haricot rouge", 21: "Le pois chiche", 22: "Le café"
        }

        if prediction[0] in crop_dict:
            crop = crop_dict[prediction[0]]
            result = f"{crop} est la meilleure culture à cultiver ici"
        else:
            result = "Désolé, nous n'avons pas pu déterminer la meilleure culture à cultiver avec les données fournies."

    except ValueError as e:
        print(f"Error: Invalid data type ({type(e)}) - {e}")
        return jsonify({'error': 'Invalid data format'}), 400

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'status': e , 'message': str(e)}), 500
    
    return result

# @app.route("/chat", methods=['POST'])
# def chat():
#     data = request.json
#     message = data.get('message', '')

#     try:
#         # Créer une complétion de texte en utilisant la méthode create de l'instance de client OpenAI
#         response = client.completions.create(
#             model="gpt-3.5-turbo-instruct",  # Utiliser le modèle recommandé
#             prompt=message,  # Utiliser le message comme prompt
#             max_tokens=100,
#             temperature=0.5
#         )

#         # Filtrer la réponse pour ne récupérer que les informations liées à l'agriculture
#         agriculture_keywords = ['agriculture', 'cultiver', 'culture', 'récolte', 'terre', 'champ']
#         filtered_response = ""
#         for choice in response.choices:
#             text = choice.text.lower()
#             if any(keyword in text for keyword in agriculture_keywords):
#                 filtered_response += text + "\n"

#         if filtered_response:
#             return jsonify({"message": filtered_response})
#         else:
#             return jsonify({"message": "Désolé, je n'ai pas d'informations sur l'agriculture"}), 404

#     except Exception as e:
#         print(e)
#         return jsonify({'error': str(e)}), 400
    

app.config["MONGO_URI"] = "mongodb+srv://root_shams:teenager98@cluster0.pzoqc.mongodb.net/agri?retryWrites=true&w=majority"
mongo = PyMongo(app)

# Schema de validation pour les données utilisateur
class UserSchema(Schema):
    firstName = fields.Str(required=True)
    lastName = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=lambda p: len(p) >= 6)

user_schema = UserSchema()

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json

    try:
        # Valider les données utilisateur
        user_schema.load(data)
    except ValidationError as e:
        return jsonify({'error': 'Invalid data', 'details': e.messages}), 400

    # Crypter le mot de passe
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Insérer l'utilisateur dans la base de données
    users_collection = mongo.db.users
    existing_user = users_collection.find_one({'email': data['email']})
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    new_user = {
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'email': data['email'],
        'password': hashed_password,
        # Ajouter plus de champs au besoin
    }

    users_collection.insert_one(new_user)
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login_user():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    users_collection = mongo.db.users
    user = users_collection.find_one({'email': email})

    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'error': 'Email ou mot de passe incorrect'}), 401

    # Si l'authentification réussit, vous pouvez simplement retourner un message de succès
    # Vous n'avez pas besoin de générer un token dans ce cas

    return jsonify({'message': 'Connexion réussie'}), 200

@app.route('/verify', methods=['POST'])
def verify_captcha():
    captcha_response = request.form.get('captchaValue')
    secret_key = '6Lc0xtUpAAAAADd5G1IlPZYG1worQzXzFQ23flja'  # Remplacez par votre clé secrète
    remote_ip = request.remote_addr

    # Effectuer la vérification du captcha en envoyant une requête POST à l'API Google reCAPTCHA
    response = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data={
            'secret': secret_key,
            'response': captcha_response,
            'remoteip': remote_ip
        }
    )

    data = response.json()


    # Retourner la réponse de la vérification du captcha
    return jsonify(data)


app.secret_key = "Labati78@gmail"

GOOGLE_CLIENT_ID = "375411593459-q4tahblhta4pjns0e1u6reodkgnh9g9v.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    # redirect_uri="http://127.0.0.1:5000/callback"
    redirect_uri="http://127.0.0.1:3000/dashboard"
)


def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            abort(401)
        else:
            return function(*args, **kwargs)
    return wrapper

@app.route("/google_register")
@cross_origin()
def google_register():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)

@app.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    
    if not session["state"] == request.args["state"]:
        abort(500)  
        
    credentials = flow.credentials
    request_session = flow.authorized_session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)
    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )
    
    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")

    return redirect("/protected_area")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("http://localhost:3000/")

# @app.route("/l")
# def index():
#     return "Hello world <a href='/login'><button>Se Connecter</button></a>"

@app.route("/protected_area")
@login_is_required
def protected_area():
    return "Page protégée <a href='/logout'><button>Se Déconnecter</button></a>"


@app.route('/check_db_connection')
def check_db_connection():
    try:
        # Utilisez le ping pour vérifier la connexion
        mongo.cx.server_info()
        return jsonify({'message': 'Connected to MongoDB database'}), 200
    except Exception as e:
        return jsonify({'error': 'Failed to connect to MongoDB database', 'details': str(e)}), 500
    
    


    
##########################################DETECTION MALADIES #########################################

# Chargement du modèle Tensorflow
# model = tf.keras.models.load_model("trained_plant_disease_model.keras")

# # Fonction de détection des maladies des plantes
# def plant_disease_detection(test_image):
#     image = tf.keras.preprocessing.image.load_img(test_image, target_size=(128, 128))
#     input_arr = tf.keras.preprocessing.image.img_to_array(image)
#     input_arr = np.array([input_arr])  # Convertir une seule image en lot
#     predictions = model.predict(input_arr)
#     return np.argmax(predictions)  # Retourner l'index de l'élément maximum

# # Route de détection des maladies des plantes
# @app.route("/detection", methods=['POST'])
# def plant_disease_detection_route():
#     try:
#         # Charger l'image de test depuis la requête
#         test_image = request.files['file']
#         # Faire une détection de maladies des plantes
#         result_index = plant_disease_detection(test_image)
#         # Récupérer le nom de la classe prédite
#         class_name = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
#                       'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew',
#                       'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
#                       'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy',
#                       'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
#                       'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
#                       'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
#                       'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy',
#                       'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
#                       'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot',
#                       'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
#                       'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
#                       'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
#                       'Tomato___healthy']
#         # Renvoyer le résultat de la détection des maladies des plantes
#         result = class_name[result_index]
#         return jsonify({'result': result}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


def model_predict(img_path, model):
    # Charger l'image avec PIL
    img = Image.open(img_path)
    
    # Redimensionner l'image
    img = img.resize((64, 64))
    
    # Convertir l'image en tableau numpy
    x = np.array(img)
    
    # Étendre les dimensions de l'array
    x = np.expand_dims(x, axis=0)
    
    # Normaliser les valeurs des pixels entre 0 et 1
    x = x.astype('float32') / 255.0
    
    # Faire la prédiction
    preds = model.predict(x)
    
    return preds






@app.route('/predictDeasease', methods=['POST'])
def upload():
    if request.method == 'POST':
        # Get the file from the POST request
        f = request.files['file']
        
        # Check if the file is present
        if not f:
            return jsonify({'error': 'No file uploaded'}), 400

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)
        intermediaire  = ""
        # Make prediction
        try:
            preds = model_predict(file_path, model2)
            disease_class = ['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy', 'Potato___Early_blight',
                             'Tomato_Bacterial_spot', 'Tomato_Early_blight',
                             'Tomato_Late_blight', 'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot',
                             'Tomato__Target_Spot',
                             'Tomato__Tomato_YellowLeaf__Curl_Virus', 'Tomato__Tomato_mosaic_virus', 'Tomato_healthy']
            
            ind = np.argmax(preds)
            result = disease_class[ind]
            return jsonify({'result': result}), 200
        except Exception as e:
            # Handle the exception, log it, and return an error message
            error_message = str(e)
            return jsonify({'error': file_path}), 500

    return jsonify({'error': 'Method not allowed'}), 405
# if __name__ == '__main__':
#     # app.run(port=5002, debug=True)

#     # Serve the app with gevent
#     http_server = WSGIServer(('', 5000), app)
#     http_server.serve_forever()

if __name__ == "__main__":
    app.run(debug=True)
