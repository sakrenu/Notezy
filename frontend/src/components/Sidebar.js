// frontend/src/components/Sidebar.js
import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: var(--sidebar-width, 300px);
  background-color: #4AB7E0;
  padding: 20px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(var(--sidebar-translate, -100%));
  transition: transform 0.3s ease;
  z-index: 1000;
`;

const SidebarTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1rem;
  text-align: center;
`;

const NotesTileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoteTile = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NoteImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
`;

const NoteContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NoteTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #0D173B;
`;

const NoteActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }
`;

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  selectedDate,
  setSelectedDate,
  dateOptions,
  savedNotes,
  handleViewNote,
  handleDeleteNote
}) => {
  return (
    <SidebarContainer>
      <SidebarTitle>Saved Notes</SidebarTitle>
      <NotesTileContainer>
        {savedNotes
          .filter(note => !selectedDate || note.id === selectedDate)
          .map(note => (
            note.notes.map((item, index) => (
              <NoteTile key={index}>
                <NoteImage src={item.imageUrl} alt="Saved Note" />
                <NoteContent>
                  <NoteTitle>{item.title}</NoteTitle>
                  <NoteActions>
                    <ActionButton onClick={() => handleViewNote(note.id, index)}>View</ActionButton>
                    <ActionButton onClick={() => handleDeleteNote(note.id, index)}>Delete</ActionButton>
                    <ActionButton onClick={() => alert('Share functionality to be implemented')}>Share</ActionButton>
                  </NoteActions>
                </NoteContent>
              </NoteTile>
            ))
          ))}
      </NotesTileContainer>
    </SidebarContainer>
  );
};

export default Sidebar;