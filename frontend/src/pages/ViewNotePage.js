import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ViewNotePage = () => {
  const location = useLocation();
  const { note, date } = location.state;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Content>
          <Title>Note Details</Title>
          <Date>{date}</Date>
          <NoteContainer>
            <ImagePreview src={note.image} alt="Uploaded Image Preview" />
            <NotesContent dangerouslySetInnerHTML={{ __html: note.notes }} />
          </NoteContainer>
        </Content>
      </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background-color: #F0F8FF;
    color: #0D173B;
    font-family: 'Arial', sans-serif;
    background-image: url('your-background-image-url.jpg'); /* Add your background image URL here */
    background-size: cover;
    background-position: center;
  }

  #root {
    height: 100%;
    overflow: hidden;
  }
`;

const Container = styled.div`
  background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Date = styled.p`
  font-size: 1.2rem;
  color: #5569af;
  margin-bottom: 2rem;
  text-align: center;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: calc(100% - 40px); /* Adjust width to fit the container */
`;

const ImagePreview = styled.img`
  max-width: 45%;
  max-height: 450px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
`;

const NotesContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export default ViewNotePage;
