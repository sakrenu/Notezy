import easyocr
import ast
import numpy as np
import os
from PIL import Image
from time import time
from advanced_extraction import construct_prompt, send_request_get_text
from notes_generation import initialize_client

client = initialize_client()

def extract_text(image_path):
    """
    Extracts text from an image using EasyOCR and measures the time taken for the extraction.
    Simple text extractor for simpler use case.

    Args:
    image_path (str): The path to the image file from which text is to be extracted.

    Returns:
    tuple: A tuple containing the extracted text as a string and the time taken for the extraction.
    """
    start_time = time()
    reader = easyocr.Reader(['en'], gpu=False)
    image = Image.open(image_path)
    image_np = np.array(image)
    results = reader.readtext(image_np)
    extracted_text = ' '.join([text for _, text, _ in results])
    end_time = time()
    extraction_time = round(end_time - start_time, 3)
    return extracted_text, extraction_time

def extract_text_adv(image_name):
    """
    Extracts text from an image using an advanced model from OpenAI (GPT-4o-mini)
    
    Args:
    image_path (str): The name of the image file from which text is to be extracted.

    Returns:
    tuple: A tuple containing the extracted text as a string and the time taken for the API request.
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    image_path = os.path.join(base_dir, 'store_image', image_name)
    headers, payload = construct_prompt(image_path)
    text_extracted, time_taken = send_request_get_text(headers, payload)
    print('\ntext extracted: ', text_extracted)
    return text_extracted, time_taken

def extract_keywords(extracted_text, client):
    """
    Extracts keywords from the extracted text using the client API.
    
    Args:
    extracted_text (str): The text from which to extract keywords.
    client (object): The client object to use for the API request.

    Returns:
    str: The keywords extracted from the text.
    """
    system_prompt = """
    You are an intelligent keyword-extraction model.
    Extract the most important keywords from the given text. These keywords will be used for generating detailed notes.
    The extracted keywords must be returned as a python list of strings. For Example: ['Computer Science', 'Machine Learning', 'Deep learning']
    """
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f'Extract keywords from the text {extracted_text}'}
        ]
    )
    keywords = response.choices[0].message.content
    keywords_list = ast.literal_eval(keywords)
    return keywords_list