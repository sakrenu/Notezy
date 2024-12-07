import streamlit as st
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable
import base64

def parse_and_create_pdf(content, output_path):
    doc = SimpleDocTemplate(output_path, pagesize=letter)

    styles = getSampleStyleSheet()
    normal_style = styles['Normal']
    title_style = styles['Title']
    heading_style = styles['Heading1']
    subheading_style = styles['Heading2']
    bullet_style = styles['Bullet']

    story = []

    lines = content.split('\n')

    for line in lines:
        if line.startswith("*") and line.endswith("*"):
            title_text = line.strip('*').strip()
            story.append(Paragraph(title_text, title_style))
            story.append(Spacer(1, 12))
        elif line.startswith("**") and line.endswith("**"):
            heading_text = line.strip('**').strip()
            story.append(Paragraph(heading_text, heading_style))
            story.append(Spacer(1, 12))
        elif line.startswith("***") and line.endswith("***"):
            subheading_text = line.strip('***').strip()
            story.append(Paragraph(subheading_text, subheading_style))
            story.append(Spacer(1, 12))
        elif line.startswith("- "):
            bullet_text = line.replace("- ", "").strip()
            story.append(ListFlowable([Paragraph(bullet_text, bullet_style)], bulletType='bullet'))
            story.append(Spacer(1, 6))
        elif line:
            story.append(Paragraph(line.strip(), normal_style))
            story.append(Spacer(1, 6))  # Adjust spacing as needed

    doc.build(story)

def download_pdf_link(pdf_path):
    with open(pdf_path, "rb") as pdf_file:
        base64_pdf = base64.b64encode(pdf_file.read()).decode('utf-8')
    pdf_display = f'<a href="data:application/pdf;base64,{base64_pdf}" download="notezy_output.pdf">Download PDF</a>'
    return pdf_display

# Streamlit app
st.title("Text to PDF Converter")

text_input = notes_generated // generated notes as input 

if st.button("Generate PDF"):
    output_path = "notezy_output.pdf"
    parse_and_create_pdf(text_input, output_path)
    st.markdown(download_pdf_link(output_path), unsafe_allow_html=True)
