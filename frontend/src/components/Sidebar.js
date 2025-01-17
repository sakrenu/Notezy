// frontend/src/components/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload, faShare } from '@fortawesome/free-solid-svg-icons';

const SidebarContainer = styled.div`
  width: var(--sidebar-width, 280px);
  background: linear-gradient(90deg,rgba(242, 210, 245, 0.7) 0%,rgba(109, 182, 213, 0.42) 100%);
  padding: 15px;
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
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NoteContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const NoteTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #0D173B;
`;

const NoteDate = styled.div`
  font-size: 0.9rem;
  color: #5569af;
`;

const NoteImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
`;

const NoteActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #0D173B;
  transition: color 0.3s ease;

  &:hover {
    color: #4AB7E0;
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
              <NoteTile key={index} onClick={() => handleViewNote(note.id, index)}>
                <NoteContent>
                  <NoteTitle>{item.title}</NoteTitle>
                  <NoteDate>{note.id}</NoteDate> {/* Display the date of creation */}
                  <NoteActions>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent tile click event
                        handleDeleteNote(note.id, index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} /> {/* Delete icon */}
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent tile click event
                        alert('Share functionality to be implemented');
                      }}
                    >
                      <FontAwesomeIcon icon={faShare} /> {/* Share icon */}
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent tile click event
                        alert('Download functionality to be implemented');
                      }}
                    >
                      <FontAwesomeIcon icon={faDownload} /> {/* Download icon */}
                    </IconButton>
                  </NoteActions>
                </NoteContent>
                <NoteImage src={item.imageUrl} alt="Saved Note" />
              </NoteTile>
            ))
          ))}
      </NotesTileContainer>
    </SidebarContainer>
  );
};

export default Sidebar;