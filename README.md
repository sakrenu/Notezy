# Notezy

Notezy is an innovative project which aims at helping students make organized notes. It makes use of a lightweight OCR model to extract simple text from PDFs or classroom PPTs. It has an advanced text extraction model based on GPT-4o which works seamlessly for even handwritten text. The extracted text is further sent to a Large-Language-Model for structured notes generation.

- Initially, we worked on open-source LLMs including Llama-2-7b, Mistral-7b, Gemma-7b, and Llama-3-8b. The performance with Llama-3-8b was good with few-shot-prompting, but hosting it would not be feasible as it requires a GPU with high enough VRAM.
- Then we developed it into a product based on OpenAI GPT models. The notes generation works best with GPT-4 with zero-shot prompting.
- The project is still in the development phase, so buckle up and wait for new releases!

## Table of Contents

- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Features](#features)
- [Contact](#contact)

## Pre-requisites

- **Python 3.12**: Ensure you have Python 3.12 installed on your system.
    - [Python download link](https://www.python.org/downloads/release/python-3120/)
- **Conda**: You will need Conda to manage the project environments.
    - [Conda download link](https://docs.anaconda.com/anaconda/install/)
- **OpenAI API Key**: You need to set up your OpenAI API key.
    - **Windows**:
        ```bash
        set OPENAI_API_KEY=your_openai_api_key
        ```
    - **Linux/Mac**:
        ```bash
        export OPENAI_API_KEY=your_openai_api_key
        ```

## Installation

This guide will walk you through setting up the `Notezy` project on your local machine.

### Environment Setup

1. **Navigate to the Installation Directory**:
    Open your terminal and navigate to the directory where you want to install the project.

    ```bash
    cd path_to_directory
    ```

2. **Create a Conda Environment**:
    Use the following command to create a Conda environment named `notezy` with Python 3.12.

    ```bash
    conda create --name notezy python=3.12
    ```

3. **Activate the Environment**:
    Activate the newly created environment using the following command.

    ```bash
    conda activate notezy
    ```

### Git Installation

4. **Check for Git**:
    Check if Git is already installed by running:

    ```bash
    git --version
    ```

    If Git is not installed, install it using:

    ```bash
    conda install git
    ```

### Clone the Repository

5. **Clone the Repository**:
    Clone the `Notezy` repository using the following command.

    ```bash
    git clone https://github.com/sakrenu/Notezy.git
    ```

6. **Navigate to the Project Directory**:
    Navigate to the project directory.

    ```bash
    cd Notezy
    ```

7. **Install Required Packages**:
    Install the required packages using the `requirements.txt` file.

    ```bash
    pip install -r requirements.txt
    ```

### wkhtmltopdf Installation

**Windows**:

Download the installer from [wkhtmltopdf.org](https://wkhtmltopdf.org/downloads.html) and run the installer.

**Mac**:

Use Homebrew to install `wkhtmltopdf`.

```bash
brew install wkhtmltopdf
```

**Linux**:

On Debian-based systems (e.g., Ubuntu), use:

```bash
sudo apt-get install wkhtmltopdf
```

On Red Hat-based systems (e.g., CentOS, Fedora), use:

```bash
sudo yum install wkhtmltopdf
```

### Run the Project

8. **Run the Project**:
    Run the application using Streamlit.

    ```bash
    streamlit run app.py
    ```

This setup should get the `Notezy` project up and running on your local machine.

![image](https://github.com/user-attachments/assets/66c94a65-719b-4271-b0b6-912e999a84fe)

## Features
1. **Image-Based Note Extraction**

    -  Capture images of your handwritten notes or typed notes and upload them to Notezy for text extraction.
    -  ![image](https://github.com/user-attachments/assets/64c0b30d-9743-46b1-b6ae-e3519948ddc0)

2. **Text Extraction Models**

    - *Lite Model:* Utilizes Easy OCR, a free and easy-to-use optical character recognition tool for basic text extraction.
    - ![image](https://github.com/user-attachments/assets/2ac91303-3d75-420a-92b8-0637ab1b74df)

    - *Advanced Model:* Employs GPT-based models for advanced text extraction, providing higher accuracy and better handling of complex texts.
    - ![image](https://github.com/user-attachments/assets/9a6880a1-810d-436b-951c-b4d24fc11bed)

3. **Keyword Extraction**

    - Identify and extract important keywords from the notes to help you remember key topics and concepts.
    - ![image](https://github.com/user-attachments/assets/1be32da7-8ec7-4dcc-82a4-b8cb9bc23e75)

4. **Note Generation**

    - Generate well-structured notes from the extracted text using GPT models, ensuring clarity and comprehensiveness.
    - Obtain detailed and organized notes on the topics of your choice, enhancing your study material.
    - ![image](https://github.com/user-attachments/assets/bc8cc84d-e912-4a1d-8b15-2efffa45eb1e)

5. **Downloadable Content**

    - ![image](https://github.com/user-attachments/assets/024f6b2e-940c-4632-b0a7-f01c091cd472)


    - Download the generated notes and detailed information for offline access and further use.

## Contact

- Renukasakshi V Patil (renukasakshivpatil.211ai030@nitk.edu.in)
- Abhin B (abhinb.211ai003@nitk.edu.in)
