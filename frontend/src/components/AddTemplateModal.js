// frontend/src/components/AddTemplateModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../config/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import axios from 'axios';
import { getAuth } from "firebase/auth";

const AddTemplateModal = ({ isOpen, onClose, onTemplateAdded, category }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // Store the image URL
  const auth = getAuth();
  const user = auth.currentUser;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'notezy-preset');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dg8zy7lct/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;
      console.log('Image uploaded to Cloudinary:', imageUrl);

      // Store the URL for later use
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleAddTemplate = async () => {
    if (!imageUrl || !name) {
      alert('Please upload an image and provide a name.');
      return;
    }

    setLoading(true);

    const templateData = {
      name,
      imageUrl,
      createdAt: new Date(),
      userId: category === 'private' ? user.uid : null
    };

    try {
      const collectionName = category === 'public' ? 'public_templates' : 'private_templates';
      await addDoc(collection(db, collectionName), templateData);
      setLoading(false);
      onTemplateAdded();
      onClose();
    } catch (error) {
      console.error('Error adding template:', error);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Add Template</ModalTitle>
        <InputFile type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && (
          <ImagePreviewContainer>
            <ImagePreview src={imagePreview} alt="Template Preview" />
          </ImagePreviewContainer>
        )}
        <InputName
          type="text"
          placeholder="Template Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AddButton onClick={handleAddTemplate} disabled={loading}>
          {loading ? 'Adding...' : 'Add Template'}
        </AddButton>
      </ModalContent>
    </ModalOverlay>
  );
};

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
  max-width: 500px;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #0D173B;
  margin-bottom: 1rem;
  text-align: center;
`;

const InputFile = styled.input`
  margin-bottom: 1rem;
`;

const ImagePreviewContainer = styled.div`
  max-width: 100%;
  max-height: 300px; /* Set a maximum height for the preview */
  overflow: auto; /* Make it scrollable */
  margin-bottom: 1rem;
  border-radius: 5px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const InputName = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 15px;
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;

  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default AddTemplateModal;
