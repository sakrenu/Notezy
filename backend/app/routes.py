from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename
from app.utils.text_extraction import extract_text, extract_text_adv
from app.utils.keyword_extraction import extract_keywords
from app.utils.notes_generation import generate_notes

# Define a blueprint for the routes
api = Blueprint('api', __name__)

# Text extraction route (basic)
@api.route('/extract-text', methods=['POST'])
def extract_text_route():
    """
    Extract text from an uploaded image (basic).
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file:
        filename = secure_filename(file.filename)
        upload_path = os.path.join(os.getenv('UPLOAD_FOLDER'), filename)
        file.save(upload_path)

        # Extract text
        extracted_text, extraction_time = extract_text(upload_path)
        return jsonify({"text": extracted_text, "time": extraction_time}), 200

# Text extraction route (advanced)
@api.route('/extract-text-adv', methods=['POST'])
def extract_text_adv_route():
    """
    Extract text from an uploaded image (advanced using Gemini API).
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if file:
        filename = secure_filename(file.filename)
        upload_path = os.path.join(os.getenv('UPLOAD_FOLDER'), filename)
        file.save(upload_path)

        # Extract text using advanced method
        extracted_text, extraction_time = extract_text_adv(upload_path)
        return jsonify({"text": extracted_text, "time": extraction_time}), 200

# Keyword extraction route
@api.route('/extract-keywords', methods=['POST'])
def extract_keywords_route():
    """
    Extract keywords from the provided text.
    """
    data = request.json
    if 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    extracted_text = data['text']
    keywords = extract_keywords(extracted_text)
    return jsonify({"keywords": keywords}), 200

# Notes generation route
@api.route('/generate-notes', methods=['POST'])
def generate_notes_route():
    """
    Generate notes from provided keywords.
    """
    data = request.json
    if 'keywords' not in data:
        return jsonify({"error": "No keywords provided"}), 400

    keywords = data['keywords']
    notes = generate_notes(keywords)
    return jsonify({"notes": notes}), 200

# Function to register all routes
def register_routes(app):
    app.register_blueprint(api, url_prefix='/api')