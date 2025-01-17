// frontend/src/components/Sidebar.js
import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: var(--sidebar-width, 300px);
  background-color: #4AB7E0;
  padding: 20px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  height: 100vh; /* Ensure the sidebar spans the full height of the page */
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(var(--sidebar-translate, -100%));
  transition: transform 0.3s ease;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SidebarTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1rem;
  text-align: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #0D173B;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const DateDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;

const DateDropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
`;

const DateDropdownItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const NotesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const NotesTableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
`;

const NotesTableHeader = styled.th`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
`;

const DragHandle = styled.div`
  width: 10px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  cursor: ew-resize;
  z-index: 10;
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
      <SidebarHeader>
        <SidebarTitle>Saved Notes</SidebarTitle>
        <CloseButton onClick={toggleSidebar}>×</CloseButton>
      </SidebarHeader>
      <SearchInput
        type="text"
        placeholder="Search by date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <DateDropdown>
        <DateDropdownButton onClick={() => setSelectedDate(null)}>
          All Dates
        </DateDropdownButton>
        {dateOptions.map(date => (
          <DateDropdownItem key={date} onClick={() => setSelectedDate(date)}>
            {date}
          </DateDropdownItem>
        ))}
      </DateDropdown>
      <NotesTable>
        <thead>
          <tr>
            <NotesTableHeader>Notes</NotesTableHeader>
            <NotesTableHeader>Image</NotesTableHeader>
            <NotesTableHeader>Actions</NotesTableHeader>
          </tr>
        </thead>
        <tbody>
          {savedNotes
            .filter(note => !selectedDate || note.id === selectedDate)
            .map(note => (
              note.notes.map((item, index) => (
                <tr key={index}>
                  <NotesTableCell>{item.notes}</NotesTableCell>
                  <NotesTableCell><img src={item.image} alt="Saved" style={{ maxWidth: '50px' }} /></NotesTableCell>
                  <NotesTableCell>
                    <button className="action-button" onClick={() => handleViewNote(note.id, index)}>View</button>
                    <button className="action-button" onClick={() => handleDeleteNote(note.id, index)}>Delete</button>
                  </NotesTableCell>
                </tr>
              ))
            ))}
        </tbody>
      </NotesTable>
      <DragHandle />
    </SidebarContainer>
  );
};

export default Sidebar;