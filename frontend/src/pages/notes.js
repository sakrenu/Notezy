<<<<<<< HEAD
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
=======
// notes.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
>>>>>>> e6dfd5c8120357599d9802cbe570e7280710e782

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const NotesPage = () => {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [notes, setNotes] = useState('');
  const [template, setTemplate] = useState('default');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);

    // Set image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleExtractText = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/api/extract-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data.text);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };

  const handleExtractKeywords = async () => {
    try {
      const response = await axios.post('/api/extract-keywords', {
        text: extractedText,
      });
      setKeywords(response.data.keywords);
    } catch (error) {
      console.error('Error extracting keywords:', error);
    }
  };

  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
  };

  const generateNotes = async () => {
    try {
      const response = await axios.post('/api/generate-notes', {
        text: extractedText,
        keywords: keywords,
        template: template,
      });
      setNotes(response.data.notes);
    } catch (error) {
      console.error('Error generating notes:', error);
    }
  };

  const downloadNotes = () => {
    const element = document.createElement('a');
    const file = new Blob([notes], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'notes.txt';
    document.body.appendChild(element);
    element.click();
  };

>>>>>>> e6dfd5c8120357599d9802cbe570e7280710e782
  return (
    <>
      <GlobalStyle />
      <Container>
<<<<<<< HEAD
        <Navbar>
          <Logo>
            <LogoImage src="/logo.jpg" alt="Notezy Logo" />
            <LogoText>Notezy</LogoText>
          </Logo>
          <NavLinks>
            <StyledNavLink to="/home">Home</StyledNavLink>
            <StyledNavLink to="/notes">Notes</StyledNavLink>
          </NavLinks>
        </Navbar>
        <Content>
          <Title>Notes Generation Page</Title>
          <Subtitle>This is where you will generate your notes.</Subtitle>
        </Content>
=======
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
              <ActionButton onClick={handleExtractText}>Extract Text</ActionButton>
            )}
            {extractedText && (
              <>
                <SectionTitle>Extracted Text</SectionTitle>
                <TextArea value={extractedText} readOnly />
                <ActionButton onClick={handleExtractKeywords}>Extract Keywords</ActionButton>
              </>
            )}
            {keywords.length > 0 && (
              <>
                <SectionTitle>Keywords</SectionTitle>
                <KeywordsList>
                  {keywords.map((keyword, index) => (
                    <Keyword key={index}>{keyword}</Keyword>
                  ))}
                </KeywordsList>
                <SectionTitle>Choose a Template</SectionTitle>
                <TemplateSelect value={template} onChange={handleTemplateChange}>
                  <option value="default">Default</option>
                  <option value="template1">Template 1</option>
                  <option value="template2">Template 2</option>
                </TemplateSelect>
                <GenerateButton onClick={generateNotes}>Generate Notes</GenerateButton>
                {notes && (
                  <>
                    <SectionTitle>Generated Notes</SectionTitle>
                    <TextArea value={notes} readOnly />
                    <DownloadButton onClick={downloadNotes}>Download Notes</DownloadButton>
                  </>
                )}
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
>>>>>>> e6dfd5c8120357599d9802cbe570e7280710e782
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
<<<<<<< HEAD
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
  font-family: 'Arial', sans-serif;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  color: #4AB7E0;
  font-weight: bold;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease-in-out;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const LogoText = styled.span`
  font-size: 2rem;
  color: #4AB7E0;
  font-weight: bold;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-grow: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledNavLink = styled(NavLink)`
  color: #4AB7E0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, color 0.3s ease;

  &.active {
    background-color: #E2D64B;
    color: #0D173B;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    color: #0D173B;
  }
=======
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
>>>>>>> e6dfd5c8120357599d9802cbe570e7280710e782
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
<<<<<<< HEAD
  padding-top: 80px; /* Adjust padding to account for the fixed navbar */
=======
  padding: 20px;
>>>>>>> e6dfd5c8120357599d9802cbe570e7280710e782
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

<<<<<<< HEAD
=======
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

const KeywordsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const Keyword = styled.li`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  display: inline-block;
`;

const TemplateSelect = styled.select`
  padding: 10px;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const GenerateButton = styled.button`
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

const DownloadButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 15px;
  background: linear-gradient(90deg, #E2D64B, #FFD700);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #FFD700, #E2D64B);
  }
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

>>>>>>> e6dfd5c8120357599d9802cbe570e7280710e782
export default NotesPage;