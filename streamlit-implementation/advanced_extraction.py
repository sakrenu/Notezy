import base64
import requests
import os
import time
import re
from notes_generation import initialize_client

client = initialize_client()

def encode_image(image_path):
    """
    Encodes the image at the given path to a base64 string.
    
    Args:
    image_path (str): The file path of the image to encode.

    Returns:
    str: The base64 encoded string of the image.
    """
    with open(rf'{image_path}', "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def construct_prompt(image_path):
    """
    Constructs the prompt and payload for the API request to extract text from an image.
    
    Args:
    image_path (str): The file path of the image to process.

    Returns:
    tuple: A tuple containing the headers and payload for the API request.
    """
    base64_image = encode_image(image_path)
    prompt = """Your task is to extract all text from the provided image. The image can be handwritten or typed.
                Ensure all text is accurately captured, maintaining the original structure and organization as much as possible."""
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

def preprocess_txt(extracted_text):
    cleaned_text = ' '.join(extracted_text.split())
    cleaned_text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', cleaned_text)
    cleaned_text = re.sub(r'<[^>]+>', '', cleaned_text)
    cleaned_text = re.sub(r'#{1,6}\s*(.+)', r'\1', cleaned_text)
    cleaned_text = re.sub(r'>\s*(.+)', r'\1', cleaned_text)
    cleaned_text = re.sub(r'---|\*\*\*|___', '', cleaned_text)
    cleaned_text = re.sub(r'^\s*[-*+]\s+', '', cleaned_text, flags=re.MULTILINE)
    cleaned_text = re.sub(r'^\s*\d+\.\s+', '', cleaned_text, flags=re.MULTILINE)
    return cleaned_text.strip()

def send_request_get_text(headers, payload):
    """
    Sends the API request to extract text from the image and measures the time taken for the response.
    
    Args:
    headers (dict): The headers for the API request.
    payload (dict): The payload for the API request.

    Returns:
    tuple: A tuple containing the extracted text as a string and the time taken for the API request.
    """
    start = time.time()
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    end = time.time()
    time_taken = end - start
    response_json = response.json()
    if 'choices' in response_json and len(response_json['choices']) > 0:
        extracted_text = response_json['choices'][0]['message']['content']
    cleaned_text = preprocess_txt(extracted_text)
    return cleaned_text, time_taken