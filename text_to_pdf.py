from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable

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

# Example content
content = """
*Mechanical Engineering - Fluid Mechanics*

**Pre-requisites**
Basic understanding of physics, mathematics, and mechanics.

**Introduction**
Fluid mechanics is a branch of mechanics that deals with the behavior of fluids (liquids, gases, and plasmas) at rest and in motion. It is a fundamental subject in mechanical engineering, as it plays a crucial role in various areas such as aerospace engineering, civil engineering, chemical engineering, and more. Understanding fluid mechanics is essential for designing and analyzing systems that involve the flow of fluids.

***Simpler Analogy***
Imagine a river flowing down a mountain. The study of fluid mechanics would involve understanding how the water moves, how fast it flows, and what forces are acting on it. Just like how we analyze the behavior of water in the river, fluid mechanics helps engineers understand how fluids behave in various systems.

**Examples**
- Calculating the pressure distribution in a dam.
- Analyzing the lift and drag forces on an airplane wing.
- Designing a water pump for efficient fluid flow.

**Relevant Formulas**
- Bernoulli's Equation: P + 1/2ρv^2 + ρgh = constant
- Continuity Equation: A1V1 = A2V2
- Navier-Stokes Equation: ρ(Dv/Dt) = -∇P + μ∇^2v + ρg

**Similar Topics to go through**
- Heat Transfer: Deals with the transfer of thermal energy between systems.
- Thermodynamics: Study of energy and its transformations in mechanical systems.
- Solid Mechanics: Deals with the behavior of solid materials under different conditions.

**Summary**
Fluid mechanics is a crucial aspect of mechanical engineering that helps engineers analyze and design systems involving the flow of fluids. By understanding the principles of fluid mechanics, engineers can optimize the performance of various systems, ranging from aircraft wings to water pumps. The study of fluid mechanics provides a foundation for solving complex engineering problems related to fluid flow and pressure distribution.
"""

# Generate PDF
parse_and_create_pdf(content)
