import os
import logging
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_notes(keywords):
    """
    Generates comprehensive notes based on the provided keywords using the Gemini API.

    Args:
        keywords (list): A list of important keywords.

    Returns:
        str: Generated notes in Markdown format.
    """
    try:
        if not keywords:
            raise ValueError("Keyword list is empty. Cannot generate notes.")

        # Load the Gemini API key from environment variables
        gemini_api_key = os.getenv('GEMINI_API_KEY')
        if not gemini_api_key:
            logger.error("Gemini API key not found")
            return "Gemini API key not found"

        # Configure the Generative AI client with the API key
        genai.configure(api_key=gemini_api_key)

        # Convert the list of keywords into a string
        keywords_string = ", ".join(keywords)

        # Define the system prompt
        system_prompt = """
        You are an intelligent note-generation assistant.
        Based on the given keywords, generate structured notes. Ensure the notes include the following sections:

        - **Title**: Clearly state the main topic.
        - **Pre-requisites**: Concepts or knowledge required to understand the notes.
        - **Introduction**: A brief overview of the topic.
        - **Simpler Analogy (Optional)**: Provide a simplified analogy for complex topics.
        - **Examples (Optional)**: Include examples to illustrate the topic.
        - **Relevant Formulas (Optional)**: List formulas related to the topic.
        - **Similar Topics**: Suggest related topics worth exploring.
        - **Summary**: Concise summary of the notes.

        Format the notes using Markdown syntax.
        If any keyword is unfamiliar, explicitly state: "I don't have knowledge about this keyword."
        """

        # Combine the system prompt and user query
        query = f"{system_prompt}\n This following is the given keyowrds list : {keywords_string}"

        # Call the Gemini API
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(query, stream=True)

        # Collect the generated content from streaming response
        notes = []
        for chunk in response:
            notes.append(chunk.text)

        # Combine all chunks into a single string
        full_notes = "\n".join(notes).strip()
        if not full_notes:
            raise RuntimeError("Failed to generate notes. The response is empty or invalid.")

        return full_notes
    except Exception as e:
        logger.error(f"Error generating notes with Gemini API: {e}")
        raise
