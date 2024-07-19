import easyocr
from openai import OpenAI
import numpy as np
from PIL import Image
from time import time
from notes_extraction import keyword_generation, construct_prompt, send_request_get_notes
from notes_generation import initialize_client

client = initialize_client()

def extract_text(image_path):
    start_time = time()
    reader = easyocr.Reader(['en'], gpu=False)
    image = Image.open(image_path)
    image_np = np.array(image)
    results = reader.readtext(image_np)
    extracted_text = ' '.join([text for _, text, _ in results])
    end_time = time()
    extraction_time = round(end_time - start_time, 3)
    return extracted_text, extraction_time

def extract_text_adv(image_path):
    headers, payload = construct_prompt(image_path)
    return send_request_get_notes(headers, payload)

def keyword_generation(extracted_text, client):
    """
    Generates keywords from the extracted text using the client API.
    
    Args:
    extracted_text (str): The text from which to extract keywords.
    client (object): The client object to use for the API request.

    Returns:
    str: The keywords extracted from the text.
    """
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

  