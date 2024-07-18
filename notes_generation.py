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
    system_message = '''You are an intelligent Note making bot.
        Instructions to follow:
            - If you are given with more than one keyword, choose the topic as the smallest subset among them. For example: Topic = Machine Learning. If keywords = 'Computer Science, Data Science, Machine Learning'.
            - Give detailed notes on the chosen topic.
            - Return a Title enclosed within *Title*, Heading within **Heading**, Sub-heading within ***Sub-heading***.
            - There can be only one Title. There can be many Headings. A Sub-heading can come only after a relevant Heading.
            - Certain important words to be made bold can be enclosed between #Bold-word#.
        Given a keyword or keywords, you will generate notes with the following:
            - Title.
            - Pre-requisites to understand the notes.
            - Introduction.
            - Some simpler analogy (OPTIONAL: for a complex topic).
            - Examples (OPTIONAL: if applicable).
            - Relevant Formulas (OPTIONAL: if applicable).
            - Some similar topics to go through.
            - Summary'''
    user_message = f"Can you help me write a note on {keywords_string}."
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
