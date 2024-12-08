# # import ast
# # from gemini_client import call_gemini_api

# # def extract_keywords(extracted_text):
# #     """
# #     Extracts keywords from the given text using the Gemini API.

# #     Args:
# #         extracted_text (str): The text from which to extract keywords.

# #     Returns:
# #         list: A list of extracted keywords.
# #     """
# #     # Define the system prompt
# #     system_prompt = """
# #     You are an intelligent keyword-extraction model. 
# #     Your task is to extract the most important keywords from the given text. 
# #     These keywords will be used for generating detailed notes.
    
# #     Please return the extracted keywords as a Python list of strings. For example:
# #     ['Computer Science', 'Machine Learning', 'Deep Learning']
# #     """

# #     # Construct the payload
# #     payload = {
# #         "model": "gemini-1.0",  # Replace with the correct Gemini model name
# #         "messages": [
# #             {"role": "system", "content": system_prompt},
# #             {"role": "user", "content": f"Extract keywords from the following text: {extracted_text}"}
# #         ],
# #         "max_tokens": 100
# #     }

# #     # Call the Gemini API
# #     response = call_gemini_api(payload)

# #     # Extract keywords from the response
# #     extracted_text = response.get("extracted_text", "")
# #     try:
# #         keywords = ast.literal_eval(extracted_text)  # Convert the response text to a Python list
# #         if isinstance(keywords, list) and all(isinstance(keyword, str) for keyword in keywords):
# #             return keywords
# #         else:
# #             raise ValueError("Response does not contain a valid list of keywords.")
# #     except (ValueError, SyntaxError) as e:
# #         raise RuntimeError(f"Failed to parse keywords: {extracted_text}") from e
# # backend/app/utils/keyword_extraction.py
# import ast
# from app.utils.gemini_client import call_gemini_api

# def extract_keywords(extracted_text):
#     """
#     Extracts keywords from the given text using the Gemini API.

#     Args:
#         extracted_text (str): The text from which to extract keywords.

#     Returns:
#         list: A list of extracted keywords.
#     """
#     # Define the system prompt
#     system_prompt = """
#     You are an intelligent keyword-extraction model.
#     Your task is to extract the most important keywords from the given text.
#     These keywords will be used for generating detailed notes.

#     Please return the extracted keywords as a Python list of strings. For example:
#     ['Computer Science', 'Machine Learning', 'Deep Learning']
#     """

#     # Construct the payload
#     payload = {
#         "model": "gemini-1.0",  # Replace with the correct Gemini model name
#         "messages": [
#             {"role": "system", "content": system_prompt},
#             {"role": "user", "content": f"Extract keywords from the following text: {extracted_text}"}
#         ],
#         "max_tokens": 100
#     }

#     # Call the Gemini API
#     response = call_gemini_api(payload)

#     # Extract keywords from the response
#     extracted_text = response.get("extracted_text", "")
#     try:
#         keywords = ast.literal_eval(extracted_text)  # Convert the response text to a Python list
#         if isinstance(keywords, list) and all(isinstance(keyword, str) for keyword in keywords):
#             return keywords
#         else:
#             raise ValueError("Response does not contain a valid list of keywords.")
#     except (ValueError, SyntaxError) as e:
#         raise RuntimeError(f"Failed to parse keywords: {extracted_text}") from e


import ast
import os
import logging
import google.generativeai as genai
from google.generativeai import GenerativeModel
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_keywords(extracted_text):
    """
    Extracts keywords from the given text using the Gemini API.

    Args:
        extracted_text (str): The text from which to extract keywords.

    Returns:
        list: A list of extracted keywords.
    """
    try:
        # Load the Gemini API key from environment variables
        gemini_api_key = os.getenv('GEMINI_API_KEY')
        if not gemini_api_key:
            logger.error("Gemini API key not found")
            return "Gemini API key not found", 0

        # Configure the Generative AI client with the API key
        genai.configure(api_key=gemini_api_key)

        # Define the system prompt
        system_prompt = """
        You are an intelligent keyword-extraction model.
        Your task is to extract the most important keywords from the given text.
        These keywords will be used for generating detailed notes.

        Please return the extracted keywords as a Python list of strings. For example:
        ['Computer Science', 'Machine Learning', 'Deep Learning']
        """

        # Construct the payload
        payload = {
            "model": "gemini-1.0",  # Replace with the correct Gemini model name
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Extract keywords from the following text: {extracted_text}"}
            ],
            "max_tokens": 100
        }

        # Call the Gemini API
        model = GenerativeModel("gemini-1.0")
        response = model.generate_content(payload)

        # Extract keywords from the response
        extracted_text = response.get("extracted_text", "")
        try:
            keywords = ast.literal_eval(extracted_text)  # Convert the response text to a Python list
            if isinstance(keywords, list) and all(isinstance(keyword, str) for keyword in keywords):
                return keywords
            else:
                raise ValueError("Response does not contain a valid list of keywords.")
        except (ValueError, SyntaxError) as e:
            raise RuntimeError(f"Failed to parse keywords: {extracted_text}") from e
    except Exception as e:
        logger.error(f"Error extracting keywords with Gemini API: {e}")
        raise
