import os
import base64
from PIL import Image
import numpy as np
import easyocr
from app.utils.gemini_client import call_gemini_api

def extract_text(image_path):
    """
    Extract text from an image using EasyOCR (basic method).
    
    Args:
        image_path (str): The path to the image file.

    Returns:
        tuple: A tuple containing the extracted text and time taken.
    """
    import time
    start_time = time.time()
    
    reader = easyocr.Reader(['en'], gpu=False)
    image = Image.open(image_path)
    image_np = np.array(image)
    results = reader.readtext(image_np)
    
    extracted_text = ' '.join([text for _, text, _ in results])
    extraction_time = round(time.time() - start_time, 3)
    
    return extracted_text, extraction_time

def encode_image(image_path):
    """
    Encode the image file as a base64 string.
    
    Args:
        image_path (str): The path to the image file.

    Returns:
        str: The base64 encoded image data.
    """
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def extract_text_adv(image_path):
    """
    Extract text from an image using the Gemini API (advanced method).
    
    Args:
        image_path (str): The path to the image file.

    Returns:
        tuple: A tuple containing the extracted text and time taken.
    """
    base64_image = encode_image(image_path)
    payload = {
        "messages": [
            {"type": "text", "text": "Extract all text from the provided image."},
            {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
        ]
    }
    
    response = call_gemini_api(payload)
    extracted_text = response.get("extracted_text", "")
    extraction_time = response.get("time_taken", 0)
    
    return extracted_text, extraction_time