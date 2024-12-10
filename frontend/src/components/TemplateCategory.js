// frontend/src/components/TemplateCategory.js

import React from 'react';
import styled from 'styled-components';

const TemplateCategory = ({ title, templates, onTemplateClick }) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{title}</CategoryTitle>
      <TemplateList>
        {templates.map((template) => (
          <TemplateItem key={template.id} onClick={() => onTemplateClick(template)}>
            <TemplateImage src={template.imageUrl} alt={template.name} />
            <TemplateName>{template.name}</TemplateName>
            <TemplateDescription>{template.description}</TemplateDescription>
          </TemplateItem>
        ))}
      </TemplateList>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1rem;
  text-align: left;
  border-bottom: 2px solid #0D173B; /* Add a line under the heading */
  padding-bottom: 5px; /* Add some padding below the line */
`;

const TemplateList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* Align templates to the left */
  gap: 20px;
`;

const TemplateItem = styled.li`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 200px; /* Adjust the width as needed */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const TemplateImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TemplateName = styled.h3`
  font-size: 1rem;
  color: #0D173B;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  font-size: 0.9rem;
  color: #5569af;
`;

export default TemplateCategory;