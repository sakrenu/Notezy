from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable

import markdown2
import pdfkit

def parse_and_create_pdf(content):
    doc = SimpleDocTemplate("notezy_output.pdf", pagesize=letter)

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
    return "notezy_output.pdf"

def markdown_to_pdf(markdown_content, output_filename):
    # Convert Markdown to HTML
    html_content = markdown2.markdown(markdown_content)

    # Convert HTML to PDF
    pdfkit.from_string(html_content, output_filename)

def generate_pdf(content):
    # Define the filename for the generated PDF
    output_filename = "notezy_output.pdf"
    
    # Convert markdown content to PDF
    markdown_to_pdf(content, output_filename)
    
    return output_filename

