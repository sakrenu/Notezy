import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { useAuthContext } from '../hooks/AuthProvider';
import ReactMarkdown from 'react-markdown';
import { X, Download, Share2, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';

const ViewNotePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note, date } = location.state;
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (note) {
      setLoading(false);
    }
  }, [note]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleDownload = () => {
    console.log('Download functionality to be implemented');
  };

  const handleShare = () => {
    console.log('Share functionality to be implemented');
  };

  const handleDelete = () => {
    console.log('Delete functionality to be implemented');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingContainer>Loading...</LoadingContainer>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <ErrorContainer>{error}</ErrorContainer>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <Navbar />
        <Container>
          <Header>
            <CloseButton onClick={handleClose}>
              <X size={24} />
            </CloseButton>
            <ActionButtons>
              <ActionButton onClick={handleDownload} title="Download">
                <Download size={20} />
                Download
              </ActionButton>
              <ActionButton onClick={handleShare} title="Share">
                <Share2 size={20} />
                Share
              </ActionButton>
              <DeleteButton onClick={handleDelete} title="Delete">
                <Trash2 size={20} />
                Delete
              </DeleteButton>
            </ActionButtons>
          </Header>
          <MainContent>
            <NotesSection>
              <TitleSection>
                <Title>{note.title}</Title>
                <Date>{date}</Date>
              </TitleSection>
              <NotesContent>
                <ReactMarkdown>{note.content}</ReactMarkdown>
              </NotesContent>
            </NotesSection>
            <ImageSection>
              {note.imageUrl && (
                <ImagePreview src={note.imageUrl} alt="Uploaded Image" />
              )}
            </ImageSection>
          </MainContent>
        </Container>
      </PageContainer>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #f5f7fb;
    font-family: 'Inter', sans-serif;
    color: #1a1a1a;
    overflow: hidden;
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fb 0%, #eef1f5 100%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - 140px); // Adjusted to account for navbar
  overflow: hidden;
`;

const NotesSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  max-width: 60%;
`;

const TitleSection = styled.div`
  margin-bottom: 2rem;
`;

const ImageSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  position: sticky;
  top: 0;
`;

const NotesContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #666;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #1a1a1a;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }

  p {
    margin-bottom: 1em;
  }

  ul, ol {
    margin-bottom: 1em;
    padding-left: 1.5em;
  }

  blockquote {
    border-left: 4px solid #e2e8f0;
    padding-left: 1em;
    margin: 1em 0;
    color: #4a5568;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #f0f2f5;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #fee2e2;
  color: #ef4444;

  &:hover {
    background-color: #fecaca;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f2f5;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
`;

const Date = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); // Adjusted for navbar
  font-size: 1.2rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); // Adjusted for navbar
  font-size: 1.2rem;
  color: #ef4444;
`;

export default ViewNotePage;