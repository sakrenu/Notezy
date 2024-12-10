// frontend/src/components/TemplateCategory.js

import React from 'react';
import styled from 'styled-components';

const TemplateCategory = ({ title, templates }) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{title}</CategoryTitle>
      <TemplateList>
        {templates.map((template) => (
          <TemplateItem key={template.id}>
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
  text-align: center;
`;

const TemplateList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TemplateItem = styled.li`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TemplateName = styled.h3`
  font-size: 1.2rem;
  color: #0D173B;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  font-size: 1rem;
  color: #5569af;
`;

export default TemplateCategory;