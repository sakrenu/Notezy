import logging
logging.basicConfig(level=logging.DEBUG)

import streamlit as st
from text_extract import extract_text, extract_keywords, extract_text_adv
from text_to_pdf import parse_and_create_pdf, generate_pdf
from notes_generation import generate_notes, initialize_client
from PIL import Image

def main():
    st.set_page_config(page_title="Notezy", layout='wide', page_icon="📖")
    # Main navigation
    choice = st.sidebar.radio('Select a page:', ['Home', 'Text Extraction', 'Notes Generation'])

    if choice == 'Home':
        display_home()
    elif choice == 'Text Extraction':
        extraction_variant = st.sidebar.selectbox('Choose text extraction variant:', ['Lite', 'Advanced'])
        if extraction_variant == 'Lite':
            display_text_extraction()
        elif extraction_variant == 'Advanced':
            display_text_extraction_advanced()
    elif choice == 'Notes Generation':
        client = initialize_client()
        display_notes_generation(client=client)

def display_home():
    st.title('Notezy')
    st.header("Welcome to Notezy")
    st.header('- A comprehensive note-taking companion')
    st.subheader('About')
    st.text('''
        Notezy is a comprehensive note-making solution trying to revolutionize
        the education industry by automating the process of note-making for students.
        This helps students focus more on the lecture than on note-taking.
        Notezy uses EasyOCR for text extraction.
    ''')

def process_text_extraction(uploaded_file, mode='lite'):
    extracted_text = ''
    extraction_time = 0
    try:
        if mode == 'lite':
            extracted_text, extraction_time = extract_text(uploaded_file)
        elif mode == 'adv':
            st.write('Advanced Processing...')
            extracted_text, extraction_time = extract_text_adv(uploaded_file)
            st.write('Advanced Extraction Complete!')
    except Exception as e:
        raise RuntimeError(f"An error occurred during text extraction: {str(e)}")
    return extracted_text, extraction_time
    
def handle_uploaded_image(key):
    uploaded_file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"], key=key)
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption='Uploaded Image')
        return uploaded_file
    return None

def display_text_extraction():
    st.title("Text Extraction LITE")
    st.header('Uses Easy OCR.')
    st.write('Suitable for simpler text extraction like typed text.')
    
    uploaded_file = handle_uploaded_image("text_extraction_lite")
    if uploaded_file is not None:
        if st.button('Recognize text'):
            try:
                extracted_text, extraction_time = process_text_extraction(uploaded_file)
                st.write('Text Extracted:')
                st.success(extracted_text)
                st.write('\nTime for extraction: {}s'.format(extraction_time))
            except RuntimeError as e:
                st.error(str(e))

def display_text_extraction_advanced():
    st.title("Text Extraction Advanced")
    st.header('Uses GPT-4o.')
    st.write('Suitable for complex text extraction including multi-line, complex text structure and even Handwriting')
    
    uploaded_file = handle_uploaded_image("text_extraction_advanced")
    if uploaded_file is not None:
        if st.button('Recognize text with Advanced Features'):
            try:
                extracted_text, extraction_time = process_text_extraction(uploaded_file, mode='adv')
                st.write('Text Extracted:')
                st.success(extracted_text)
                st.write('\nTime for extraction: {}s'.format(extraction_time))
            except RuntimeError as e:
                st.error(str(e))

def display_notes_generation(client):
    st.title("Notes Generation")
    st.subheader('Generate comprehensive notes from text extracted from an image.')

    uploaded_file = handle_uploaded_image("notes_generation")
    if uploaded_file is not None:
        if st.button('Extract Text and Generate Notes'):
            try:
                extracted_text, _ = process_text_extraction(uploaded_file, mode='lite')
                st.write('Text Extracted:')
                st.success(extracted_text)
                
                keywords = extract_keywords(extracted_text, client)
                st.write(keywords)
                if keywords:
                    st.write('Keywords Extracted:', ', '.join(keywords))
                    notes = generate_notes(keywords, client)
                    st.write('Generated Notes:')
                    st.write(notes)

                    # Generate PDF and provide download button
                    if notes:
                        output_filename = parse_and_create_pdf(notes)
                        with open(output_filename, "rb") as file:
                            btn = st.download_button(
                                label="Download PDF",
                                data=file,
                                file_name=output_filename,
                                mime="application/pdf"
                            )
                else:
                    st.error("No keywords extracted; cannot generate notes.")
            except RuntimeError as e:
                st.error(str(e))
                logging.error("An error occurred during text extraction or notes generation", exc_info=True)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
        logging.exception("An error occurred in the main function")