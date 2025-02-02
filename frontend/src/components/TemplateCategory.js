import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const TemplateCategory = ({ title, templates, onTemplateClick, onAddTemplate, showAddButton }) => {
  return (
    <CategoryContainer>
      <CategoryTitle>
        {title}
        {showAddButton && onAddTemplate && (
          <AddTemplateButton onClick={onAddTemplate}>
            <ButtonText>Add Template</ButtonText>
            <PlusIcon />
          </AddTemplateButton>
        )}
      </CategoryTitle>
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
  border-bottom: 2px solid #0D173B;
  margin-right: 15px;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const PlusIcon = styled(FaPlus)`
  display: none;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    display: block;
  }
`;

const AddTemplateButton = styled.button`
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 15px;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }

  @media (max-width: 480px) {
    padding: 8px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    margin-right: 10px;
  }
`;

const TemplateList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
`;

const TemplateItem = styled.li`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 200px;
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
  height: 7rem;
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