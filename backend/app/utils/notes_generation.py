# from gemini_client import call_gemini_api

# def generate_notes(keywords):
#     """
#     Generates comprehensive notes based on the provided keywords using the Gemini API.

#     Args:
#         keywords (list): A list of important keywords.

#     Returns:
#         str: Generated notes in Markdown format.
#     """
#     if not keywords:
#         raise ValueError("Keyword list is empty. Cannot generate notes.")

#     # Convert the list of keywords into a string
#     keywords_string = ", ".join(keywords)

#     # Define the system prompt
#     system_prompt = """
#     You are an intelligent note-generation assistant. 
#     Based on the given keywords, generate structured notes. Ensure the notes include the following sections:

#     - **Title**: Clearly state the main topic.
#     - **Pre-requisites**: Concepts or knowledge required to understand the notes.
#     - **Introduction**: A brief overview of the topic.
#     - **Simpler Analogy (Optional)**: Provide a simplified analogy for complex topics.
#     - **Examples (Optional)**: Include examples to illustrate the topic.
#     - **Relevant Formulas (Optional)**: List formulas related to the topic.
#     - **Similar Topics**: Suggest related topics worth exploring.
#     - **Summary**: Concise summary of the notes.

#     Format the notes using Markdown syntax.
#     If any keyword is unfamiliar, explicitly state: "I don't have knowledge about this keyword."
#     """

#     # Construct the payload
#     payload = {
#         "model": "gemini-1.0",  # Replace with the correct Gemini model name
#         "messages": [
#             {"role": "system", "content": system_prompt},
#             {"role": "user", "content": f"Write notes on the following keywords: {keywords_string}"}
#         ],
#         "max_tokens": 1000
#     }

#     # Call the Gemini API
#     response = call_gemini_api(payload)

#     # Extract the notes from the response
#     notes = response.get("notes", "")
#     if not notes:
#         raise RuntimeError("Failed to generate notes. The response is empty or invalid.")

#     return notes
# backend/app/utils/notes_generation.py
from app.utils.gemini_client import call_gemini_api

def generate_notes(keywords):
    """
    Generates comprehensive notes based on the provided keywords using the Gemini API.

    Args:
        keywords (list): A list of important keywords.

    Returns:
        str: Generated notes in Markdown format.
    """
    if not keywords:
        raise ValueError("Keyword list is empty. Cannot generate notes.")

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

    # Construct the payload
    payload = {
        "model": "gemini-1.0",  # Replace with the correct Gemini model name
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Write notes on the following keywords: {keywords_string}"}
        ],
        "max_tokens": 1000
    }

    # Call the Gemini API
    response = call_gemini_api(payload)

    # Extract the notes from the response
    notes = response.get("extracted_text", "")
    if not notes:
        raise RuntimeError("Failed to generate notes. The response is empty or invalid.")

    return notes
