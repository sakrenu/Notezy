import logging
logging.basicConfig(level=logging.DEBUG)

import streamlit as st
from text_extract import extract_text
from PIL import Image

def main():
    st.set_page_config(page_title="Notezy", layout='wide', page_icon="📖")
    st.sidebar.title("Navigation")
    choice = st.sidebar.selectbox('Choose a page:', ['Home', 'Text Extraction LITE', 'Text Extraction Advanced', 'Notes Generation'])

    if choice == 'Home':
        display_home()
    elif choice == 'Text Extraction LITE':
        display_text_extraction()

def display_home():
    st.title('Notezy')
    st.header('- A comprehensive note-taking companion')
    st.subheader('About')
    st.text('''
        Notezy is a comprehensive note-making solution trying to revolutionize
        the education industry by automating the process of note-making for students.
        This helps students focus more on the lecture than on note-taking.
        Notezy uses EasyOCR for text extraction.
    ''')

def display_text_extraction():
    st.title("Text Extraction LITE")
    st.header('This is a simple text extractor which is based on Easy OCR. Suitable for Typed text and single word Handwritten text.')
    uploaded_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption='Uploaded Image')
        if st.button('Recognize text'):
            try:
                extracted_text, extraction_time = extract_text(uploaded_file)
                st.write('Text Extracted:')
                st.success(extracted_text)
                st.write('\nTime for extraction: {}s'.format(extraction_time))
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")

def notes_generation_pipeline():
    uploaded_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption='Uploaded Image')
        if st.button('Recognize text'):
            try:
                extracted_text, extraction_time = extract_text(uploaded_file)
                st.write('Text Extracted:')
                st.success(extracted_text)
                st.write('\nTime for extraction: {}s'.format(extraction_time))
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        logging.exception("An error occurred in the main function")