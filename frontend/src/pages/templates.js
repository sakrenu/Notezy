// frontend/src/pages/templates.js

import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from '../components/Navbar';
import TemplateCategory from '../components/TemplateCategory';
import AddTemplateModal from '../components/AddTemplateModal';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore";

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      const templatesCollection = collection(db, 'templates');
      const templatesSnapshot = await getDocs(templatesCollection);
      const templatesData = templatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTemplates(templatesData);
    };

    fetchTemplates();
  }, []);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const handleAddTemplate = () => {
    setIsModalOpen(true);
  };

  const handleTemplateAdded = () => {
    setIsModalOpen(false);
    // Refetch templates after adding a new one
    const fetchTemplates = async () => {
      const templatesCollection = collection(db, 'templates');
      const templatesSnapshot = await getDocs(templatesCollection);
      const templatesData = templatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTemplates(templatesData);
    };

    fetchTemplates();
  };

  const defaultTemplates = templates.filter(template => !template.isPublic);
  const publicTemplates = templates.filter(template => template.isPublic);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar />
        <MainContent>
          <Title>Templates</Title>
          <TemplateCategory title="Default Templates" templates={defaultTemplates} onTemplateClick={handleTemplateClick} />
          <TemplateCategory title="Public Templates" templates={publicTemplates} onTemplateClick={handleTemplateClick} />
          <AddTemplateButton onClick={handleAddTemplate}>Add Template</AddTemplateButton>
        </MainContent>
        {selectedTemplate && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
              <TemplateImage src={selectedTemplate.imageUrl} alt={selectedTemplate.name} />
              <TemplateName>{selectedTemplate.name}</TemplateName>
              <TemplateDescription>{selectedTemplate.description}</TemplateDescription>
            </ModalContent>
          </ModalOverlay>
        )}
        <AddTemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTemplateAdded={handleTemplateAdded} />
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
  align-items: flex-start; /* Align content to the left */
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add box-shadow for better visual separation */
  width: 100%; /* Ensure the content takes the full width */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 2px solid #0D173B; /* Add a line under the heading */
  padding-bottom: 5px; /* Add some padding below the line */
  width: 100%; /* Ensure the title takes the full width */
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
  align-self: center; /* Center the button */

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