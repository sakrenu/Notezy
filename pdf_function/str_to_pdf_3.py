from fpdf import FPDF

class PDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_utf8_font()

    def add_utf8_font(self):
        self.add_font('DejaVu', '', 'DejaVuSansCondensed.ttf', uni=True)
        self.set_font('DejaVu', '', 12)

    def header(self):
        self.set_font("DejaVu", 'B', 12)
        self.cell(0, 10, 'Note generated using Notezy', 0, 1, 'C')

    def footer(self):
        self.set_y(-15)
        self.set_font("DejaVu", 'I', 8)
        self.cell(0, 10, 'Page %s' % self.page_no(), 0, 0, 'C')

    def add_title(self, title):
        self.set_font("DejaVu", 'B', 16)
        self.cell(0, 10, title, 0, 1, 'C')
        self.ln(10)

    def add_heading(self, heading):
        self.set_font("DejaVu", 'B', 14)
        self.cell(0, 10, heading, 0, 1)
        self.ln(5)

    def add_subheading(self, subheading):
        self.set_font("DejaVu", 'B', 12)
        self.cell(10)
        self.cell(0, 10, subheading, 0, 1)
        self.ln(5)

    def add_bullet_point(self, bullet_point):
        self.set_font("DejaVu", '', 12)
        self.cell(10)
        self.multi_cell(0, 10, f'• {bullet_point}')
        self.ln(2)

    def add_text(self, text):
        self.set_font("DejaVu", '', 12)
        self.multi_cell(0, 10, text)
        self.ln(5)

def parse_and_create_pdf(content):
    pdf = PDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    lines = content.split('\n')
    for line in lines:
        if line.startswith("Title:"):
            pdf.add_title(line.replace("Title:", "").strip())
        elif line.startswith("Pre-requisites:"):
            pdf.add_heading("Pre-requisites")
            pdf.add_text(line.replace("Pre-requisites:", "").strip())
        elif line.startswith("Introduction:"):
            pdf.add_heading("Introduction")
            pdf.add_text(line.replace("Introduction:", "").strip())
        elif line.startswith("Simpler Analogy:"):
            pdf.add_heading("Simpler Analogy")
            pdf.add_text(line.replace("Simpler Analogy:", "").strip())
        elif line.startswith("Examples:"):
            pdf.add_heading("Examples")
        elif line.startswith("Relevant Formulas:"):
            pdf.add_heading("Relevant Formulas")
        elif line.startswith("Similar Topics to go through:"):
            pdf.add_heading("Similar Topics to go through")
        elif line.startswith("Summary:"):
            pdf.add_heading("Summary")
            pdf.add_text(line.replace("Summary:", "").strip())
        elif line.startswith("1. ") or line.startswith("2. ") or line.startswith("3. "):
            pdf.add_bullet_point(line.strip())
        elif line:
            pdf.add_text(line.strip())

    pdf.output("notezy_output.pdf")

# Example content
content = """Title: Mechanical Engineering - Fluid Mechanics

Pre-requisites: Basic understanding of physics, mathematics, and mechanics.

Introduction:
Fluid mechanics is a branch of mechanics that deals with the behavior of fluids (liquids, gases, and plasmas) at rest and in motion. It is a fundamental subject in mechanical engineering, as it plays a crucial role in various areas such as aerospace engineering, civil engineering, chemical engineering, and more. Understanding fluid mechanics is essential for designing and analyzing systems that involve the flow of fluids.

Simpler Analogy:
Imagine a river flowing down a mountain. The study of fluid mechanics would involve understanding how the water moves, how fast it flows, and what forces are acting on it. Just like how we analyze the behavior of water in the river, fluid mechanics helps engineers understand how fluids behave in various systems.

Examples:
1. Calculating the pressure distribution in a dam.
2. Analyzing the lift and drag forces on an airplane wing.
3. Designing a water pump for efficient fluid flow.

Relevant Formulas:
1. Bernoulli's Equation: P + 1/2ρv^2 + ρgh = constant
2. Continuity Equation: A1V1 = A2V2
3. Navier-Stokes Equation: ρ(Dv/Dt) = -∇P + μ∇^2v + ρg

Similar Topics to go through:
1. Heat Transfer: Deals with the transfer of thermal energy between systems.
2. Thermodynamics: Study of energy and its transformations in mechanical systems.
3. Solid Mechanics: Deals with the behavior of solid materials under different conditions.

Summary:
Fluid mechanics is a crucial aspect of mechanical engineering that helps engineers analyze and design systems involving the flow of fluids. By understanding the principles of fluid mechanics, engineers can optimize the performance of various systems, ranging from aircraft wings to water pumps. The study of fluid mechanics provides a foundation for solving complex engineering problems related to fluid flow and pressure distribution.
"""

# Generate PDF
parse_and_create_pdf(content)
