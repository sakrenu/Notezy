import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Navbar from '../components/Navbar';
import TemplateCategory from '../components/TemplateCategory';
import AddTemplateModal from '../components/AddTemplateModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const TemplatesPage = () => {
  const [templates, setTemplates] = useState({ default: [], public: [], private: [] });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);
  const [categoryToAdd, setCategoryToAdd] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      const defaultTemplatesCollection = collection(db, 'default_templates');
      const publicTemplatesCollection = collection(db, 'public_templates');
      const privateTemplatesCollection = collection(db, 'private_templates');

      const defaultTemplatesSnapshot = await getDocs(defaultTemplatesCollection);
      const publicTemplatesSnapshot = await getDocs(publicTemplatesCollection);
      const privateTemplatesQuery = query(privateTemplatesCollection, where("userId", "==", user.uid));
      const privateTemplatesSnapshot = await getDocs(privateTemplatesQuery);

      const defaultTemplatesData = defaultTemplatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const publicTemplatesData = publicTemplatesSnapshot.docs.map(doc => ({
        id: doc.id,
        isPublic: true,
        ...doc.data()
      }));
      const privateTemplatesData = privateTemplatesSnapshot.docs.map(doc => ({
        id: doc.id,
        isPublic: false,
        ...doc.data()
      }));

      setTemplates({
        default: defaultTemplatesData,
        public: publicTemplatesData,
        private: privateTemplatesData
      });
    };

    fetchTemplates();

    // Check for success message in localStorage
    const storedMessage = localStorage.getItem('successMessage');
    if (storedMessage) {
      setSuccessMessage(storedMessage);
      localStorage.removeItem('successMessage');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000); // Fade out after 2 seconds
    }
  }, [user.uid]);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  const handleAddTemplate = (category) => {
    setCategoryToAdd(category);
    setIsModalOpen(true);
  };

  const handleTemplateAdded = () => {
    setIsModalOpen(false);
    setCategoryToAdd(null);
    // Refetch templates after adding a new one
    const fetchTemplates = async () => {
      const defaultTemplatesCollection = collection(db, 'default_templates');
      const publicTemplatesCollection = collection(db, 'public_templates');
      const privateTemplatesCollection = collection(db, 'private_templates');

      const defaultTemplatesSnapshot = await getDocs(defaultTemplatesCollection);
      const publicTemplatesSnapshot = await getDocs(publicTemplatesCollection);
      const privateTemplatesQuery = query(privateTemplatesCollection, where("userId", "==", user.uid));
      const privateTemplatesSnapshot = await getDocs(privateTemplatesQuery);

      const defaultTemplatesData = defaultTemplatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      const publicTemplatesData = publicTemplatesSnapshot.docs.map(doc => ({
        id: doc.id,
        isPublic: true,
        ...doc.data()
      }));
      const privateTemplatesData = privateTemplatesSnapshot.docs.map(doc => ({
        id: doc.id,
        isPublic: false,
        ...doc.data()
      }));

      setTemplates({
        default: defaultTemplatesData,
        public: publicTemplatesData,
        private: privateTemplatesData
      });
    };

    fetchTemplates();
  };

  const handleDeleteTemplate = async (templateId, imagePublicId) => {
    setTemplateToDelete({ id: templateId, imagePublicId });
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    const { id, imagePublicId } = templateToDelete;
    setIsDeleting(true);
    try {
      // Delete from correct collection based on template type
      const collectionName = selectedTemplate.isPublic ? 'public_templates' : 'private_templates';
      await deleteDoc(doc(db, collectionName, id));

      // Delete from Cloudinary via server-side function
      await axios.post('http://localhost:5000/delete-image', { publicId: imagePublicId });

      // Store success message in localStorage
      localStorage.setItem('successMessage', `Template "${selectedTemplate.name}" successfully deleted.`);

      // Reload the page to update the UI
      window.location.reload();
    } catch (error) {
      console.error('Error deleting template:', error);
      setIsDeleting(false);
    }
  };

  const handleDownloadTemplate = async (imageUrl) => {
    try {
      // Fetch the file as a blob
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to download the file');
      }
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);

      // Trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'template.png'; // Customize the filename if needed
      document.body.appendChild(link);
      link.click();

      // Clean up the URL object
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  const handleUseTemplate = (template) => {
    navigate('/notes', { state: { selectedTemplate: template } });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar />
        <MainContent>
          <Title>Templates</Title>
          <TemplateCategory title="Default Templates" templates={templates.default} onTemplateClick={handleTemplateClick} />
          <TemplateCategory
            title="Public Templates"
            templates={templates.public}
            onTemplateClick={handleTemplateClick}
            onAddTemplate={() => handleAddTemplate('public')}
            showAddButton={true}
          />
          <TemplateCategory
            title="Private Templates"
            templates={templates.private}
            onTemplateClick={handleTemplateClick}
            onAddTemplate={() => handleAddTemplate('private')}
            showAddButton={true}
          />
          {successMessage && (
            <SuccessMessage>{successMessage}</SuccessMessage>
          )}
        </MainContent>
        {selectedTemplate && (
          <ModalOverlay>
            <ModalContent>
              <CloseButtonContainer>
                <CloseButton onClick={handleCloseModal}>×</CloseButton>
              </CloseButtonContainer>
              <TemplateImageContainer>
                <DownloadButton onClick={() => handleDownloadTemplate(selectedTemplate.imageUrl)}>
                  <FontAwesomeIcon icon={faDownload} />
                </DownloadButton>
                <TemplateImage src={selectedTemplate.imageUrl} alt={selectedTemplate.name} />
                {(selectedTemplate.isPublic || selectedTemplate.userId === user.uid) && (
                  <DeleteButton
                    onClick={() => handleDeleteTemplate(selectedTemplate.id, selectedTemplate.imageUrl.split('/').pop().split('.')[0])}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteButton>
                )}
              </TemplateImageContainer>
              <TemplateName>{selectedTemplate.name}</TemplateName>
              <TemplateDescription>{selectedTemplate.description}</TemplateDescription>
              <UseTemplateButton onClick={() => handleUseTemplate(selectedTemplate)}>Use Template</UseTemplateButton>
            </ModalContent>
          </ModalOverlay>
        )}
        <AddTemplateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTemplateAdded={handleTemplateAdded} category={categoryToAdd} />
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete ${selectedTemplate ? selectedTemplate.name : ''}?`}
        />
        {isDeleting && (
          <DeletingOverlay>
            <DeletingMessage>Deleting<AnimatedDots></AnimatedDots></DeletingMessage>
          </DeletingOverlay>
        )}
      </Container>
    </>
  );
};

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

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
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the left */
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add box-shadow for better visual separation */
  width: 100%; /* Ensure the content takes the full width */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #0D173B;
  margin-bottom: 2rem;
  text-align: center;
  width: 100%; /* Ensure the title takes the full width */
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: -1px; /* Move the close button outside the modal content */
  right: 1px;
  background: #fff;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const TemplateImageContainer = styled.div`
  position: relative;
  margin-top: 20px; /* Add margin to separate the image from the close button */
`;

const TemplateImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const DownloadButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #0D173B;

  &:hover {
    color: #4AB7E0;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: red;
    color: white;
  }
`;

const TemplateName = styled.h3`
  font-size: 1.5rem;
  color: #0D173B;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  font-size: 1rem;
  color: #5569af;
`;

const UseTemplateButton = styled.button`
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

const SuccessMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 15px;
  border-radius: 5px;
  z-index: 1001;
  animation: ${fadeOut} 3s forwards;
`;

const DeletingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DeletingMessage = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
`;

const AnimatedDots = styled.span`
  &::after {
    display: inline-block;
    animation: dotAnimation 1s steps(5, end) infinite;
    content: '.....';
    font-size: 2rem;
  }

  @keyframes dotAnimation {
    0% { content: '.....'; }
    20% { content: '.'; }
    40% { content: '..'; }
    60% { content: '...'; }
    80% { content: '....'; }
    100% { content: '.....'; }
  }
`;

export default TemplatesPage;