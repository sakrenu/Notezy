import easyocr
from openai import OpenAI
import numpy as np
from PIL import Image
from time import time
from notes_extraction import keyword_generation, construct_prompt, send_request_get_notes

client = OpenAI(
        api_key=api_key,
        project='proj_XIILoALbD71OMccAU7bflg5A'
    )

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

def extract_keywords(extracted_text):
    list_of_keywords = keyword_generation(extracted_text , client)
    return list_of_keywords

  