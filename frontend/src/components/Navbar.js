// frontend/src/components/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
      <Logo>
        <LogoImage src="/logo.jpg" alt="Notezy Logo" />
        <LogoText>Notezy</LogoText>
      </Logo>
      <NavLinks>
        <StyledNavLink to="/home">Home</StyledNavLink>
        <StyledNavLink to="/notes">Notes</StyledNavLink>
        <StyledNavLink to="/templates">Templates</StyledNavLink> {/* New link for TemplatesPage */}
      </NavLinks>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
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

export default Navbar;
