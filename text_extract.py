import easyocr
import numpy as np
from PIL import Image
from time import time

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