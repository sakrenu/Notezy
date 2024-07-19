import base64
import requests
import os
import time
from notes_generation import initialize_client

client = initialize_client()

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')
  

def construct_prompt(image_path):
    base64_image = encode_image(image_path)
    prompt = """Your task is to extract all text from the provided image of notes. The notes can be handwritten or typed.
      Ensure all text is accurately captured, maintaining the original structure and organization as much as possible"""
    headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {client.api_key}"
                }

    payload = {
    "model": "gpt-4o-mini",
    "messages": [
        {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": prompt
            },
            {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}"
            }
            }
        ]
        }
    ],
    "max_tokens": 300
    }

    return headers, payload

def send_request_get_notes(headers, payload):

    start = time.time()
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    end = time.time()
    time_taken = end - start;
    response_json = response.json()
    if 'choices' in response_json and len(response_json['choices']) > 0:
        extracted_notes = response_json['choices'][0]['message']['content']
    
    return extracted_notes, time_taken


def keyword_generation(extracted_text, client):
   system_prompt = """
    Extract the most important keywords from the given text only. These keywords should be useful for generating detailed notes and should be returned in a list format.
    """

   response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": extracted_text}
        ]
    )

   keywords = response.choices[0].message.content
   return keywords
   




  