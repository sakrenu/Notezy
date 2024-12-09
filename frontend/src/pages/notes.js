import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NotesPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Log the file details
    console.log('Uploaded file:', file);

    // Set image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateNotes = async () => {
    if (!image) {
      alert('Please upload an image first.');
      return;
    }

    setLoading(true);
    setError(null);
    setExtractedText('');
    setKeywords([]);
    setNotes('');

    const formData = new FormData();
    formData.append('file', image);

    try {
      // Extract text
      const textResponse = await axios.post('http://localhost:5000/extract-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(textResponse.data.text);

      // Extract keywords
      const keywordsResponse = await axios.post('http://localhost:5000/extract-keywords', {
        text: textResponse.data.text,
      });
      setKeywords(keywordsResponse.data.keywords);

      // Generate notes
      const notesResponse = await axios.post('http://localhost:5000/generate-notes', {
        keywords: keywordsResponse.data.keywords,
      });
      setNotes(notesResponse.data.notes);
    } catch (error) {
      console.error('Error generating notes:', error.response ? error.response.data : error.message);
      setError('Error generating notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar /> {/* Use the Navbar component */}
        <MainContent>
          <Content>
            <Title>Notes Generation Page</Title>
            <Subtitle>Upload an image to generate notes.</Subtitle>
            <UploadSection>
              <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
              {image && <FileName>{image.name}</FileName>}
            </UploadSection>
            {image && (
              <ActionButton onClick={handleGenerateNotes}>Generate Notes</ActionButton>
            )}
            {loading && <LoadingMessage>Your notes are on the way...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {extractedText && (
              <>
                <SectionTitle>Extracted Text</SectionTitle>
                <TextArea value={extractedText} readOnly />
              </>
            )}
            {keywords.length > 0 && (
              <>
                <SectionTitle>Key Points</SectionTitle>
                <ul>
                  {keywords.map((keyword, index) => (
                    <li key={index}>{keyword}</li>
                  ))}
                </ul>
              </>
            )}
            {notes && (
              <>
                <SectionTitle>Final Notes</SectionTitle>
                <div dangerouslySetInnerHTML={{ __html: notes }} />
              </>
            )}
          </Content>
          {imagePreview && (
            <ImagePreviewContainer>
              <PreviewTitle>Uploaded Image Preview</PreviewTitle>
              <ImagePreview src={imagePreview} alt="Uploaded Image Preview" />
            </ImagePreviewContainer>
          )}
        </MainContent>
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
    background-color: #FFFFFF;
     color: #0D173B;
     font-family: 'Arial', sans-serif;
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

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-grow: 1;
  padding-top: 80px; /* Adjust padding to account for the fixed navbar */
  overflow-y: auto; /* Make the content scrollable */
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

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #5569af;
  margin-bottom: 2rem;
  text-align: center;
`;

const UploadSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }
`;

const FileName = styled.span`
  margin-top: 10px;
  font-size: 1rem;
  color: #0D173B;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1rem;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const PreviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1rem;
  text-align: center;
`;

const ImagePreview = styled.img`
  max-width: 550px;
  max-height: 550px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
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
  margin-bottom: 2rem;

  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #5569af;
  margin-bottom: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
  margin-bottom: 2rem;
  text-align: center;
`;

export default NotesPage;
