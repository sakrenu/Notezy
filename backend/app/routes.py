# # # routes.py
# # from flask import Blueprint, request, jsonify
# # from werkzeug.utils import secure_filename
# # import os
# # import tempfile
# # from app.utils.text_extraction import extract_text_adv
# # from app.utils.keyword_extraction import extract_keywords
# # from app.utils.notes_generation import generate_notes
# # from cloudinary.uploader import destroy
# # import cloudinary
# # import cloudinary.api

# # bp = Blueprint('main', __name__)

# # # Configure Cloudinary
# # cloudinary.config(
# #     cloud_name=os.getenv('REACT_APP_CLOUDINARY_CLOUD_NAME'),
# #     api_key=os.getenv('REACT_APP_CLOUDINARY_API_KEY'),
# #     api_secret=os.getenv('REACT_APP_CLOUDINARY_API_SECRET')
# # )

# # @bp.route('/extract-text', methods=['POST'])
# # def extract_text():
# #     if 'file' not in request.files:
# #         return jsonify({"error": "No file part"}), 400

# #     file = request.files['file']

# #     if file.filename == '':
# #         return jsonify({"error": "No selected file"}), 400

# #     if file:
# #         filename = secure_filename(file.filename)
# #         temp_dir = tempfile.gettempdir()
# #         file_path = os.path.join(temp_dir, filename)
# #         file.save(file_path)

# #         try:
# #             extracted_text, extraction_time = extract_text_adv(file_path)
# #             os.remove(file_path)  # Clean up the temporary file
# #             return jsonify({"text": extracted_text, "time_taken": extraction_time})
# #         except Exception as e:
# #             return jsonify({"error": str(e)}), 500

# # @bp.route('/extract-keywords', methods=['POST'])
# # def extract_keywords_route():
# #     data = request.get_json()
# #     if not data or 'text' not in data:
# #         return jsonify({"error": "No text provided"}), 400

# #     extracted_text = data['text']

# #     try:
# #         keywords = extract_keywords(extracted_text)
# #         return jsonify({"keywords": keywords})
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# # @bp.route('/generate-notes', methods=['POST'])
# # def generate_notes_route():
# #     data = request.get_json()
# #     if not data or 'keywords' not in data:
# #         return jsonify({"error": "No keywords provided"}), 400

# #     keywords = data['keywords']

# #     try:
# #         notes = generate_notes(keywords)
# #         return jsonify({"notes": notes})
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# # @bp.route('/delete-image', methods=['POST'])
# # def delete_image():
# #     data = request.get_json()
# #     public_id = data.get('publicId')

# #     try:
# #         destroy(public_id)
# #         return jsonify({'message': 'Image deleted successfully'}), 200
# #     except Exception as e:
# #         return jsonify({'error': str(e)}), 500

# # routes.py
# from flask import Blueprint, request, jsonify
# from werkzeug.utils import secure_filename
# import os
# import tempfile
# from app.utils.text_extraction import extract_text_adv
# from app.utils.keyword_extraction import extract_keywords
# from app.utils.notes_generation import generate_notes
# from cloudinary.uploader import destroy
# import cloudinary
# import cloudinary.api

# bp = Blueprint('main', __name__)

# # Configure Cloudinary
# cloudinary.config(
#     cloud_name=os.getenv('REACT_APP_CLOUDINARY_CLOUD_NAME'),
#     api_key=os.getenv('REACT_APP_CLOUDINARY_API_KEY'),
#     api_secret=os.getenv('REACT_APP_CLOUDINARY_API_SECRET')
# )

# @bp.route('/extract-text', methods=['POST'])
# def extract_text():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part"}), 400

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     if file:
#         filename = secure_filename(file.filename)
#         temp_dir = tempfile.gettempdir()
#         file_path = os.path.join(temp_dir, filename)
#         file.save(file_path)

#         try:
#             extracted_text, extraction_time = extract_text_adv(file_path)
#             os.remove(file_path)  # Clean up the temporary file
#             return jsonify({"text": extracted_text, "time_taken": extraction_time})
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500

# @bp.route('/extract-keywords', methods=['POST'])
# def extract_keywords_route():
#     data = request.get_json()
#     if not data or 'text' not in data:
#         return jsonify({"error": "No text provided"}), 400

#     extracted_text = data['text']

#     try:
#         keywords = extract_keywords(extracted_text)
#         return jsonify({"keywords": keywords})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @bp.route('/generate-notes', methods=['POST'])
# def generate_notes_route():
#     if 'file' not in request.files or 'keywords' not in request.form:
#         return jsonify({"error": "Missing file or keywords"}), 400

#     file = request.files['file']
#     keywords = request.form['keywords']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     if file:
#         filename = secure_filename(file.filename)
#         temp_dir = tempfile.gettempdir()
#         file_path = os.path.join(temp_dir, filename)
#         file.save(file_path)

