import markdown2
import pdfkit

path_to_wkhtmltopdf = r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"  # Adjust this path based on your installation

config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)

def markdown_to_pdf(md_text):
    output_filename = 'notezy_output.pdf'
    
    # Custom CSS for fonts
    css = """
    <style>
        body {
            font-family: 'Verdana', sans-serif;
            line-height: 1.6;
        }
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Verdana', sans-serif;
            margin-top: 20px;
        }
    </style>
    """
    
    html_content = markdown2.markdown(md_text)
    html_content_with_css = f"""
    <!DOCTYPE html>
    <html>
    <head>
    {css}
    </head>
    <body>
    {html_content}
    </body>
    </html>
    """
    
    pdfkit.from_string(html_content_with_css, output_filename, configuration=config)
    return output_filename