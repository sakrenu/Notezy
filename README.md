# Notezy
Notezy is an innovative project which aims at helping students make organized notes. It makes use of a lightweight OCR model to extract simple text from PDFs or classroom PPTs. It has an advanced text extraction model based on LLMs which works seamlessly for even handwritten text. The extracted text is further sent to a Large-Language-Model for structured notes generation.

## Features under development

- React Frontend
- Django Backend
- Notes page Frontend

## Prerequisites

Make sure you have the following tools installed on your system:

- [Node.js](https://nodejs.org/) (includes npm)
- [Python](https://www.python.org/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

## 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/sakrenu/Notezy.git
cd full-app
```

## 2. Set up the frontend (React app)

### Install npm dependencies
Navigate to the `frontend` folder: 

```bash
cd frontend
```

Then, install the necessary npm packages:
```bash
npm install
```

### Set up Firebase

1. Install Firebase CLI globally if you haven't already:
```bash
npm install firebase
```

### Run the FrontEnd

Once Firebase is set up and dependencies are installed, you can run the frontend app inside `my-react-app`:
```bash
npm start
```

This will start the React development server and you can access the app at `http://localhost:3000`

## 3. Set up the backend (Flask app)

### install Python dependencies

Navigate to the `backend` folder:
```bash
cd ../backend
```

Create a virtual environment (optional but recommended):
```bash
python -m venv venv
```

Activate the virtual environment:

- For macOS/Linux:
```
source venv/bin/activate
```

- For Windows:
```
.\venv\Scripts\activate
```

Install the required Python packages:
```
pip install -r requirements.txt
```

### Run the Flask BackEnd

To start the Flask server, run:

```bash
flask run
```

This will start the Flask server on `http://127.0.0.1:5000`

## 4. Access the Application 
- Frontend: Go to `http://localhost:3000` in your browser to view the React app. 
- Backend: The Flask server will run on `http://127.0.0.1:8000`.

## Contact

- Renukasakshi V Patil (renukasakshivpatil.211ai030@nitk.edu.in)
- Abhin B (abhinb.211ai003@nitk.edu.in)
