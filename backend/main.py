from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from app.routes import bp

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.register_blueprint(bp)

if __name__ == '__main__':
    app.run(debug=True)

