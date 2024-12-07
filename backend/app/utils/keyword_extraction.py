import ast
from gemini_client import call_gemini_api

def extract_keywords(extracted_text):
    """
    Extracts keywords from the given text using the Gemini API.

    Args:
        extracted_text (str): The text from which to extract keywords.

    Returns:
        list: A list of extracted keywords.
    """
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
    response = call_gemini_api(payload)

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