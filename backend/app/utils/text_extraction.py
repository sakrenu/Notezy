import os
import base64
import logging
import google.generativeai as genai
from google.generativeai import GenerativeModel
from PIL import Image
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def encode_image(image_path):
    """
    Encode the image file as a base64 string.

    Args:
        image_path (str): The path to the image file.

    Returns:
        tuple: A tuple containing the base64 encoded image data and the image format.
    """
    try:
        with open(image_path, "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
            image_format = Image.open(image_file).format.lower()
            return encoded_image, image_format
    except Exception as e:
        logger.error(f"Error encoding image: {e}")
        raise

def extract_text_adv(image_path):
    """
    Extract text from an image using the Gemini API (advanced method).

    Args:
        image_path (str): The path to the image file.

    Returns:
        tuple: A tuple containing the extracted text and time taken.
    """
    try:
        gemini_api_key = os.getenv('GEMINI_API_KEY')
        if not gemini_api_key:
            logger.error("Gemini API key not found")
            return "Gemini API key not found", 0

        # Encode the image to base64 and get the image format
        base64_image, image_format = encode_image(image_path)

        # Configure the Generative AI client with the API key
        genai.configure(api_key=gemini_api_key)

        # Set the prompt
        prompt = "Extract all text from the provided image."

        # Prepare the image data
        image_data = {
            "mime_type": f"image/{image_format}",
            "data": base64_image
        }

        # Call the Gemini API
        model = GenerativeModel("gemini-1.5-flash")
        response = model.generate_content([image_data, prompt])

        # Extract text from the response
        extracted_text = getattr(response, "text", "No text extracted")

        # If metadata is not available, default to 0
        extraction_time = getattr(response, "metadata", {}).get("time_taken", 0)

        return extracted_text, extraction_time
    except AttributeError as e:
        logger.error(f"Response attribute error: {e}")
        return "Error processing response", 0
    except Exception as e:
        logger.error(f"Error extracting text with Gemini API: {e}")
        raise
