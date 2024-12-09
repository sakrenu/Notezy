import os
import logging
import ast
from dotenv import load_dotenv
import google.generativeai as genai

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
            return "Gemini API key not found"

        # Configure the Generative AI client with the API key
        genai.configure(api_key=gemini_api_key)

        # Initialize the model
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Define the prompt
        prompt = f"""
        You are an intelligent keyword-extraction model.
        Your task is to extract the most important keywords from the given text.
        These keywords will be used for generating detailed notes.

        Please return the extracted keywords as a Python list of strings. For example:
        ['Computer Science', 'Machine Learning', 'Deep Learning']

        Text: {extracted_text}
        """

        # Generate the content
        response = model.generate_content(prompt)

        # Preprocess the response text to remove Markdown formatting
        response_text = response.text.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("\n", 1)[-1].rsplit("\n```", 1)[0]

        # Parse the cleaned response text
        try:
            keywords = ast.literal_eval(response_text)  # Convert response text to Python list
            if isinstance(keywords, list) and all(isinstance(keyword, str) for keyword in keywords):
                return keywords
            else:
                raise ValueError("Response does not contain a valid list of keywords.")
        except (ValueError, SyntaxError) as e:
            logger.error(f"Failed to parse keywords: {response_text}")
            raise RuntimeError(f"Invalid response format: {response_text}") from e

    except Exception as e:
        logger.error(f"Error extracting keywords with Gemini API: {e}")
        raise
