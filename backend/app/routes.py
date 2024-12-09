from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import tempfile
from app.utils.text_extraction import extract_text_adv
from app.utils.keyword_extraction import extract_keywords
from app.utils.notes_generation import generate_notes

bp = Blueprint('main', __name__)

@bp.route('/extract-text', methods=['POST'])
def extract_text():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        temp_dir = tempfile.gettempdir()
        file_path = os.path.join(temp_dir, filename)
        file.save(file_path)

        try:
            extracted_text, extraction_time = extract_text_adv(file_path)
            os.remove(file_path)  # Clean up the temporary file
            return jsonify({"text": extracted_text, "time_taken": extraction_time})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

@bp.route('/extract-keywords', methods=['POST'])
def extract_keywords_route():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    extracted_text = data['text']

    try:
        keywords = extract_keywords(extracted_text)
        return jsonify({"keywords": keywords})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route('/generate-notes', methods=['POST'])
def generate_notes_route():
    data = request.get_json()
    if not data or 'keywords' not in data:
        return jsonify({"error": "No keywords provided"}), 400

    keywords = data['keywords']

    try:
        notes = generate_notes(keywords)
        return jsonify({"notes": notes})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
