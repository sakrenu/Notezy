// frontend/src/components/ConfirmationModal.js

import React from 'react';
import styled from 'styled-components';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalMessage>{message}</ModalMessage>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>Yes, I am sure</ConfirmButton>
          <CancelButton onClick={onClose}>No, not now</CancelButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

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
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
`;

const ModalMessage = styled.p`
  font-size: 1.2rem;
  color: #0D173B;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const ConfirmButton = styled.button`
  padding: 15px 40px;
  margin-left: 20px;
  font-size: 1rem;
  border-radius: 15px;
  background: #4AB7E0;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #84AC64;
  }
`;

const CancelButton = styled.button`
  padding: 15px 40px;
  margin-right: 20px;
  font-size: 1rem;
  border-radius: 15px;
  background: #FF5733;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #C70039;
  }
`;

export default ConfirmationModal;