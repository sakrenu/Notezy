// frontend/src/pages/templates.js

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from '../components/Navbar';
import TemplateCategory from '../components/TemplateCategory';

const TemplatesPage = () => {
  const defaultTemplates = [
    { id: 1, name: 'Template 1', description: 'This is a default template.', image: '/path/to/template1.jpg' },
    { id: 2, name: 'Template 2', description: 'Another default template.', image: '/path/to/template2.jpg' },
  ];

  const publicTemplates = [
    { id: 1, name: 'Public Template 1', description: 'This is a public template.', image: '/path/to/public1.jpg' },
    { id: 2, name: 'Public Template 2', description: 'Another public template.', image: '/path/to/public2.jpg' },
  ];

  const privateTemplates = [
    { id: 1, name: 'Private Template 1', description: 'This is a private template.', image: '/path/to/private1.jpg' },
    { id: 2, name: 'Private Template 2', description: 'Another private template.', image: '/path/to/private2.jpg' },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar />
        <MainContent>
          <Title>Templates</Title>
          <TemplateCategory title="Default Templates" templates={defaultTemplates} onTemplateClick={handleTemplateClick} />
          <TemplateCategory title="Public Templates" templates={publicTemplates} onTemplateClick={handleTemplateClick} />
          <TemplateCategory title="Private Templates" templates={privateTemplates} onTemplateClick={handleTemplateClick} />
          <AddTemplateButton>Add Template</AddTemplateButton>
        </MainContent>
        {selectedTemplate && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
              <TemplateImage src={selectedTemplate.image} alt={selectedTemplate.name} />
              <TemplateName>{selectedTemplate.name}</TemplateName>
              <TemplateDescription>{selectedTemplate.description}</TemplateDescription>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background-color: #FFFFFF;
    color: #0D173B;
    font-family: 'Arial', sans-serif;
  }

  #root {
    height: 100%;
    overflow: hidden;
  }
`;

const Container = styled.div`
  background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add box-shadow for better visual separation */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 2rem;
  text-align: center;
`;

const AddTemplateButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 15px;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const TemplateImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TemplateName = styled.h3`
  font-size: 1.5rem;
  color: #0D173B;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  font-size: 1rem;
  color: #5569af;
`;

export default TemplatesPage;
