import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NotesPage = () => {
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
        <Content>
          <Title>Notes Generation Page</Title>
          <Subtitle>This is where you will generate your notes.</Subtitle>
        </Content>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
  font-family: 'Arial', sans-serif;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding-top: 80px; /* Adjust padding to account for the fixed navbar */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #5569af;
  margin-bottom: 2rem;
  text-align: center;
`;

export default NotesPage;