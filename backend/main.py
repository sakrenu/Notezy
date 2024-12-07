from flask import Flask
from app.routes import register_routes  # Import the function to register routes
from dotenv import load_dotenv
import os

def create_app():
    # Load environment variables from the .env file
    base_dir = os.path.abspath(os.path.dirname(__file__))
    env_path = os.path.join(base_dir, '../.env')  # Assuming .env is one level above 'backend'
    load_dotenv(env_path)

    # Initialize Flask app
    app = Flask(__name__)
    
    # Configure app (optional: add configurations if needed)
    app.config['UPLOAD_FOLDER'] = os.path.join(base_dir, 'app', 'static', 'uploads')
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Register routes
    register_routes(app)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)  # Set debug to False in production