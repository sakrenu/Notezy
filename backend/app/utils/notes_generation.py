# # import os
# # import logging
# # import google.generativeai as genai
# # from dotenv import load_dotenv

# # # Load environment variables from .env file
# # load_dotenv()

# # # Configure logging
# # logging.basicConfig(level=logging.INFO)
# # logger = logging.getLogger(__name__)

# # def generate_notes(keywords):
# #     """
# #     Generates comprehensive notes based on the provided keywords using the Gemini API.

# #     Args:
# #         keywords (list): A list of important keywords.

# #     Returns:
# #         str: Generated notes in Markdown format.
# #     """
# #     try:
# #         if not keywords:
# #             raise ValueError("Keyword list is empty. Cannot generate notes.")

# #         # Load the Gemini API key from environment variables
# #         gemini_api_key = os.getenv('GEMINI_API_KEY')
# #         if not gemini_api_key:
# #             logger.error("Gemini API key not found")
# #             return "Gemini API key not found"

# #         # Configure the Generative AI client with the API key
# #         genai.configure(api_key=gemini_api_key)

# #         # Convert the list of keywords into a string
# #         keywords_string = ", ".join(keywords)

# #         # Define the system prompt
# #         system_prompt = """
# #         You are an intelligent note-generation assistant.
# #         Based on the given keywords, generate structured notes in the same language as keywords. Ensure the notes include the following sections:

# #         - **Title**: Clearly state the main topic.
# #         - **Pre-requisites**: Concepts or knowledge required to understand the notes.
# #         - **Introduction**: A brief overview of the topic.
# #         - **Simpler Analogy (Optional)**: Provide a simplified analogy for complex topics.
# #         - **Examples (Optional)**: Include examples to illustrate the topic.
# #         - **Relevant Formulas (Optional)**: List formulas related to the topic.
# #         - **Similar Topics**: Suggest related topics worth exploring.
# #         - **Summary**: Concise summary of the notes.

# #         Format the notes using Markdown syntax using appropriate headings styles.
# #         If any keyword is unfamiliar, explicitly state: "I don't have knowledge about this keyword."
# #         """

# #         # Combine the system prompt and user query
# #         query = f"{system_prompt}\n This following is the given keyowrds list : {keywords_string}"

# #         # Call the Gemini API
# #         model = genai.GenerativeModel("gemini-2.0-flash-exp")
# #         response = model.generate_content(query, stream=True)

# #         # Collect the generated content from streaming response
# #         notes = []
# #         for chunk in response:
# #             notes.append(chunk.text)

# #         # Combine all chunks into a single string
# #         full_notes = "\n".join(notes).strip()
# #         if not full_notes:
# #             raise RuntimeError("Failed to generate notes. The response is empty or invalid.")

# #         return full_notes
# #     except Exception as e:
# #         logger.error(f"Error generating notes with Gemini API: {e}")
# #         raise


# import os
# import base64
# import logging
# import google.generativeai as genai
# from google.generativeai import GenerativeModel
# from PIL import Image
# from dotenv import load_dotenv

# load_dotenv()  # Load environment variables from .env file

# # Configure logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# def encode_image(image_path):
#     """
#     Encode the image file as a base64 string.

#     Args:
#         image_path (str): The path to the image file.

#     Returns:
#         tuple: A tuple containing the base64 encoded image data and the image format.
#     """
#     try:
#         with open(image_path, "rb") as image_file:
#             encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
#             image_format = Image.open(image_file).format.lower()
#             return encoded_image, image_format
#     except Exception as e:
#         logger.error(f"Error encoding image: {e}")
#         raise

# def extract_template_from_image(image_path):
#     """
#     Extract the template structure from the given image using the Gemini API.

#     Args:
#         image_path (str): Path to the image file.

#     Returns:
#         str: Extracted template structure as text.
#     """
#     try:
#         gemini_api_key = os.getenv('GEMINI_API_KEY')
#         if not gemini_api_key:
#             logger.error("Gemini API key not found")
#             return "Gemini API key not found"

#         # Encode the image to base64 and get the image format
#         base64_image, image_format = encode_image(image_path)

#         # Configure the Generative AI client with the API key
#         genai.configure(api_key=gemini_api_key)

#         # Set the prompt
#         prompt = "Extract all text from the provided image."

#         # Prepare the image data
#         image_data = {
#             "mime_type": f"image/{image_format}",
#             "data": base64_image
#         }

#         # Call the Gemini API
#         model = GenerativeModel("gemini-1.5-flash")
#         response = model.generate_content([image_data, prompt])

#         # Extract text from the response
#         extracted_text = getattr(response, "text", "No text extracted")

#         return extracted_text
#     except AttributeError as e:
#         logger.error(f"Response attribute error: {e}")
#         return "Error processing response"
#     except Exception as e:
#         logger.error(f"Error extracting text with Gemini API: {e}")
#         raise

# # def generate_notes(keywords, image_path):
# #     """
# #     Generates comprehensive notes based on the provided keywords and template image using the Gemini API.

# #     Args:
# #         keywords (list): A list of important keywords.
# #         image_path (str): Path to the image file containing the template.

# #     Returns:
# #         str: Generated notes in Markdown format.
# #     """
# #     try:
# #         if not keywords:
# #             raise ValueError("Keyword list is empty. Cannot generate notes.")