#         try:
#             notes = generate_notes(keywords.split(','), file_path)
#             os.remove(file_path)  # Clean up the temporary file
#             return jsonify({"notes": notes})
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500

# @bp.route('/delete-image', methods=['POST'])
# def delete_image():
#     data = request.get_json()
#     public_id = data.get('publicId')

#     try:
#         destroy(public_id)
#         return jsonify({'message': 'Image deleted successfully'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
# from flask import Blueprint, request, jsonify
# from werkzeug.utils import secure_filename
# import os
# import tempfile
# from app.utils.text_extraction import extract_text_adv
# from app.utils.keyword_extraction import extract_keywords
# from app.utils.notes_generation import generate_notes
# from cloudinary.uploader import destroy
# import cloudinary
# import cloudinary.api

# bp = Blueprint('main', __name__)

# # Configure Cloudinary
# cloudinary.config(
#     cloud_name=os.getenv('REACT_APP_CLOUDINARY_CLOUD_NAME'),
#     api_key=os.getenv('REACT_APP_CLOUDINARY_API_KEY'),
#     api_secret=os.getenv('REACT_APP_CLOUDINARY_API_SECRET')
# )

# @bp.route('/extract-text', methods=['POST'])
# def extract_text():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file part"}), 400

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     if file:
#         filename = secure_filename(file.filename)
#         temp_dir = tempfile.gettempdir()
#         file_path = os.path.join(temp_dir, filename)
#         file.save(file_path)

#         try:
#             extracted_text, extraction_time = extract_text_adv(file_path)
#             os.remove(file_path)  # Clean up the temporary file
#             return jsonify({"text": extracted_text, "time_taken": extraction_time})
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500

# @bp.route('/extract-keywords', methods=['POST'])
# def extract_keywords_route():
#     data = request.get_json()
#     if not data or 'text' not in data:
#         return jsonify({"error": "No text provided"}), 400

#     extracted_text = data['text']

#     try:
#         keywords = extract_keywords(extracted_text)
#         return jsonify({"keywords": keywords})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @bp.route('/generate-notes', methods=['POST'])
# def generate_notes_route():
#     data = request.get_json()
#     if not data or 'keywords' not in data:
#         return jsonify({"error": "No keywords provided"}), 400

#     keywords = data['keywords']

#     try:
#         notes = generate_notes(keywords)
#         return jsonify({"notes": notes})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @bp.route('/delete-image', methods=['POST'])
# def delete_image():
#     data = request.get_json()
#     public_id = data.get('publicId')

#     try:
#         destroy(public_id)
#         return jsonify({'message': 'Image deleted successfully'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import tempfile
import logging
from app.utils.text_extraction import extract_text_adv
from app.utils.keyword_extraction import extract_keywords
from app.utils.notes_generation import generate_notes
from cloudinary.uploader import destroy
import cloudinary
import cloudinary.api

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

bp = Blueprint('main', __name__)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('REACT_APP_CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('REACT_APP_CLOUDINARY_API_KEY'),
    api_secret=os.getenv('REACT_APP_CLOUDINARY_API_SECRET')
)

# # Validate Cloudinary configuration
# if not all([cloudinary.config.cloud_name, cloudinary.config.api_key, cloudinary.config.api_secret]):
#     logger.error("Cloudinary configuration is incomplete. Please check environment variables.")
#     raise RuntimeError("Cloudinary configuration is incomplete.")

@bp.route('/extract-text', methods=['POST'])
def extract_text():
    """
    Extract text from an uploaded image file.
    """
    if 'file' not in request.files:
        logger.error("No file part in the request.")
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        logger.error("No file selected.")
        return jsonify({"error": "No selected file"}), 400

    if file:
        try:
            # Sanitize the filename
            filename = secure_filename(file.filename)
            temp_dir = tempfile.gettempdir()
            file_path = os.path.join(temp_dir, filename)

            # Save the file temporarily
            file.save(file_path)
            logger.info(f"File saved temporarily at: {file_path}")

            # Extract text from the file
            extracted_text, extraction_time = extract_text_adv(file_path)
            logger.info(f"Text extracted successfully in {extraction_time} seconds.")

            # Clean up the temporary file
            os.remove(file_path)
            logger.info(f"Temporary file deleted: {file_path}")

            return jsonify({"text": extracted_text, "time_taken": extraction_time})
        except Exception as e:
            logger.error(f"Error extracting text: {str(e)}")
            return jsonify({"error": "Failed to extract text. Please try again."}), 500

