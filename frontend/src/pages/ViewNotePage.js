import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuthContext } from '../hooks/AuthProvider';
import ReactMarkdown from 'react-markdown';

const ViewNotePage = () => {
  const location = useLocation();
  const { date, noteIndex } = location.state;
  const { user } = useAuthContext();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const userId = user.uid;
      const notesRef = doc(db, 'notes_store', userId, 'notes', date);

      try {
        const notesDoc = await getDoc(notesRef);
        if (notesDoc.exists()) {
          const notesData = notesDoc.data().notes;
          setNote(notesData[noteIndex]);
        } else {
          setError('Note not found.');
        }
      } catch (error) {
        console.error('Error fetching note:', error);
        setError('Error fetching note. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [date, noteIndex, user.uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Content>
          <Title>Note Details</Title>
          <Date>{date}</Date>
          {note && (
            <NoteContainer>
              <ImagePreview src={note.imageUrl} alt="Uploaded Image Preview" />
              <NotesContent>
                <ReactMarkdown>{note.content}</ReactMarkdown>
              </NotesContent>
            </NoteContainer>
          )}
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