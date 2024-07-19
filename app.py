import logging
logging.basicConfig(level=logging.DEBUG)

import streamlit as st
from text_extract import extract_text, extract_keywords, extract_text_adv
from notes_generation import generate_notes, initialize_client
from PIL import Image

def main():
    st.set_page_config(page_title="Notezy", layout='wide', page_icon="📖")
    client = initialize_client()
    st.sidebar.title("Navigation")
    choice = st.sidebar.selectbox('Choose a page:', ['Home', 'Text Extraction LITE', 'Text Extraction Advanced', 'Notes Generation'])

    if choice == 'Home':
        display_home()
    elif choice == 'Text Extraction LITE':
        display_text_extraction()
    elif choice == 'Notes Generation':
        display_notes_generation(client=client)

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

def display_notes_generation(client):
    st.title("Notes Generation")
    st.subheader('Generate comprehensive notes from text extracted from an image.')
    uploaded_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption='Uploaded Image')
        if st.button('Extract Text and Generate Notes'):
            try:
                extracted_text, _ = extract_text(uploaded_file)
                st.write('Text Extracted:')
                st.success(extracted_text)
                
                keywords = extract_keywords(extracted_text)
                if keywords:
                    st.write('Keywords Extracted:', ', '.join(keywords))
                    notes = generate_notes(keywords, client)
                    st.write('Generated Notes:')
                    st.write(notes)
                else:
                    st.error("No keywords extracted; cannot generate notes.")
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")
                logging.error("An error occurred during text extraction or notes generation", exc_info=True)

#this is for understanding purpose. TBC
def extract_notes(image_path):
    
    notes, duration = extract_text_adv(image_path)
    keywords_to_display= extract_keywords(notes)
    pass
    

     #print and put it to st format

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        logging.exception("An error occurred in the main function")