import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { db } from '../config/firebaseConfig';
import { useAuthContext } from '../hooks/AuthProvider';
import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const dotAnimation = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const NotesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext(); // Get the authenticated user
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // New state for saving status
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const fetchDefaultTemplate = async () => {
      const defaultTemplatesCollection = collection(db, 'default_templates');
      const defaultTemplatesSnapshot = await getDocs(defaultTemplatesCollection);
      const defaultTemplatesData = defaultTemplatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSelectedTemplate(defaultTemplatesData[0]); // Set the default template
    };

    if (location.state && location.state.selectedTemplate) {
      setSelectedTemplate(location.state.selectedTemplate);
    } else {
      fetchDefaultTemplate();
    }

    // Restore state from local storage
    const storedImage = localStorage.getItem('image');
    const storedImagePreview = localStorage.getItem('imagePreview');
    const storedExtractedText = localStorage.getItem('extractedText');
    const storedKeywords = localStorage.getItem('keywords');
    const storedNotes = localStorage.getItem('notes');

    if (storedImage) setImage(storedImage);
    if (storedImagePreview) setImagePreview(storedImagePreview);
    if (storedExtractedText) setExtractedText(storedExtractedText);
    if (storedKeywords) setKeywords(JSON.parse(storedKeywords));
    if (storedNotes) setNotes(storedNotes);
  }, [location.state]);

  useEffect(() => {
    // Save state to local storage
    if (image) localStorage.setItem('image', image);
    if (imagePreview) localStorage.setItem('imagePreview', imagePreview);
    if (extractedText) localStorage.setItem('extractedText', extractedText);
    if (keywords) localStorage.setItem('keywords', JSON.stringify(keywords));
    if (notes) localStorage.setItem('notes', notes);
  }, [image, imagePreview, extractedText, keywords, notes]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setSaveMessage(null); // Reset save message when a new file is uploaded

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

      // Generate notes using the selected template
      const notesResponse = await axios.post('http://localhost:5000/generate-notes', {
        keywords: keywordsResponse.data.keywords,
        template: selectedTemplate.name // Use the selected template
      });
      setNotes(notesResponse.data.notes);
    } catch (error) {
      console.error('Error generating notes:', error.response ? error.response.data : error.message);
      setError('Error generating notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!notes) {
      alert('No notes to save.');
      return;
    }

    const userId = user.uid; // Get the user ID from the authenticated user
    const userEmail = user.email; // Get the user email from the authenticated user
    const today = new Date().toDateString();

    setIsSaving(true); // Start saving

    try {
      const userRef = doc(db, 'notes_store', userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          userId,
          userEmail,
          notes: {}
        });
      }

      const notesRef = doc(collection(db, 'notes_store', userId, 'notes'), today);
      const notesDoc = await getDoc(notesRef);

      if (!notesDoc.exists()) {
        await setDoc(notesRef, {
          notes: []
        });
      }

      await updateDoc(notesRef, {
        notes: arrayUnion(notes)
      });

      setSaveMessage('Notes successfully saved.');
    } catch (error) {
      console.error('Error saving notes:', error);
      setSaveMessage('Error saving notes. Please try again.');
    } finally {
      setIsSaving(false); // Finish saving
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
            {loading && <LoadingMessage>Your notes are on the way<AnimatedDots>...</AnimatedDots></LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {extractedText && (
              <Section>
                <SectionTitle>Extracted Text</SectionTitle>
                <TextArea value={extractedText} readOnly />
              </Section>
            )}
            {keywords.length > 0 && (
              <Section>
                <SectionTitle>Key Points</SectionTitle>
                <ul>
                  {keywords.map((keyword, index) => (
                    <li key={index}>{keyword}</li>
                  ))}
                </ul>
              </Section>
            )}
            {notes && (
              <Section>
                <SectionTitle>Final Notes</SectionTitle>
                <NotesContainer>
                  <ReactMarkdown>{notes}</ReactMarkdown>
                </NotesContainer>
                {!isSaving && !saveMessage && (
                  <ActionButton onClick={handleSaveNotes}>Save Notes</ActionButton>
                )}
                {isSaving && <SavingMessage>Saving<AnimatedDots>...</AnimatedDots></SavingMessage>}
                {saveMessage && <SaveMessage>{saveMessage}</SaveMessage>}
              </Section>
            )}
          </Content>
          {imagePreview && (
            <ImagePreviewContainer>
              <PreviewTitle>Uploaded Image Preview</PreviewTitle>
              <ImagePreview src={imagePreview} alt="Uploaded Image Preview" />
              {selectedTemplate && (
                <TemplateSelectedContainer>
                  <TemplateSelectedTitle>Template Selected</TemplateSelectedTitle>
                  <TemplateImageContainer>
                    <TemplateImage src={selectedTemplate.imageUrl} alt={selectedTemplate.name} />
                  </TemplateImageContainer>
                  <ChooseTemplateButton onClick={() => navigate('/templates')}>Choose Template</ChooseTemplateButton>
                </TemplateSelectedContainer>
              )}
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
  background: url('https://www.transparenttextures.com/patterns/notebook-paper.png') repeat;
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

const Section = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
  background-color: rgba(255, 255, 255, 0.8);
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

const NotesContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SaveMessage = styled.p`
  font-size: 1.2rem;
  color: green;
  margin-bottom: 1rem;
  text-align: center;
`;

const SavingMessage = styled.p`
  font-size: 1.2rem;
  color: #5569af;
  margin-bottom: 1rem;
  text-align: center;
`;

const AnimatedDots = styled.span`
  &::after {
    content: '...';
    animation: ${dotAnimation} 1.5s steps(5, end) infinite;
  }
`;

const TemplateSelectedContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const TemplateSelectedTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 1rem;
  text-align: center;
`;

const TemplateImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TemplateImage = styled.img`
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChooseTemplateButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 15px;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }
`;

export default NotesPage;