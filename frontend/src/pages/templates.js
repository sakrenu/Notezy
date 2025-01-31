import React, { useState, useEffect } from 'react';
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
import './templates.css';

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
      <div className="container">
        <Navbar />
        <div className="main-content">
          <h1 className="title">Templates</h1>
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
            <div className="success-message">{successMessage}</div>
          )}
        </div>
        {selectedTemplate && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="close-button-container">
                <button className="close-button" onClick={handleCloseModal}>×</button>
              </div>
              <div className="template-image-container">
                <button className="download-button" onClick={() => handleDownloadTemplate(selectedTemplate.imageUrl)}>
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                <img className="template-image" src={selectedTemplate.imageUrl} alt={selectedTemplate.name} />
                {(selectedTemplate.isPublic || selectedTemplate.userId === user.uid) && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTemplate(selectedTemplate.id, selectedTemplate.imageUrl.split('/').pop().split('.')[0])}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
              <h3 className="template-name">{selectedTemplate.name}</h3>
              <p className="template-description">{selectedTemplate.description}</p>
              <button className="use-template-button" onClick={() => handleUseTemplate(selectedTemplate)}>
                Use Template
              </button>
            </div>
          </div>
        )}
        <AddTemplateModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onTemplateAdded={handleTemplateAdded} 
          category={categoryToAdd} 
        />
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete ${selectedTemplate ? selectedTemplate.name : ''}?`}
        />
        {isDeleting && (
          <div className="deleting-overlay">
            <div className="deleting-message">
              Deleting<span className="animated-dots"></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TemplatesPage;