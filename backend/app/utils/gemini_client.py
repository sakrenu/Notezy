# import os
# import requests
# import logging
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # Retrieve API key and base URL from environment variables
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# GEMINI_API_URL = os.getenv("GEMINI_API_URL", "https://api.gemini.ai/v1/completions")

# if not GEMINI_API_KEY:
#     raise ValueError("GEMINI_API_KEY is not set in the environment variables.")

# def call_gemini_api(payload):
#     """
#     Sends a request to the Gemini API with the specified payload.
    
#     Args:
#         payload (dict): The request payload.

#     Returns:
#         dict: The response data from the Gemini API.
#     """
#     headers = {
#         "Authorization": f"Bearer {GEMINI_API_KEY}",
#         "Content-Type": "application/json"
#     }
    
#     try:
#         response = requests.post(GEMINI_API_URL, json=payload, headers=headers, timeout=30)
#         response.raise_for_status()  # Raise an exception for HTTP errors
#         response_data = response.json()
        
#         # Extract text and time taken from the response
#         extracted_text = response_data.get("choices", [{}])[0].get("message", {}).get("content", "")
#         time_taken = response_data.get("latency", {}).get("total_time", 0)
        
#         return {
#             "extracted_text": extracted_text,
#             "time_taken": round(time_taken, 3)
#         }
#     except requests.exceptions.RequestException as e:
#         logging.error(f"Error calling Gemini API: {e}")
#         raise RuntimeError(f"Failed to communicate with Gemini API: {e}")
# backend/app/utils/gemini_client.py
import os
import requests
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve API key and base URL from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = os.getenv("GEMINI_API_URL", "https://api.gemini.ai/v1/completions")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables.")

def call_gemini_api(payload):
    """
    Sends a request to the Gemini API with the specified payload.

    Args:
        payload (dict): The request payload.

    Returns:
        dict: The response data from the Gemini API.
    """
    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(GEMINI_API_URL, json=payload, headers=headers, timeout=30)
        response.raise_for_status()  # Raise an exception for HTTP errors
        response_data = response.json()

        # Extract text and time taken from the response
        extracted_text = response_data.get("choices", [{}])[0].get("message", {}).get("content", "")
        time_taken = response_data.get("latency", {}).get("total_time", 0)

        return {
            "extracted_text": extracted_text,
            "time_taken": round(time_taken, 3)
        }
    except requests.exceptions.RequestException as e:
        logging.error(f"Error calling Gemini API: {e}")
        raise RuntimeError(f"Failed to communicate with Gemini API: {e}")
