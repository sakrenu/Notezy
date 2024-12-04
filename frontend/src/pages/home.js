import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

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
        <Navbar>
          <Logo>
            <LogoImage src="/logo.jpg" alt="Notezy Logo" />
            <LogoText>Notezy</LogoText>
          </Logo>
          <NavLinks>
            <StyledNavLink to="/home">Home</StyledNavLink>
            <StyledNavLink to="/notes">Notes</StyledNavLink>
          </NavLinks>
        </Navbar>
        <HeroSectionContent />
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

// Styled Components
const Container = styled.div`
  background: #FFFFFF;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  flex: 0.1;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  color: #4AB7E0;
  font-weight: bold;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const LogoText = styled.span`
  font-size: 2rem;
  color: #4AB7E0;
  font-weight: bold;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-grow: 1;
`;

const StyledNavLink = styled(NavLink)`
  color: #4AB7E0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, color 0.3s ease;

  &.active {
    background-color: #E2D64B;
    color: #0D173B;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    color: #0D173B;
  }
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(90deg, #d8e9ff 0%, #ffeef8 100%);
  flex: 0.9;
`;

const HeroText = styled.div`
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #0D173B;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #5569af;
  animation: ${fadeIn} 2s ease-in-out;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
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
  height: 100%;
  object-fit: cover;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export default StudentHomePage;