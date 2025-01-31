import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaHome, FaStickyNote, FaLayerGroup } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      {/* Logo Section */}
      <Logo>
        <LogoImage src="/logo.jpg" alt="Notezy Logo" />
        <LogoText>Notezy</LogoText>
      </Logo>

      {/* Centered Navigation Links */}
      <NavLinks>
        <StyledNavLink to="/home">
          <FaHome />
          <IconText> Home</IconText>
        </StyledNavLink>
        <StyledNavLink to="/notes">
          <FaStickyNote />
          <IconText> Notes</IconText>
        </StyledNavLink>
        <StyledNavLink to="/templates">
          <FaLayerGroup />
          <IconText> Templates</IconText>
        </StyledNavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

// Styled Components
const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;

  @media (max-width: 800px) {
    padding: 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  color: #4ab7e0;
  font-weight: bold;
  background: linear-gradient(90deg, #4ab7e0, #84ac64);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  @media (max-width: 800px) {
    width: 20px;
    height: 20px;
  }
`;

const LogoText = styled.span`
  font-size: 2rem;
  color: #4ab7e0;
  font-weight: bold;
  background: linear-gradient(90deg, #4ab7e0, #84ac64);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-right: 80px;
  flex-grow: 1; /* Allows the nav links to take up available space */

  @media (max-width: 800px) {
    gap: 10px;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #4ab7e0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, color 0.3s ease;

  &.active {
    background-color: #e2d64b;
    color: #0d173b;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    color: #0d173b;
  }

  @media (max-width: 800px) {
    padding: 8px;
    gap: 4px;
    font-size: 0.9rem;
  }
`;

const IconText = styled.span`
  @media (max-width: 800px) {
    display: none;
  }
`;

export default Navbar;