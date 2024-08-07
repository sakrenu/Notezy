import os
from openai import OpenAI
import time

def initialize_client():
    """
    Retrieve API key from environment variable and initialize clien and return it.
    """
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("Please set the OPENAI_API_KEY environment variable.")

    client = OpenAI(
        api_key=api_key
    )
    return client

def construct_messages(keywords_string):
    """
    Construct the list of messages for the chat API.
    """
    system_message = '''
    Your task is to generate comprehensive notes based on the provided list of important keywords. Ensure that the notes include the following sections:

    # Title: Clearly state the main topic of the notes.
    ## Pre-requisites: List concepts or knowledge required to understand the notes.
    ## Introduction: Provide a brief overview of the topic.
    ## Simpler Analogy (Optional): Offer a simplified analogy for complex topics.
    ## Examples (Optional): Include examples to illustrate the topic.
    ## Relevant Formulas (Optional): List any relevant formulas associated with the topic.
    ## Similar Topics: Suggest related topics that are worth exploring.
    ## Summary: Provide a concise summary of the notes, if applicable.

    **If you do not have knowledge about any keyword, explicitly state: "I don't have knowledge about this keyword" instead of generating information or fabricating details.**

    Ensure the notes are well-structured and formatted using Markdown syntax.'''
    user_message = f"Write notes on {keywords_string}. "
    return [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message}
    ]

def generate_notes(keywords, client):
    """
    Generate notes based on the provided keywords.
    """  
    latency_dic = {}
    start_construct = time.time()
    messages = construct_messages(keywords)
    end_construct = time.time()
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )
    end_response = time.time()
    latency_dic = {
        'Construct time': round(end_construct - start_construct, 3),
        'Response time' : round(end_response - end_construct, 3)
    }
    print('\n'.join(f'{key}: {value}' for key, value in latency_dic.items()))
    if len(response.choices) > 0:
        message_content = response.choices[0].message.content
        return message_content
    else:
        return None
