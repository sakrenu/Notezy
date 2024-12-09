import requests

API_KEY = "AIzaSyCknY9Y7h7xnAXXpLIpUnjh7KLD4jY8LG4"
API_URL = "https://api.gemini.ai/v1.5/flash/completions"

def test_gemini_api():
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "prompt": "Hello, Gemini!",
        "output_type": "text"
    }

    try:
        response = requests.post(API_URL, json=payload, headers=headers)
        print("Status Code:", response.status_code)
        print("Response:", response.text)
    except Exception as e:
        print("Error:", str(e))

test_gemini_api()
