// frontend/src/components/SaveNotesModal.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1rem;
  text-align: center;
`;

const InputField = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const SaveNotesModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for the notes.');
      return;
    }
    onSave(title);
    setTitle('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Save Notes</ModalTitle>
        <InputField
          type="text"
          placeholder="Enter a title for your notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ButtonContainer>
          <ActionButton onClick={handleSave}>Save</ActionButton>
          <ActionButton onClick={onClose}>Cancel</ActionButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SaveNotesModal;