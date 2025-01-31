import React, { useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavbarContainer>
        <Logo>
          <LogoImage src="/logo.jpg" alt="Notezy Logo" />
          <LogoText>Notezy</LogoText>
        </Logo>
        <MenuIcon onClick={toggleSidebar}>☰</MenuIcon>
        <NavLinks isSidebarOpen={isSidebarOpen}>
          <StyledNavLink to="/home">Home</StyledNavLink>
          <StyledNavLink to="/notes">Notes</StyledNavLink>
          <StyledNavLink to="/templates">Templates</StyledNavLink>
        </NavLinks>
      </NavbarContainer>
    </>
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
  position: relative;

  @media (max-width: 800px) {
    padding: 10px;
  }
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
  color: #4AB7E0;
  font-weight: bold;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
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
  flex-grow: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 800px) {
    position: fixed;
    top: 60px;
    right: ${({ isSidebarOpen }) => (isSidebarOpen ? '0' : '-250px')};
    flex-direction: column;
    background: #FFFFFF;
    width: 250px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    padding: 20px;
    align-items: flex-start;
    z-index: 1000;
  }
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

  @media (max-width: 800px) {
    width: 90%;
    text-align: left;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 800px) {
    display: block;
    margin-right: 120px;
  }
`;

export default Navbar;