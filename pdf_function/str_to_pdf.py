from fpdf import FPDF

output_notes = """Sample output 1:

Keywords given : Computer Science, Machine Learning, Deep Learning

Title: Introduction to Machine Learning in Computer Science

Pre-requisites: Basic understanding of computer science concepts such as algorithms, data structures, and programming languages.

Introduction:
Machine Learning is a subset of Artificial Intelligence (AI) that allows computers to learn and improve from experience without being explicitly programmed. In the field of Computer Science, Machine Learning has gained significant importance due to its ability to analyze and interpret complex data, automate tasks, and make decisions based on patterns and algorithms.

Simpler Analogy: Machine Learning is like training a pet. Just like how you teach a pet to perform certain tasks by rewarding good behavior and correcting mistakes, machine learning algorithms learn from data to make predictions and decisions.

Examples:
1. Spam Detection: Machine learning algorithms can be used to classify emails as spam or not spam based on patterns in the content and sender information.
2. Recommendation Systems: Platforms like Netflix and Amazon use machine learning to analyze user preferences and recommend movies or products accordingly.

Relevant Formulas: 
- Linear Regression: y = mx + b
- Logistic Regression: Sigmoid Function
- Neural Network: Backpropagation algorithm

Some similar topics to go through:
1. Artificial Intelligence: Learn about the broader field of AI and its various applications.
2. Data Science: Explore how data analysis and machine learning are used to extract insights from large datasets.
3. Deep Learning: Delve deeper into neural networks and complex algorithms used in deep learning models.

Summary:
Machine Learning is a powerful tool in Computer Science that enables computers to learn and improve from data without being explicitly programmed. Understanding key concepts and algorithms in machine learning can open up a wide range of possibilities in AI applications and data analysis.

"""
pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)
pdf.multi_cell(0, 10, output_notes)
pdf.output("output.pdf")
