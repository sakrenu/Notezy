import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuthContext } from '../hooks/AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import UpdateProfile from './UpdateProfile'; // Assuming you have an UpdateProfile component

const UserProfile = () => {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setIsOpen(false); // Close dropdown before signing out
      await logout();
      navigate('/'); // Redirect to home after signout
    } catch (error) {
      console.error('Error signing out:', error);
      setProfileError('Failed to sign out. Please try again.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdateProfile = () => {
    navigate('/update_profile');
    setIsOpen(false); // Close dropdown after navigation
  };

  // Early return if no user
  if (!user) {
    return null; // Or a fallback UI
  }

  return (
    <ProfileContainer ref={dropdownRef}>
      <ProfileButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User profile menu"
        aria-expanded={isOpen}
      >
        <ProfileInitial>
          {user.displayName?.[0].toUpperCase() || user.email?.[0].toUpperCase() || 'U'}
        </ProfileInitial>
      </ProfileButton>

      {isOpen && (
        <DropdownMenu role="menu">
          <UserInfo>
            <UserDetails>
              <UserName>{user.displayName || 'User'}</UserName>
              <UserEmail>{user.email}</UserEmail>
              <UserRole>Role: {user.role || 'Not Set'}</UserRole>
            </UserDetails>
          </UserInfo>
          <Divider />
          <MenuItem
            onClick={handleUpdateProfile}
            role="menuitem"
            disabled={!user.role}
          >
            <MenuIcon>⚙</MenuIcon>
            Update Profile
          </MenuItem>
          <MenuItem
            onClick={handleSignOut}
            role="menuitem"
          >
            <MenuIcon>↪</MenuIcon>
            Sign Out
          </MenuItem>
          {profileError && (
            <ErrorMessage>
              {profileError}
            </ErrorMessage>
          )}
        </DropdownMenu>
      )}
    </ProfileContainer>
  );
};

const UserRole = styled.span`
  font-size: 12px;
  color: #666;
  font-style: italic;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  padding: 8px 16px;
  background-color: #fff;
  border-top: 1px solid #eee;
`;

const ProfileContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileInitial = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4AB7E0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const UserInfo = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserName = styled.span`
  font-weight: 500;
  color: #333;
`;

const UserEmail = styled.span`
  font-size: 12px;
  color: #666;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 0;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  text-align: left;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MenuIcon = styled.span`
  font-size: 18px;
`;

export default UserProfile;