# #         # Load the Gemini API key from environment variables
# #         gemini_api_key = os.getenv('GEMINI_API_KEY')
# #         if not gemini_api_key:
# #             logger.error("Gemini API key not found")
# #             return "Gemini API key not found"

# #         # Configure the Generative AI client with the API key
# #         genai.configure(api_key=gemini_api_key)

# #         # Convert the list of keywords into a string
# #         keywords_string = ", ".join(keywords)

# #         # Extract the template structure from the image
# #         template_structure = extract_template_from_image(image_path)
# #         print(template_structure)

# #         # Define the system prompt
# #         system_prompt = f"""
# #         You are an intelligent note-generation assistant.
# #         Based on the given keywords and template structure, generate structured notes in the same language as keywords. Ensure the notes include the following sections as per the template:

# #         {template_structure}

# #         Format the notes using Markdown syntax using appropriate headings styles.
# #         If any keyword is unfamiliar, explicitly state: "I don't have knowledge about this keyword."
# #         """

# #         # Combine the system prompt and user query
# #         query = f"{system_prompt}\n This following is the given keywords list: {keywords_string}"

# #         # Call the Gemini API
# #         model = genai.GenerativeModel("gemini-2.0-flash-exp")
# #         response = model.generate_content(query, stream=True)

# #         # Collect the generated content from streaming response
# #         notes = []
# #         for chunk in response:
# #             notes.append(chunk.text)

# #         # Combine all chunks into a single string
# #         full_notes = "\n".join(notes).strip()
# #         if not full_notes:
# #             raise RuntimeError("Failed to generate notes. The response is empty or invalid.")

# #         return full_notes
# #     except Exception as e:
# #         logger.error(f"Error generating notes with Gemini API: {e}")
# #         raise
# def generate_notes(keywords, template_image_path):
#     """
#     Generate notes based on the provided keywords and template image.

#     Args:
#         keywords (list): A list of keywords.
#         template_image_path (str): The path to the template image file.

#     Returns:
#         str: Generated notes.
#     """
#     try:
#         # Encode the template image to base64
#         base64_image, image_format = encode_image(template_image_path)

#         # Configure the Generative AI client with the API key
#         gemini_api_key = os.getenv('GEMINI_API_KEY')
#         if not gemini_api_key:
#             logger.error("Gemini API key not found")
#             return "Gemini API key not found"

#         genai.configure(api_key=gemini_api_key)

#         # Set the prompt
#         prompt = f"""
#         You are an intelligent note-generation assistant.
#         Based on the given keywords and template image, generate structured notes.

#         Keywords: {keywords}
#         """

#         # Prepare the image data
#         image_data = {
#             "mime_type": f"image/{image_format}",
#             "data": base64_image
#         }

#         # Call the Gemini API
#         model = GenerativeModel("gemini-1.5-flash")
#         response = model.generate_content([image_data, prompt])

#         # Extract notes from the response
#         notes = getattr(response, "text", "No notes generated")

#         return notes
#     except Exception as e:
#         logger.error(f"Error generating notes with Gemini API: {e}")
#         raise


import os
import logging
import requests
import tempfile
import base64
import google.generativeai as genai
from google.generativeai import GenerativeModel
from PIL import Image
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def download_image(url):
    """
    Download an image from a URL and save it as a temporary file.

    Args:
        url (str): The URL of the image to download.

    Returns:
        str: The path to the temporary file.
    """
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise an error for bad status codes

        # Create a temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
        temp_file_path = temp_file.name

        # Write the image content to the temporary file
        for chunk in response.iter_content(chunk_size=8192):
            temp_file.write(chunk)
        temp_file.close()

        return temp_file_path
    except Exception as e:
        logger.error(f"Error downloading image: {str(e)}")
        raise

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

def generate_notes(keywords, template_image_url):
    """
    Generate notes based on the provided keywords and template image URL.

    Args:
        keywords (list): A list of keywords.
        template_image_url (str): The URL of the template image.

    Returns:
        str: Generated notes.
    """
    try:
        # Download the template image and get the temporary file path
        temp_image_path = download_image(template_image_url)
        logger.info(f"Template image downloaded to: {temp_image_path}")

        # Encode the template image to base64
        base64_image, image_format = encode_image(temp_image_path)

        # Configure the Generative AI client with the API key
        gemini_api_key = os.getenv('GEMINI_API_KEY')
        if not gemini_api_key:
            logger.error("Gemini API key not found")
            return "Gemini API key not found"

        genai.configure(api_key=gemini_api_key)

        # Set the prompt
        prompt = f"""
        You are an intelligent note-generation assistant.
        Based on the given keywords and template image, generate structured notes.

        Keywords: {keywords}
        """

        # Prepare the image data
        image_data = {
            "mime_type": f"image/{image_format}",
            "data": base64_image
        }

        # Call the Gemini API
        model = GenerativeModel("gemini-1.5-flash")
        response = model.generate_content([image_data, prompt])

        # Extract notes from the response
        notes = getattr(response, "text", "No notes generated")

        # Clean up the temporary file
        os.remove(temp_image_path)
        logger.info(f"Temporary file deleted: {temp_image_path}")

        return notes
    except Exception as e:
        logger.error(f"Error generating notes with Gemini API: {e}")
        raise