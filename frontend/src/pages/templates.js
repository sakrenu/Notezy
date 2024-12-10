// frontend/src/pages/templates.js

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from '../components/Navbar';
import TemplateCategory from '../components/TemplateCategory';

const TemplatesPage = () => {
  const defaultTemplates = [
    { id: 1, name: 'Template 1', description: 'This is a default template.' },
    { id: 2, name: 'Template 2', description: 'Another default template.' },
  ];

  const publicTemplates = [
    { id: 1, name: 'Public Template 1', description: 'This is a public template.' },
    { id: 2, name: 'Public Template 2', description: 'Another public template.' },
  ];

  const privateTemplates = [
    { id: 1, name: 'Private Template 1', description: 'This is a private template.' },
    { id: 2, name: 'Private Template 2', description: 'Another private template.' },
  ];

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar />
        <MainContent>
          <Title>Templates</Title>
          <TemplateCategory title="Default Templates" templates={defaultTemplates} />
          <TemplateCategory title="Public Templates" templates={publicTemplates} />
          <TemplateCategory title="Private Templates" templates={privateTemplates} />
          <AddTemplateButton>Add Template</AddTemplateButton>
        </MainContent>
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
  justify-content: flex-start; /* Changed to flex-start */
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  margin-top: 60px; /* Adjust this value to ensure content starts below the Navbar */
  background: #FFFFFF; /* Ensure the background is white */
  border-radius: 10px; /* Optional: Add border-radius for better visual separation */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add box-shadow for better visual separation */
  width: 90%; /* Optional: Limit the width to ensure it doesn't touch the edges */
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

export default TemplatesPage;
