import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import Navbar from '../components/Navbar';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HeroSectionContent = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/notes');
  };
  return (
    <HeroSection>
      <HeroText>
        <Title>Empower Your Studies</Title>
        <Subtitle>
          Generate detailed notes effortlessly and enhance your learning experience.
        </Subtitle>
        <Actions>
          <ActionButton primary onClick={handleGetStarted}>Get Started</ActionButton>
        </Actions>
      </HeroText>
      <HeroImage src="/homepage.jpg" alt="Study" />
    </HeroSection>
  );
};

const StudentHomePage = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar /> {/* Use the Navbar component */}
        <HeroSectionContent />
      </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background-color: #FFFFFF;
    color: #0D173B;
    font-family: 'Arial', sans-serif;
  }
  #root {
    height: 100vh;
    overflow: auto; /* Changed from hidden to auto for scrollability */
  }
`;

// Styled Components
const Container = styled.div`
  background: #FFFFFF;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow: auto;
  position: relative; 
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
  flex: 0.9;
  @media (max-width: 800px) {
    flex-direction: column;
    height: 100vh;
    text-align: center;
    padding: 10px;
  }
`;

const HeroText = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  @media (max-width: 800px) {
    flex: 1;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #0D173B;
  animation: ${fadeIn} 1.5s ease-in-out;
  @media (max-width: 800px) {
    font-size: 2rem;
    margin-right: 15px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #5569af;
  animation: ${fadeIn} 2s ease-in-out;
  @media (max-width: 800px) {
    font-size: 1rem;
    margin-right: 15px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 800px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 15px;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }
  &:first-child {
    margin-right: 10px;
  }
`;

const HeroImage = styled.img`
  flex: 1;
  max-width: 50%;
  border-radius: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 800px) {
    max-width: 90%;
    order: -1;
    border-radius: 20px;
    height: auto;
    margin-bottom: 20px;
  }
`;

export default StudentHomePage;