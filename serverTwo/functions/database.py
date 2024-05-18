import os
import json
import random

# Save messages for retrieval later on
def get_recent_messages():
                      #  "content": "You are a Spanish teacher and your name is Rachel, the user is called Shaun. Keep responses under 20 words. "}
# Shaun
  # Define the file name
  file_name = "stored_data.json"
  learn_instruction = {"role": "system", 
                       "content": "Tu es une instructrice francaise et bambara et ton nom est FALO, l'utilisateur s'appelle Agriculteur. Garde les réponses en dessous de 30 mots. "}
  
  # Initialize messages
  messages = []

  # Add Random Element
  x = random.uniform(0, 1)
  if x < 0.2:
    learn_instruction["content"] = learn_instruction["content"] + "Ta réponse aura un petit sens d'humour mais aussi instructrice et agricole et agronome. "
  elif x < 0.5:
    learn_instruction["content"] = learn_instruction["content"] + "Ta réponse incluera un fait intéressant sur la langue ou les mots en bambaras mais surtout en agriculture. "
  else:
    learn_instruction["content"] = learn_instruction["content"] + "Ta réponse recommandera un autre mot à apprendre et une recommandation agricole ainsi qu'une méthode agricole . "


#  if x < 0.2:
#     learn_instruction["content"] = learn_instruction["content"] + "Your response will have some light humour. "
#   elif x < 0.5:
#     learn_instruction["content"] = learn_instruction["content"] + "Your response will include an interesting new fact about Spain. "
#   else:
#     learn_instruction["content"] = learn_instruction["content"] + "Your response will recommend another word to learn. "


  # Append instruction to message
  messages.append(learn_instruction)

  # Get last messages
  try:
    with open(file_name) as user_file:
      data = json.load(user_file)
      
      # Append last 5 rows of data
      if data:
        if len(data) < 5:
          for item in data:
            messages.append(item)
        else:
          for item in data[-5:]:
            messages.append(item)
  except:
    pass

  
  # Return messages
  return messages


# Save messages for retrieval later on
def store_messages(request_message, response_message):

  # Define the file name
  file_name = "stored_data.json"

  # Get recent messages
  messages = get_recent_messages()[1:]

  # Add messages to data
  user_message = {"role": "user", "content": request_message}
  assistant_message = {"role": "assistant", "content": response_message}
  messages.append(user_message)
  messages.append(assistant_message)

  # Save the updated file
  with open(file_name, "w") as f:
    json.dump(messages, f)


# Save messages for retrieval later on
def reset_messages():

  # Define the file name
  file_name = "stored_data.json"

  # Write an empty file
  open(file_name, "w")
