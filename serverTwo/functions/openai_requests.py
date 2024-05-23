import openai
from decouple import config
from openai import OpenAI

# Créer une instance du client OpenAI

from functions.database import get_recent_messages
from dotenv import load_dotenv
load_dotenv()
api_key = "sk-proj-zmRpx88D4ck88D2o3fiTT3BlbkFJzBLFE1BdWS20q9D6V3L"

# Créer une instance du client OpenAI en passant la clé API
client = OpenAI(api_key=api_key)


# Retrieve Enviornment Variables
openai.organization = config("OPEN_AI_ORG")
openai.api_key = config("OPEN_AI_KEY")

import whisper

model = whisper.load_model("base")

# Open AI - Whisper
# Convert audio to text
def convert_audio_to_text(audio_data, language="fr"):
    try:
        # Appeler la méthode de transcription de l'audio du client OpenAI
        # et stocker la transcription dans une variable
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_data,
            language="fr"  # Spécifier la langue pour la transcription
        )
        
        # Extraire le texte de la transcription et le renvoyer
        text = transcription.text
        return text
    except Exception as e:
        # En cas d'erreur, imprimer l'erreur et renvoyer None
        print(f"Error during audio transcription: {str(e)}")
        return None

# Open AI - Chat GPT
# Convert audio to text
def get_chat_response(message_input):
    messages = get_recent_messages()
    user_message = {"role": "user", "content": message_input}
    messages.append(user_message)
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            # Spécifier la langue pour la conversation
        )
        # Récupérer la première réponse dans le tableau de choix
        if response.choices:
            message_text = response.choices[0].message.content
            return message_text
        else:
            # Aucune réponse n'a été obtenue, retourner une chaîne vide ou une valeur par défaut
            return ""
    except Exception as e:
        # En cas d'erreur, imprimer l'erreur et retourner une valeur par défaut
        print(f"Error getting chat response: {str(e)}")
        return ""