@bp.route('/extract-keywords', methods=['POST'])
def extract_keywords_route():
    """
    Extract keywords from the provided text.
    """
    data = request.get_json()
    if not data or 'text' not in data:
        logger.error("No text provided in the request.")
        return jsonify({"error": "No text provided"}), 400

    extracted_text = data['text']

    try:
        keywords = extract_keywords(extracted_text)
        logger.info("Keywords extracted successfully.")
        return jsonify({"keywords": keywords})
    except Exception as e:
        logger.error(f"Error extracting keywords: {str(e)}")
        return jsonify({"error": "Failed to extract keywords. Please try again."}), 500

# @bp.route('/generate-notes', methods=['POST'])
# def generate_notes_route():
#     """
#     Generate notes based on the provided keywords and image path.
#     """
#     data = request.get_json()
#     logger.info(f"Incoming request payload: {data}")  # Log the request payload

#     if not data or 'keywords' not in data or 'image_path' not in data:
#         logger.error("Keywords or image path not provided in the request.")
#         return jsonify({"error": "Keywords and image path are required"}), 400

#     keywords = data['keywords']
#     image_path = data['image_path']

#     try:
#         notes = generate_notes(keywords, image_path)
#         logger.info("Notes generated successfully.")
#         return jsonify({"notes": notes})
#     except Exception as e:
#         logger.error(f"Error generating notes: {str(e)}")
#         return jsonify({"error": "Failed to generate notes. Please try again."}), 500

# @bp.route('/generate-notes', methods=['POST'])
# def generate_notes_route():
#     """
#     Generate notes based on the provided keywords and image path.
#     """
#     data = request.get_json()
#     logger.info(f"Incoming request payload: {data}")  # Log the request payload

#     if not data or 'keywords' not in data or 'image_path' not in data:
#         logger.error("Keywords or image path not provided in the request.")
#         return jsonify({"error": "Keywords and image path are required"}), 400

#     keywords = data['keywords']
#     image_path = data['image_path']

#     try:
#         notes = generate_notes(keywords, image_path)
#         logger.info("Notes generated successfully.")
#         return jsonify({"notes": notes})
#     except Exception as e:
#         logger.error(f"Error generating notes: {str(e)}")
#         return jsonify({"error": "Failed to generate notes. Please try again."}), 500
# @bp.route('/generate-notes', methods=['POST'])
# def generate_notes_route():
#     """
#     Generate notes based on the provided keywords and template image.
#     """
#     data = request.get_json()
#     logger.info(f"Incoming request payload: {data}")  # Log the request payload

#     if not data or 'keywords' not in data or 'template_image_url' not in data:
#         logger.error("Keywords or template image URL not provided in the request.")
#         return jsonify({"error": "Keywords and template image URL are required"}), 400

#     keywords = data['keywords']
#     template_image_url = data['template_image_url']

#     try:
#         # Download the template image and get the temporary file path
#         temp_image_path = download_image(template_image_url)
#         logger.info(f"Template image downloaded to: {temp_image_path}")

#         # Generate notes using the keywords and template image
#         notes = generate_notes(keywords, temp_image_path)
#         logger.info("Notes generated successfully.")

#         # Clean up the temporary file
#         os.remove(temp_image_path)
#         logger.info(f"Temporary file deleted: {temp_image_path}")

#         return jsonify({"notes": notes})
#     except Exception as e:
#         logger.error(f"Error generating notes: {str(e)}")
#         return jsonify({"error": "Failed to generate notes. Please try again."}), 500
    
@bp.route('/generate-notes', methods=['POST'])
def generate_notes_route():
    """
    Generate notes based on the provided keywords and template image URL.
    """
    data = request.get_json()
    logger.info(f"Incoming request payload: {data}")  # Log the request payload

    if not data or 'keywords' not in data or 'template_image_url' not in data:
        logger.error("Keywords or template image URL not provided in the request.")
        return jsonify({"error": "Keywords and template image URL are required"}), 400

    keywords = data['keywords']
    template_image_url = data['template_image_url']

    try:
        # Generate notes using the keywords and template image URL
        notes = generate_notes(keywords, template_image_url)
        logger.info("Notes generated successfully.")

        return jsonify({"notes": notes})
    except Exception as e:
        logger.error(f"Error generating notes: {str(e)}")
        return jsonify({"error": "Failed to generate notes. Please try again."}), 500
    
@bp.route('/delete-image', methods=['POST'])
def delete_image():
    """
    Delete an image from Cloudinary using its public ID.
    """
    data = request.get_json()
    if not data or 'publicId' not in data:
        logger.error("No public ID provided in the request.")
        return jsonify({"error": "No public ID provided"}), 400

    public_id = data['publicId']

    try:
        destroy(public_id)
        logger.info(f"Image deleted successfully: {public_id}")
        return jsonify({'message': 'Image deleted successfully'}), 200
    except Exception as e:
        logger.error(f"Error deleting image: {str(e)}")
        return jsonify({'error': 'Failed to delete image. Please try again.'}), 500