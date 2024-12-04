import React from 'react';
import styled from 'styled-components';

const NotesPage = () => {
  return (
    <Container>
      <Title>Notes Generation Page</Title>
      <Subtitle>This is where you will generate your notes.</Subtitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #3a4d99;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #5569af;
`;

export default NotesPage;