import os
from openai import OpenAI

def initialize_client():
    """
    Retrieve API key from environment variable and initialize clien and return it.
    """
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("Please set the OPENAI_API_KEY environment variable.")

    client = OpenAI(
        api_key=api_key,
        project='proj_XIILoALbD71OMccAU7bflg5A'
    )
    return client

def preprocess_keywords(keywords):
    """
    Convert a list of keywords into a comma-separated string.
    """
    keywords_string = ', '.join(keywords)
    return keywords_string.strip(', ')

def construct_messages(keywords_string):
    """
    Construct the list of messages for the chat API.
    """
    system_message = '''
    Your task is to generate comprehensive notes based on the provided list of important keywords. Ensure that the notes include the following sections:

    Title: Clearly state the main topic of the notes.
    Pre-requisites: List concepts or knowledge required to understand the notes.
    Introduction: Provide a brief overview of the topic.
    Simpler Analogy (Optional): Offer a simplified analogy for complex topics.
    Examples (Optional): Include examples to illustrate the topic.
    Relevant Formulas (Optional): List any relevant formulas associated with the topic.
    Similar Topics: Suggest related topics that are worth exploring.
    Summary: Provide a concise summary of the notes, if applicable.

    **If you do not have knowledge about any keyword/, explicitly state: "I don't have knowledge about this keyword" instead of generating information or fabricating details.**

    Formatting Guidelines:
    Title: Enclose the main topic within *Title*.
    Headings: Enclose headings within **Heading**.
    Sub-headings: Enclose sub-headings within ***Sub-heading***.
    Important Words: Highlight important terms in bold and enclose them with #Bold-word#.
    Title: There should be exactly one Title.
    Headings: You may include multiple Headings.
    Sub-headings: A Sub-heading should follow a relevant Heading.

    Make sure to follow these guidelines for clarity and consistency in the notes.'''
    user_message = f"Help me write notes on {keywords_string}. "
    return [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message}
    ]

def generate_notes(keywords, client):
    """
    Generate notes based on the provided keywords.
    """  
    keywords_string = preprocess_keywords(keywords)
    messages = construct_messages(keywords_string)
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )
    return response.choices[0].message['content']