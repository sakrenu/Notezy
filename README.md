# Notezy

Notezy is an innovative project which aims at helping student make organized notes. It makes use of lightweight OCR model to extract simple text from pdf or classroom PPTs. It has an advanced text extraction model based on GPT-4o which works seemlessly for even Handwritten text.
The extracted text is further sent to a Large-Language-Model for structured Notes generation. 
- Initially we worked on Open-source LLMs including Llama-2-7b, Mistral-7b, Gemma-7b and Llama-3-8b. The performance with Llama-3-8b was good with Few-shot-prompting but hosting it would not be feasible as it requires GPU with high enough VRAM.
- Then we switched to make it a product based on OpenAI GPT models. The notes generation works best with GPT-4 with Zero shot prompting.
- The project is still in development phase, so buckle up and wait for new releases!

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Contact](#contact)

## Installation

This guide will walk you through setting up the `Notezy` project on your local machine.

### Prerequisites

- **Python 3.12**: Ensure you have Python 3.12 installed on your system.
    - Python download link : [text](https://www.python.org/downloads/release/python-3120/)
- **Conda**: You will need Conda to manage the project environments.
    - Conda download link : [text](https://docs.anaconda.com/anaconda/install/)

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

### Run the Project

6. **Run the Project**:
    Navigate to the project directory and run the application using Streamlit.

    ```bash
    cd Notezy
    streamlit run app.py
    ```

This setup should get the `Notezy` project up and running on your local machine.

## Features

- The major features stands out to be a fully fledged notes generation system.
- Uses RAG to answer questions based on the notes generated.
- The streamlit app can do text recognition separately.
- It can compare the time and accuaracy between different SOTA offline OCR models with any given input image.


## Contact

- Renukasakshi V Patil (renukasakshivpatil.211ai030@nitk.edu.in)
- Abhin B (abhinb.211ai003@nitk.edu.in)