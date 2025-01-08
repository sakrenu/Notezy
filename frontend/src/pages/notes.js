// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate, useLocation } from 'react-router-dom';
// // // import styled, { keyframes, createGlobalStyle } from 'styled-components';
// // // import axios from 'axios';
// // // import Navbar from '../components/Navbar';
// // // import { db } from '../config/firebaseConfig';
// // // import { useAuthContext } from '../hooks/AuthProvider';
// // // import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';

// // // const fadeIn = keyframes`
// // //   from {
// // //     opacity: 0;
// // //   }
// // //   to {
// // //     opacity: 1;
// // //   }
// // // `;

// // // const dotAnimation = keyframes`
// // //   0% { opacity: 0; }
// // //   50% { opacity: 1; }
// // //   100% { opacity: 0; }
// // // `;

// // // const NotesPage = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const { user } = useAuthContext(); // Get the authenticated user
// // //   const [image, setImage] = useState(null);
// // //   const [imagePreview, setImagePreview] = useState(null);
// // //   const [extractedText, setExtractedText] = useState('');
// // //   const [keywords, setKeywords] = useState([]);
// // //   const [notes, setNotes] = useState('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);
// // //   const [saveMessage, setSaveMessage] = useState(null);
// // //   const [isSaving, setIsSaving] = useState(false); // New state for saving status
// // //   const [selectedTemplate, setSelectedTemplate] = useState(null);

// // //   useEffect(() => {
// // //     const fetchDefaultTemplate = async () => {
// // //       const defaultTemplatesCollection = collection(db, 'default_templates');
// // //       const defaultTemplatesSnapshot = await getDocs(defaultTemplatesCollection);
// // //       const defaultTemplatesData = defaultTemplatesSnapshot.docs.map(doc => ({
// // //         id: doc.id,
// // //         ...doc.data()
// // //       }));
// // //       setSelectedTemplate(defaultTemplatesData[0]); // Set the default template
// // //     };

// // //     if (location.state && location.state.selectedTemplate) {
// // //       setSelectedTemplate(location.state.selectedTemplate);
// // //     } else {
// // //       fetchDefaultTemplate();
// // //     }

// // //     // Restore state from local storage
// // //     const storedImage = localStorage.getItem('image');
// // //     const storedImagePreview = localStorage.getItem('imagePreview');
// // //     const storedExtractedText = localStorage.getItem('extractedText');
// // //     const storedKeywords = localStorage.getItem('keywords');
// // //     const storedNotes = localStorage.getItem('notes');

// // //     if (storedImage) setImage(storedImage);
// // //     if (storedImagePreview) setImagePreview(storedImagePreview);
// // //     if (storedExtractedText) setExtractedText(storedExtractedText);
// // //     if (storedKeywords) setKeywords(JSON.parse(storedKeywords));
// // //     if (storedNotes) setNotes(storedNotes);
// // //   }, [location.state]);

// // //   useEffect(() => {
// // //     // Save state to local storage
// // //     if (image) localStorage.setItem('image', image);
// // //     if (imagePreview) localStorage.setItem('imagePreview', imagePreview);
// // //     if (extractedText) localStorage.setItem('extractedText', extractedText);
// // //     if (keywords) localStorage.setItem('keywords', JSON.stringify(keywords));
// // //     if (notes) localStorage.setItem('notes', notes);
// // //   }, [image, imagePreview, extractedText, keywords, notes]);

// // //   const handleImageUpload = (event) => {
// // //     const file = event.target.files[0];
// // //     setImage(file);
// // //     setSaveMessage(null); // Reset save message when a new file is uploaded

// // //     // Log the file details
// // //     console.log('Uploaded file:', file);

// // //     // Set image preview
// // //     const reader = new FileReader();
// // //     reader.onloadend = () => {
// // //       setImagePreview(reader.result);
// // //     };
// // //     reader.readAsDataURL(file);
// // //   };

// // //   const handleGenerateNotes = async () => {
// // //     if (!image) {
// // //       alert('Please upload an image first.');
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError(null);
// // //     setExtractedText('');
// // //     setKeywords([]);
// // //     setNotes('');

// // //     const formData = new FormData();
// // //     formData.append('file', image);

// // //     try {
// // //       // Extract text
// // //       const textResponse = await axios.post('http://localhost:5000/extract-text', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data',
// // //         },
// // //       });
// // //       setExtractedText(textResponse.data.text);

// // //       // Extract keywords
// // //       const keywordsResponse = await axios.post('http://localhost:5000/extract-keywords', {
// // //         text: textResponse.data.text,
// // //       });
// // //       setKeywords(keywordsResponse.data.keywords);

// // //       // Generate notes using the selected template
// // //       const notesResponse = await axios.post('http://localhost:5000/generate-notes', {
// // //         keywords: keywordsResponse.data.keywords,
// // //         template: selectedTemplate.name // Use the selected template
// // //       });
// // //       setNotes(notesResponse.data.notes);
// // //     } catch (error) {
// // //       console.error('Error generating notes:', error.response ? error.response.data : error.message);
// // //       setError('Error generating notes. Please try again.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSaveNotes = async () => {
// // //     if (!notes) {
// // //       alert('No notes to save.');
// // //       return;
// // //     }

// // //     const userId = user.uid; // Get the user ID from the authenticated user
// // //     const userEmail = user.email; // Get the user email from the authenticated user
// // //     const today = new Date().toDateString();

// // //     setIsSaving(true); // Start saving

// // //     try {
// // //       const userRef = doc(db, 'notes_store', userId);
// // //       const userDoc = await getDoc(userRef);

// // //       if (!userDoc.exists()) {
// // //         await setDoc(userRef, {
// // //           userId,
// // //           userEmail,
// // //           notes: {}
// // //         });
// // //       }

// // //       const notesRef = doc(collection(db, 'notes_store', userId, 'notes'), today);
// // //       const notesDoc = await getDoc(notesRef);

// // //       if (!notesDoc.exists()) {
// // //         await setDoc(notesRef, {
// // //           notes: []
// // //         });
// // //       }

// // //       await updateDoc(notesRef, {
// // //         notes: arrayUnion(notes)
// // //       });

// // //       setSaveMessage('Notes successfully saved.');
// // //     } catch (error) {
// // //       console.error('Error saving notes:', error);
// // //       setSaveMessage('Error saving notes. Please try again.');
// // //     } finally {
// // //       setIsSaving(false); // Finish saving
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <GlobalStyle />
// // //       <Container>
// // //         <Navbar /> {/* Use the Navbar component */}
// // //         <MainContent>
// // //           <Content>
// // //             <Title>Notes Generation Page</Title>
// // //             <Subtitle>Upload an image to generate notes.</Subtitle>
// // //             <UploadSection>
// // //               <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
// // //               {image && <FileName>{image.name}</FileName>}
// // //             </UploadSection>
// // //             {image && (
// // //               <ActionButton onClick={handleGenerateNotes}>Generate Notes</ActionButton>
// // //             )}
// // //             {loading && <LoadingMessage>Your notes are on the way<AnimatedDots>...</AnimatedDots></LoadingMessage>}
// // //             {error && <ErrorMessage>{error}</ErrorMessage>}
// // //             {extractedText && (
// // //               <>
// // //                 <SectionTitle>Extracted Text</SectionTitle>
// // //                 <TextArea value={extractedText} readOnly />
// // //               </>
// // //             )}
// // //             {keywords.length > 0 && (
// // //               <>
// // //                 <SectionTitle>Key Points</SectionTitle>
// // //                 <ul>
// // //                   {keywords.map((keyword, index) => (
// // //                     <li key={index}>{keyword}</li>
// // //                   ))}
// // //                 </ul>
// // //               </>
// // //             )}
// // //             {notes && (
// // //               <>
// // //                 <SectionTitle>Final Notes</SectionTitle>
// // //                 <div dangerouslySetInnerHTML={{ __html: notes }} />
// // //                 {!isSaving && !saveMessage && (
// // //                   <ActionButton onClick={handleSaveNotes}>Save Notes</ActionButton>
// // //                 )}
// // //                 {isSaving && <SavingMessage>Saving<AnimatedDots>...</AnimatedDots></SavingMessage>}
// // //                 {saveMessage && <SaveMessage>{saveMessage}</SaveMessage>}
// // //               </>
// // //             )}
// // //           </Content>
// // //           {imagePreview && (
// // //             <ImagePreviewContainer>
// // //               <PreviewTitle>Uploaded Image Preview</PreviewTitle>
// // //               <ImagePreview src={imagePreview} alt="Uploaded Image Preview" />
// // //               {selectedTemplate && (
// // //                 <TemplateSelectedContainer>
// // //                   <TemplateSelectedTitle>Template Selected</TemplateSelectedTitle>
// // //                   <TemplateImageContainer>
// // //                     <TemplateImage src={selectedTemplate.imageUrl} alt={selectedTemplate.name} />
// // //                   </TemplateImageContainer>
// // //                   <ChooseTemplateButton onClick={() => navigate('/templates')}>Choose Template</ChooseTemplateButton>
// // //                 </TemplateSelectedContainer>
// // //               )}
// // //             </ImagePreviewContainer>
// // //           )}
// // //         </MainContent>
// // //       </Container>
// // //     </>
// // //   );
// // // };

// // // const GlobalStyle = createGlobalStyle`
// // //   html, body {
// // //     margin: 0;
// // //     padding: 0;
// // //     height: 100%;
// // //     overflow: hidden;
// // //     background-color: #FFFFFF;
// // //     color: #0D173B;
// // //     font-family: 'Arial', sans-serif;
// // //   }

// // //   #root {
// // //     height: 100%;
// // //     overflow: hidden;
// // //   }
// // // `;

// // // const Container = styled.div`
// // //   background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
// // //   height: 100vh;
// // //   width: 100vw;
// // //   display: flex;
// // //   flex-direction: column;
// // //   margin: 0;
// // //   padding: 0;
// // //   overflow: hidden;
// // //   position: fixed;
// // //   top: 0;
// // //   left: 0;
// // //   right: 0;
// // //   bottom: 0;
// // // `;

// // // const MainContent = styled.div`
// // //   display: flex;
// // //   flex-direction: row;
// // //   align-items: flex-start;
// // //   justify-content: space-between;
// // //   flex-grow: 1;
// // //   padding-top: 80px; /* Adjust padding to account for the fixed navbar */
// // //   overflow-y: auto; /* Make the content scrollable */
// // // `;

// // // const Content = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   justify-content: center;
// // //   flex-grow: 1;
// // //   padding: 20px;
// // // `;

// // // const Title = styled.h1`
// // //   font-size: 2.5rem;
// // //   font-weight: bold;
// // //   color: #0D173B;
// // //   margin-bottom: 1.5rem;
// // //   text-align: center;
// // // `;

// // // const Subtitle = styled.p`
// // //   font-size: 1.2rem;
// // //   color: #5569af;
// // //   margin-bottom: 2rem;
// // //   text-align: center;
// // // `;

// // // const UploadSection = styled.div`
// // //   margin-bottom: 2rem;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // // `;

// // // const FileInput = styled.input`
// // //   padding: 10px;
// // //   border: 1px solid #ccc;
// // //   border-radius: 5px;
// // //   background: linear-gradient(90deg, #4AB7E0, #84AC64);
// // //   color: white;
// // //   cursor: pointer;
// // //   transition: background 0.3s ease;

// // //   &:hover {
// // //     background: linear-gradient(90deg, #84AC64, #4AB7E0);
// // //   }
// // // `;

// // // const FileName = styled.span`
// // //   margin-top: 10px;
// // //   font-size: 1rem;
// // //   color: #0D173B;
// // // `;

// // // const SectionTitle = styled.h2`
// // //   font-size: 1.5rem;
// // //   font-weight: bold;
// // //   color: #0D173B;
// // //   margin-bottom: 1rem;
// // //   text-align: center;
// // // `;

// // // const TextArea = styled.textarea`
// // //   width: 100%;
// // //   height: 150px;
// // //   padding: 10px;
// // //   margin-bottom: 2rem;
// // //   border: 1px solid #ccc;
// // //   border-radius: 5px;
// // //   font-size: 1rem;
// // // `;

// // // const ImagePreviewContainer = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   margin-left: 20px;
// // //   margin-right: 50px;
// // //   padding: 20px;
// // //   background-color: #fff;
// // //   border-radius: 5px;
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// // // `;

// // // const PreviewTitle = styled.h2`
// // //   font-size: 1.5rem;
// // //   font-weight: bold;
// // //   color: #0D173B;
// // //   margin-bottom: 1rem;
// // //   text-align: center;
// // // `;

// // // const ImagePreview = styled.img`
// // //   max-width: 550px;
// // //   max-height: 550px;
// // //   width: auto;
// // //   height: auto;
// // //   object-fit: contain;
// // //   border-radius: 5px;
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// // //   padding: 20px;
// // //   background-color: #fff;
// // // `;

// // // const ActionButton = styled.button`
// // //   padding: 10px 20px;
// // //   font-size: 1rem;
// // //   border-radius: 15px;
// // //   background: linear-gradient(90deg, #4AB7E0, #84AC64);
// // //   color: white;
// // //   border: none;
// // //   cursor: pointer;
// // //   transition: background 0.3s ease;
// // //   margin-bottom: 2rem;

// // //   &:hover {
// // //     background: linear-gradient(90deg, #84AC64, #4AB7E0);
// // //   }
// // // `;

// // // const LoadingMessage = styled.p`
// // //   font-size: 1.2rem;
// // //   color: #5569af;
// // //   margin-bottom: 2rem;
// // //   text-align: center;
// // // `;

// // // const ErrorMessage = styled.p`
// // //   font-size: 1.2rem;
// // //   color: red;
// // //   margin-bottom: 2rem;
// // //   text-align: center;
// // // `;

// // // const SaveMessage = styled.p`
// // //   font-size: 1.2rem;
// // //   color: green;
// // //   margin-bottom: 1rem;
// // //   text-align: center;
// // // `;

// // // const SavingMessage = styled.p`
// // //   font-size: 1.2rem;
// // //   color: #5569af;
// // //   margin-bottom: 1rem;
// // //   text-align: center;
// // // `;

// // // const AnimatedDots = styled.span`
// // //   &::after {
// // //     content: '...';
// // //     animation: ${dotAnimation} 1.5s steps(5, end) infinite;
// // //   }
// // // `;

// // // const TemplateSelectedContainer = styled.div`
// // //   margin-top: 20px;
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   padding: 20px;
// // //   background-color: #fff;
// // //   border-radius: 5px;
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// // // `;

// // // const TemplateSelectedTitle = styled.h2`
// // //   font-size: 1.5rem;
// // //   font-weight: bold;
// // //   color: #0D173B;
// // //   margin-bottom: 1rem;
// // //   text-align: center;
// // // `;

// // // const TemplateImageContainer = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // // `;

// // // const TemplateImage = styled.img`
// // //   max-width: 300px;
// // //   max-height: 300px;
// // //   width: auto;
// // //   height: auto;
// // //   object-fit: contain;
// // //   border-radius: 5px;
// // //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// // // `;

// // // const ChooseTemplateButton = styled.button`
// // //   padding: 10px 20px;
// // //   font-size: 1rem;
// // //   border-radius: 15px;
// // //   background: linear-gradient(90deg, #4AB7E0, #84AC64);
// // //   color: white;
// // //   border: none;
// // //   cursor: pointer;
// // //   transition: background 0.3s ease;
// // //   margin-top: 20px;

// // //   &:hover {
// // //     background: linear-gradient(90deg, #84AC64, #4AB7E0);
// // //   }
// // // `;

// // // export default NotesPage;
// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate, useLocation } from 'react-router-dom';
// // import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
// // import axios from 'axios';
// // import Navbar from '../components/Navbar';
// // import { db } from '../config/firebaseConfig';
// // import { useAuthContext } from '../hooks/AuthProvider';
// // import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';

// // const fadeIn = keyframes`
// //   from {
// //     opacity: 0;
// //   }
// //   to {
// //     opacity: 1;
// //   }
// // `;

// // const dotAnimation = keyframes`
// //   0% { opacity: 0; }
// //   50% { opacity: 1; }
// //   100% { opacity: 0; }
// // `;

// // const NotesPage = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { user } = useAuthContext(); // Get the authenticated user
// //   const [image, setImage] = useState(null);
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const [extractedText, setExtractedText] = useState('');
// //   const [keywords, setKeywords] = useState([]);
// //   const [notes, setNotes] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [saveMessage, setSaveMessage] = useState(null);
// //   const [isSaving, setIsSaving] = useState(false); // New state for saving status
// //   const [selectedTemplate, setSelectedTemplate] = useState(null);
// //   const [savedNotes, setSavedNotes] = useState([]);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const sidebarRef = useRef(null);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [sidebarWidth, setSidebarWidth] = useState(300);

// //   useEffect(() => {
// //     const fetchDefaultTemplate = async () => {
// //       const defaultTemplatesCollection = collection(db, 'default_templates');
// //       const defaultTemplatesSnapshot = await getDocs(defaultTemplatesCollection);
// //       const defaultTemplatesData = defaultTemplatesSnapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       setSelectedTemplate(defaultTemplatesData[0]); // Set the default template
// //     };

// //     if (location.state && location.state.selectedTemplate) {
// //       setSelectedTemplate(location.state.selectedTemplate);
// //     } else {
// //       fetchDefaultTemplate();
// //     }

// //     // Restore state from local storage
// //     const storedImage = localStorage.getItem('image');
// //     const storedImagePreview = localStorage.getItem('imagePreview');
// //     const storedExtractedText = localStorage.getItem('extractedText');
// //     const storedKeywords = localStorage.getItem('keywords');
// //     const storedNotes = localStorage.getItem('notes');

// //     if (storedImage) setImage(storedImage);
// //     if (storedImagePreview) setImagePreview(storedImagePreview);
// //     if (storedExtractedText) setExtractedText(storedExtractedText);
// //     if (storedKeywords) setKeywords(JSON.parse(storedKeywords));
// //     if (storedNotes) setNotes(storedNotes);

// //     const fetchSavedNotes = async () => {
// //       const userId = user.uid;
// //       const userRef = doc(db, 'notes_store', userId);
// //       const userDoc = await getDoc(userRef);

// //       if (userDoc.exists()) {
// //         const notesCollection = collection(db, 'notes_store', userId, 'notes');
// //         const notesSnapshot = await getDocs(notesCollection);
// //         const notesData = notesSnapshot.docs.map(doc => ({
// //           id: doc.id,
// //           ...doc.data()
// //         }));
// //         setSavedNotes(notesData);
// //       }
// //     };

// //     fetchSavedNotes();
// //   }, [location.state, user.uid]);

// //   useEffect(() => {
// //     // Save state to local storage
// //     if (image) localStorage.setItem('image', image);
// //     if (imagePreview) localStorage.setItem('imagePreview', imagePreview);
// //     if (extractedText) localStorage.setItem('extractedText', extractedText);
// //     if (keywords) localStorage.setItem('keywords', JSON.stringify(keywords));
// //     if (notes) localStorage.setItem('notes', notes);
// //   }, [image, imagePreview, extractedText, keywords, notes]);

// //   const handleImageUpload = (event) => {
// //     const file = event.target.files[0];
// //     setImage(file);
// //     setSaveMessage(null); // Reset save message when a new file is uploaded

// //     // Log the file details
// //     console.log('Uploaded file:', file);

// //     // Set image preview
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleGenerateNotes = async () => {
// //     if (!image) {
// //       alert('Please upload an image first.');
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);
// //     setExtractedText('');
// //     setKeywords([]);
// //     setNotes('');

// //     const formData = new FormData();
// //     formData.append('file', image);

// //     try {
// //       // Extract text
// //       const textResponse = await axios.post('http://localhost:5000/extract-text', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });
// //       setExtractedText(textResponse.data.text);

// //       // Extract keywords
// //       const keywordsResponse = await axios.post('http://localhost:5000/extract-keywords', {
// //         text: textResponse.data.text,
// //       });
// //       setKeywords(keywordsResponse.data.keywords);

// //       // Generate notes using the selected template
// //       const notesResponse = await axios.post('http://localhost:5000/generate-notes', {
// //         keywords: keywordsResponse.data.keywords,
// //         template: selectedTemplate.name // Use the selected template
// //       });
// //       setNotes(notesResponse.data.notes);
// //     } catch (error) {
// //       console.error('Error generating notes:', error.response ? error.response.data : error.message);
// //       setError('Error generating notes. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSaveNotes = async () => {
// //     if (!notes) {
// //       alert('No notes to save.');
// //       return;
// //     }

// //     const userId = user.uid; // Get the user ID from the authenticated user
// //     const userEmail = user.email; // Get the user email from the authenticated user
// //     const today = new Date().toDateString();

// //     setIsSaving(true); // Start saving

// //     try {
// //       const userRef = doc(db, 'notes_store', userId);
// //       const userDoc = await getDoc(userRef);

// //       if (!userDoc.exists()) {
// //         await setDoc(userRef, {
// //           userId,
// //           userEmail,
// //           notes: {}
// //         });
// //       }

// //       const notesRef = doc(collection(db, 'notes_store', userId, 'notes'), today);
// //       const notesDoc = await getDoc(notesRef);

// //       if (!notesDoc.exists()) {
// //         await setDoc(notesRef, {
// //           notes: []
// //         });
// //       }

// //       await updateDoc(notesRef, {
// //         notes: arrayUnion({
// //           notes,
// //           date: today,
// //           image: imagePreview
// //         })
// //       });

// //       setSaveMessage('Notes successfully saved.');
// //       setSavedNotes(prevNotes => [...prevNotes, {
// //         id: today,
// //         notes: [{ notes, date: today, image: imagePreview }]
// //       }]);
// //     } catch (error) {
// //       console.error('Error saving notes:', error);
// //       setSaveMessage('Error saving notes. Please try again.');
// //     } finally {
// //       setIsSaving(false); // Finish saving
// //     }
// //   };

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   const startDragging = (e) => {
// //     setIsDragging(true);
// //     document.addEventListener('mousemove', handleDragging);
// //     document.addEventListener('mouseup', stopDragging);
// //   };

// //   const handleDragging = (e) => {
// //     if (isDragging) {
// //       const newWidth = e.clientX;
// //       setSidebarWidth(newWidth);
// //     }
// //   };

// //   const stopDragging = () => {
// //     setIsDragging(false);
// //     document.removeEventListener('mousemove', handleDragging);
// //     document.removeEventListener('mouseup', stopDragging);
// //   };
// //   return (
// //   <>
// //     <GlobalStyle />
// //     <Container>
// //       <Navbar /> {/* Use the Navbar component */}
// //       <MainContent>
// //         <SidebarContainer isOpen={isSidebarOpen} width={sidebarWidth}>
// //           <SidebarHeader>
// //             <SidebarTitle>Saved Notes</SidebarTitle>
// //             <CloseButton onClick={toggleSidebar}>×</CloseButton>
// //           </SidebarHeader>
// //           <NotesTable>
// //             <thead>
// //               <tr>
// //                 <th>Date</th>
// //                 <th>Notes</th>
// //                 <th>Image</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {savedNotes.map(note => (
// //                 note.notes.map((item, index) => (
// //                   <tr key={index}>
// //                     <td>{item.date}</td>
// //                     <td>{item.notes}</td>
// //                     <td><img src={item.image} alt="Saved" style={{ maxWidth: '50px' }} /></td>
// //                   </tr>
// //                 ))
// //               ))}
// //             </tbody>
// //           </NotesTable>
// //           <DragHandle onMouseDown={startDragging} />
// //         </SidebarContainer>
// //         <Content isSidebarOpen={isSidebarOpen} sidebarWidth={sidebarWidth}>
// //           <Title>Notes Generation Page</Title>
// //           <Subtitle>Upload an image to generate notes.</Subtitle>
// //           <UploadSection>
// //             <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
// //             {image && <FileName>{image.name}</FileName>}
// //           </UploadSection>
// //           {image && (
// //             <ActionButton onClick={handleGenerateNotes}>Generate Notes</ActionButton>
// //           )}
// //           {loading && <LoadingMessage>Your notes are on the way<AnimatedDots>...</AnimatedDots></LoadingMessage>}
// //           {error && <ErrorMessage>{error}</ErrorMessage>}
// //           {extractedText && (
// //             <>
// //               <SectionTitle>Extracted Text</SectionTitle>
// //               <TextArea value={extractedText} readOnly />
// //             </>
// //           )}
// //           {keywords.length > 0 && (
// //             <>
// //               <SectionTitle>Key Points</SectionTitle>
// //               <ul>
// //                 {keywords.map((keyword, index) => (
// //                   <li key={index}>{keyword}</li>
// //                 ))}
// //               </ul>
// //             </>
// //           )}
// //           {notes && (
// //             <>
// //               <SectionTitle>Final Notes</SectionTitle>
// //               <div dangerouslySetInnerHTML={{ __html: notes }} />
// //               {!isSaving && !saveMessage && (
// //                 <ActionButton onClick={handleSaveNotes}>Save Notes</ActionButton>
// //               )}
// //               {isSaving && <SavingMessage>Saving<AnimatedDots>...</AnimatedDots></SavingMessage>}
// //               {saveMessage && <SaveMessage>{saveMessage}</SaveMessage>}
// //             </>
// //           )}
// //         </Content>
// //         {imagePreview && (
// //           <ImagePreviewContainer>
// //             <PreviewTitle>Uploaded Image Preview</PreviewTitle>
// //             <ImagePreview src={imagePreview} alt="Uploaded Image Preview" />
// //             {selectedTemplate && (
// //               <TemplateSelectedContainer>
// //                 <TemplateSelectedTitle>Template Selected</TemplateSelectedTitle>
// //                 <TemplateImageContainer>
// //                   <TemplateImage src={selectedTemplate.imageUrl} alt={selectedTemplate.name} />
// //                 </TemplateImageContainer>
// //                 <ChooseTemplateButton onClick={() => navigate('/templates')}>Choose Template</ChooseTemplateButton>
// //               </TemplateSelectedContainer>
// //             )}
// //           </ImagePreviewContainer>
// //         )}
// //       </MainContent>
// //       <ToggleButton onClick={toggleSidebar}>⋮</ToggleButton>
// //     </Container>
// //   </>
// // );

// //   // return (
// //   //   <>
// //   //     <GlobalStyle />
// //   //     <Container>
// //   //       <Navbar /> {/* Use the Navbar component */}
// //   //       <MainContent>
// //   //         <SidebarContainer isOpen={isSidebarOpen} width={sidebarWidth}>
// //   //           <SidebarHeader>
// //   //             <SidebarTitle>Saved Notes</SidebarTitle>
// //   //             <CloseButton onClick={toggleSidebar}>×</CloseButton>
// //   //           </SidebarHeader>
// //   //           <NotesTable>
// //   //             <thead>
// //   //               <tr>
// //   //                 <th>Date</th>
// //   //                 <th>Notes</th>
// //   //                 <th>Image</th>
// //   //               </tr>
// //   //             </thead>
// //   //             <tbody>
// //   //               {savedNotes.map(note => (
// //   //                 note.notes.map((item, index) => (
// //   //                   <tr key={index}>
// //   //                     <td>{item.date}</td>
// //   //                     <td>{item.notes}</td>
// //   //                     <td><img src={item.image} alt="Saved" style={{ maxWidth: '50px' }} /></td>
// //   //                   </tr>
// //   //                 ))
// //   //               ))}
// //   //             </tbody>
// //   //           </NotesTable>
// //   //           <DragHandle onMouseDown={startDragging} />
// //   //         </SidebarContainer>
// //   //         <Content isSidebarOpen={isSidebarOpen}>
// //   //           <Title>Notes Generation Page</Title>
// //   //           <Subtitle>Upload an image to generate notes.</Subtitle>
// //   //           <UploadSection>
// //   //             <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
// //   //             {image && <FileName>{image.name}</FileName>}
// //   //           </UploadSection>
// //   //           {image && (
// //   //             <ActionButton onClick={handleGenerateNotes}>Generate Notes</ActionButton>
// //   //           )}
// //   //           {loading && <LoadingMessage>Your notes are on the way<AnimatedDots>...</AnimatedDots></LoadingMessage>}
// //   //           {error && <ErrorMessage>{error}</ErrorMessage>}
// //   //           {extractedText && (
// //   //             <>
// //   //               <SectionTitle>Extracted Text</SectionTitle>
// //   //               <TextArea value={extractedText} readOnly />
// //   //             </>
// //   //           )}
// //   //           {keywords.length > 0 && (
// //   //             <>
// //   //               <SectionTitle>Key Points</SectionTitle>
// //   //               <ul>
// //   //                 {keywords.map((keyword, index) => (
// //   //                   <li key={index}>{keyword}</li>
// //   //                 ))}
// //   //               </ul>
// //   //             </>
// //   //           )}
// //   //           {notes && (
// //   //             <>
// //   //               <SectionTitle>Final Notes</SectionTitle>
// //   //               <div dangerouslySetInnerHTML={{ __html: notes }} />
// //   //               {!isSaving && !saveMessage && (
// //   //                 <ActionButton onClick={handleSaveNotes}>Save Notes</ActionButton>
// //   //               )}
// //   //               {isSaving && <SavingMessage>Saving<AnimatedDots>...</AnimatedDots></SavingMessage>}
// //   //               {saveMessage && <SaveMessage>{saveMessage}</SaveMessage>}
// //   //             </>
// //   //           )}
// //   //         </Content>
// //   //         {imagePreview && (
// //   //           <ImagePreviewContainer>
// //   //             <PreviewTitle>Uploaded Image Preview</PreviewTitle>
// //   //             <ImagePreview src={imagePreview} alt="Uploaded Image Preview" />
// //   //             {selectedTemplate && (
// //   //               <TemplateSelectedContainer>
// //   //                 <TemplateSelectedTitle>Template Selected</TemplateSelectedTitle>
// //   //                 <TemplateImageContainer>
// //   //                   <TemplateImage src={selectedTemplate.imageUrl} alt={selectedTemplate.name} />
// //   //                 </TemplateImageContainer>
// //   //                 <ChooseTemplateButton onClick={() => navigate('/templates')}>Choose Template</ChooseTemplateButton>
// //   //               </TemplateSelectedContainer>
// //   //             )}
// //   //           </ImagePreviewContainer>
// //   //         )}
// //   //       </MainContent>
// //   //       <ToggleButton onClick={toggleSidebar}>⋮</ToggleButton>
// //   //     </Container>
// //   //   </>
// //   // );
// // };

// // const GlobalStyle = createGlobalStyle`
// //   html, body {
// //     margin: 0;
// //     padding: 0;
// //     height: 100%;
// //     overflow: hidden;
// //     background-color: #F0F8FF;
// //     color: #0D173B;
// //     font-family: 'Arial', sans-serif;
// //     background-image: url('your-background-image-url.jpg'); /* Add your background image URL here */
// //     background-size: cover;
// //     background-position: center;
// //   }

// //   #root {
// //     height: 100%;
// //     overflow: hidden;
// //   }
// // `;

// // const Container = styled.div`
// //   background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
// //   height: 100vh;
// //   width: 100vw;
// //   display: flex;
// //   flex-direction: column;
// //   margin: 0;
// //   padding: 0;
// //   overflow: hidden;
// //   position: fixed;
// //   top: 0;
// //   left: 0;
// //   right: 0;
// //   bottom: 0;
// // `;

// // const MainContent = styled.div`
// //   display: flex;
// //   flex-direction: row;
// //   align-items: flex-start;
// //   justify-content: space-between;
// //   flex-grow: 1;
// //   padding-top: 80px; /* Adjust padding to account for the fixed navbar */
// //   overflow-y: auto; /* Make the content scrollable */
// //   position: relative;
// // `;

// // const SidebarContainer = styled.div`
// //   width: ${props => props.width}px;
// //   background-color: #4AB7E0;
// //   padding: 20px;
// //   border-right: 1px solid #ccc;
// //   overflow-y: auto;
// //   height: 100vh; /* Ensure the sidebar spans the full height of the page */
// //   position: absolute;
// //   top: 0;
// //   left: 0;
// //   transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
// //   transition: transform 0.3s ease;
// //   z-index: 1000;
// // `;

// // const SidebarHeader = styled.div`
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   margin-bottom: 20px;
// // `;

// // const SidebarTitle = styled.h2`
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   color: #0D173B;
// //   margin-bottom: 1rem;
// //   text-align: center;
// // `;

// // const CloseButton = styled.button`
// //   background: none;
// //   border: none;
// //   font-size: 1.5rem;
// //   cursor: pointer;
// //   color: #0D173B;
// // `;

// // const NotesTable = styled.table`
// //   width: 100%;
// //   border-collapse: collapse;

// //   th, td {
// //     border: 1px solid #ccc;
// //     padding: 10px;
// //     text-align: left;
// //   }

// //   th {
// //     background-color: #f0f0f0;
// //   }
// // `;

// // // const Content = styled.div`
// // //   display: flex;
// // //   flex-direction: column;
// // //   align-items: center;
// // //   justify-content: center;
// // //   flex-grow: 1;
// // //   padding: 20px;
// // //   margin-left: ${props => (props.isSidebarOpen ? `${sidebarWidth}px` : '0')};
// // //   transition: margin-left 0.3s ease;
// // // `;
// // const Content = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   flex-grow: 1;
// //   padding: 20px;
// //   margin-left: ${props => (props.isSidebarOpen ? `${props.sidebarWidth}px` : '0')};
// //   transition: margin-left 0.3s ease;
// // `;

// // const Title = styled.h1`
// //   font-size: 2.5rem;
// //   font-weight: bold;
// //   color: #0D173B;
// //   margin-bottom: 1.5rem;
// //   text-align: center;
// // `;

// // const Subtitle = styled.p`
// //   font-size: 1.2rem;
// //   color: #5569af;
// //   margin-bottom: 2rem;
// //   text-align: center;
// // `;

// // const UploadSection = styled.div`
// //   margin-bottom: 2rem;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// // `;

// // const FileInput = styled.input`
// //   padding: 10px;
// //   border: 1px solid #ccc;
// //   border-radius: 5px;
// //   background: linear-gradient(90deg, #4AB7E0, #84AC64);
// //   color: white;
// //   cursor: pointer;
// //   transition: background 0.3s ease;

// //   &:hover {
// //     background: linear-gradient(90deg, #84AC64, #4AB7E0);
// //   }
// // `;

// // const FileName = styled.span`
// //   margin-top: 10px;
// //   font-size: 1rem;
// //   color: #0D173B;
// // `;

// // const SectionTitle = styled.h2`
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   color: #0D173B;
// //   margin-bottom: 1rem;
// //   text-align: center;
// // `;

// // const TextArea = styled.textarea`
// //   width: 100%;
// //   height: 150px;
// //   padding: 10px;
// //   margin-bottom: 2rem;
// //   border: 1px solid #ccc;
// //   border-radius: 5px;
// //   font-size: 1rem;
// // `;

// // const ImagePreviewContainer = styled.div`
// //   display: flex;
// //   flex-direction: row;
// //   justify-content: space-between;
// //   margin-left: 20px;
// //   margin-right: 50px;
// //   padding: 20px;
// //   background-color: #fff;
// //   border-radius: 5px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// //   width: calc(100% - 40px); /* Adjust width to fit the container */
// // `;

// // const PreviewTitle = styled.h2`
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   color: #0D173B;
// //   margin-bottom: 1rem;
// //   text-align: center;
// // `;

// // const ImagePreview = styled.img`
// //   max-width: 45%;
// //   max-height: 450px;
// //   width: auto;
// //   height: auto;
// //   object-fit: contain;
// //   border-radius: 5px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// //   padding: 20px;
// //   background-color: #fff;
// // `;

// // const TemplateSelectedContainer = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   padding: 20px;
// //   background-color: #fff;
// //   border-radius: 5px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// //   width: 45%;
// // `;

// // const TemplateSelectedTitle = styled.h2`
// //   font-size: 1.5rem;
// //   font-weight: bold;
// //   color: #0D173B;
// //   margin-bottom: 1rem;
// //   text-align: center;
// // `;

// // const TemplateImageContainer = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// // `;

// // const TemplateImage = styled.img`
// //   max-width: 100%;
// //   max-height: 450px;
// //   width: auto;
// //   height: auto;
// //   object-fit: contain;
// //   border-radius: 5px;
// //   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// // `;

// // const ChooseTemplateButton = styled.button`
// //   padding: 10px 20px;
// //   font-size: 1rem;
// //   border-radius: 15px;
// //   background: linear-gradient(90deg, #4AB7E0, #84AC64);
// //   color: white;
// //   border: none;
// //   cursor: pointer;
// //   transition: background 0.3s ease;
// //   margin-top: 20px;

// //   &:hover {
// //     background: linear-gradient(90deg, #84AC64, #4AB7E0);
// //   }
// // `;

// // const ActionButton = styled.button`
// //   padding: 10px 20px;
// //   font-size: 1rem;
// //   border-radius: 15px;
// //   background: linear-gradient(90deg, #4AB7E0, #84AC64);
// //   color: white;
// //   border: none;
// //   cursor: pointer;
// //   transition: background 0.3s ease;
// //   margin-bottom: 2rem;

// //   &:hover {
// //     background: linear-gradient(90deg, #84AC64, #4AB7E0);
// //   }
// // `;

// // const LoadingMessage = styled.p`
// //   font-size: 1.2rem;
// //   color: #5569af;
// //   margin-bottom: 2rem;
// //   text-align: center;
// // `;

// // const ErrorMessage = styled.p`
// //   font-size: 1.2rem;
// //   color: red;
// //   margin-bottom: 2rem;
// //   text-align: center;
// // `;

// // const SaveMessage = styled.p`
// //   font-size: 1.2rem;
// //   color: green;
// //   margin-bottom: 1rem;
// //   text-align: center;
// // `;

// // const SavingMessage = styled.p`
// //   font-size: 1.2rem;
// //   color: #5569af;
// //   margin-bottom: 1rem;
// //   text-align: center;
// // `;

// // const AnimatedDots = styled.span`
// //   &::after {
// //     content: '...';
// //     animation: ${dotAnimation} 1.5s steps(5, end) infinite;
// //   }
// // `;

// // const DragHandle = styled.div`
// //   width: 10px;
// //   height: 100%;
// //   position: absolute;
// //   right: 0;
// //   top: 0;
// //   cursor: ew-resize;
// //   z-index: 10;
// // `;

// // const ToggleButton = styled.button`
// //   position: fixed;
// //   top: 80px; /* Adjust the top position to be below the logo */
// //   left: 20px;
// //   background: linear-gradient(90deg, #4AB7E0, #84AC64);
// //   color: white;
// //   border: none;
// //   border-radius: 50%;
// //   width: 40px;
// //   height: 40px;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   cursor: pointer;
// //   font-size: 1.5rem;
// //   z-index: 1000;

// //   &:hover {
// //     background: linear-gradient(90deg, #84AC64, #4AB7E0);
// //   }
// // `;

// // export default NotesPage;
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import styled, { keyframes, createGlobalStyle } from 'styled-components';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { db } from '../config/firebaseConfig';
// import { useAuthContext } from '../hooks/AuthProvider';
// import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const dotAnimation = keyframes`
//   0% { opacity: 0; }
//   50% { opacity: 1; }
//   100% { opacity: 0; }
// `;

// const NotesPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuthContext(); // Get the authenticated user
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [extractedText, setExtractedText] = useState('');
//   const [keywords, setKeywords] = useState([]);
//   const [notes, setNotes] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [saveMessage, setSaveMessage] = useState(null);
//   const [isSaving, setIsSaving] = useState(false); // New state for saving status
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [savedNotes, setSavedNotes] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [sidebarWidth, setSidebarWidth] = useState(300);

//   useEffect(() => {
//     const fetchDefaultTemplate = async () => {
//       const defaultTemplatesCollection = collection(db, 'default_templates');
//       const defaultTemplatesSnapshot = await getDocs(defaultTemplatesCollection);
//       const defaultTemplatesData = defaultTemplatesSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setSelectedTemplate(defaultTemplatesData[0]); // Set the default template
//     };

//     if (location.state && location.state.selectedTemplate) {
//       setSelectedTemplate(location.state.selectedTemplate);
//     } else {
//       fetchDefaultTemplate();
//     }

//     // Restore state from local storage
//     const storedImage = localStorage.getItem('image');
//     const storedImagePreview = localStorage.getItem('imagePreview');
//     const storedExtractedText = localStorage.getItem('extractedText');
//     const storedKeywords = localStorage.getItem('keywords');
//     const storedNotes = localStorage.getItem('notes');

//     if (storedImage) setImage(storedImage);
//     if (storedImagePreview) setImagePreview(storedImagePreview);
//     if (storedExtractedText) setExtractedText(storedExtractedText);
//     if (storedKeywords) setKeywords(JSON.parse(storedKeywords));
//     if (storedNotes) setNotes(storedNotes);

//     const fetchSavedNotes = async () => {
//       const userId = user.uid;
//       const userRef = doc(db, 'notes_store', userId);
//       const userDoc = await getDoc(userRef);

//       if (userDoc.exists()) {
//         const notesCollection = collection(db, 'notes_store', userId, 'notes');
//         const notesSnapshot = await getDocs(notesCollection);
//         const notesData = notesSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setSavedNotes(notesData);
//       }
//     };

//     fetchSavedNotes();
//   }, [location.state, user.uid]);

//   useEffect(() => {
//     // Save state to local storage
//     if (image) localStorage.setItem('image', image);
//     if (imagePreview) localStorage.setItem('imagePreview', imagePreview);
//     if (extractedText) localStorage.setItem('extractedText', extractedText);
//     if (keywords) localStorage.setItem('keywords', JSON.stringify(keywords));
//     if (notes) localStorage.setItem('notes', notes);
//   }, [image, imagePreview, extractedText, keywords, notes]);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setImage(file);
//     setSaveMessage(null); // Reset save message when a new file is uploaded

//     // Log the file details
//     console.log('Uploaded file:', file);

//     // Set image preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleGenerateNotes = async () => {
//     if (!image) {
//       alert('Please upload an image first.');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setExtractedText('');
//     setKeywords([]);
//     setNotes('');

//     const formData = new FormData();
//     formData.append('file', image);

//     try {
//       // Extract text
//       const textResponse = await axios.post('http://localhost:5000/extract-text', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setExtractedText(textResponse.data.text);

//       // Extract keywords
//       const keywordsResponse = await axios.post('http://localhost:5000/extract-keywords', {
//         text: textResponse.data.text,
//       });
//       setKeywords(keywordsResponse.data.keywords);

//       // Generate notes using the selected template
//       const notesResponse = await axios.post('http://localhost:5000/generate-notes', {
//         keywords: keywordsResponse.data.keywords,
//         template: selectedTemplate.name // Use the selected template
//       });
//       setNotes(notesResponse.data.notes);
//     } catch (error) {
//       console.error('Error generating notes:', error.response ? error.response.data : error.message);
//       setError('Error generating notes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveNotes = async () => {
//     if (!notes) {
//       alert('No notes to save.');
//       return;
//     }

//     const userId = user.uid; // Get the user ID from the authenticated user
//     const userEmail = user.email; // Get the user email from the authenticated user
//     const today = new Date().toDateString();

//     setIsSaving(true); // Start saving

//     try {
//       const userRef = doc(db, 'notes_store', userId);
//       const userDoc = await getDoc(userRef);

//       if (!userDoc.exists()) {
//         await setDoc(userRef, {
//           userId,
//           userEmail,
//           notes: {}
//         });
//       }

//       const notesRef = doc(collection(db, 'notes_store', userId, 'notes'), today);
//       const notesDoc = await getDoc(notesRef);

//       if (!notesDoc.exists()) {
//         await setDoc(notesRef, {
//           notes: []
//         });
//       }

//       await updateDoc(notesRef, {
//         notes: arrayUnion({
//           notes,
//           date: today,
//           image: imagePreview
//         })
//       });

//       setSaveMessage('Notes successfully saved.');
//       setSavedNotes(prevNotes => [...prevNotes, {
//         id: today,
//         notes: [{ notes, date: today, image: imagePreview }]
//       }]);
//     } catch (error) {
//       console.error('Error saving notes:', error);
//       setSaveMessage('Error saving notes. Please try again.');
//     } finally {
//       setIsSaving(false); // Finish saving
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const startDragging = (e) => {
//     setIsDragging(true);
//     document.addEventListener('mousemove', handleDragging);
//     document.addEventListener('mouseup', stopDragging);
//   };

//   const handleDragging = (e) => {
//     if (isDragging) {
//       const newWidth = e.clientX;
//       setSidebarWidth(newWidth);
//     }
//   };

//   const stopDragging = () => {
//     setIsDragging(false);
//     document.removeEventListener('mousemove', handleDragging);
//     document.removeEventListener('mouseup', stopDragging);
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <Container>
//         <Navbar /> {/* Use the Navbar component */}
//         <MainContent>
//           <SidebarContainer isOpen={isSidebarOpen} width={sidebarWidth}>
//             <SidebarHeader>
//               <SidebarTitle>Saved Notes</SidebarTitle>
//               <CloseButton onClick={toggleSidebar}>×</CloseButton>
//             </SidebarHeader>
//             <NotesTable>
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Notes</th>
//                   <th>Image</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {savedNotes.map(note => (
//                   note.notes.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.date}</td>
//                       <td>{item.notes}</td>
//                       <td><img src={item.image} alt="Saved" style={{ maxWidth: '50px' }} /></td>
//                     </tr>
//                   ))
//                 ))}
//               </tbody>
//             </NotesTable>
//             <DragHandle onMouseDown={startDragging} />
//           </SidebarContainer>
//           <Content isSidebarOpen={isSidebarOpen} sidebarWidth={sidebarWidth}>
//             <Title>Notes Generation Page</Title>
//             <Subtitle>Upload an image to generate notes.</Subtitle>
//             <UploadSection>
//               <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
//               {image && <FileName>{image.name}</FileName>}
//             </UploadSection>
//             {image && (
//               <ActionButton onClick={handleGenerateNotes}>Generate Notes</ActionButton>
//             )}
//             {loading && <LoadingMessage>Your notes are on the way<AnimatedDots>...</AnimatedDots></LoadingMessage>}
//             {error && <ErrorMessage>{error}</ErrorMessage>}
//             {extractedText && (
//               <>
//                 <SectionTitle>Extracted Text</SectionTitle>
//                 <TextArea value={extractedText} readOnly />
//               </>
//             )}
//             {keywords.length > 0 && (
//               <>
//                 <SectionTitle>Key Points</SectionTitle>
//                 <ul>
//                   {keywords.map((keyword, index) => (
//                     <li key={index}>{keyword}</li>
//                   ))}
//                 </ul>
//               </>
//             )}
//             {notes && (
//               <>
//                 <SectionTitle>Final Notes</SectionTitle>
//                 <div dangerouslySetInnerHTML={{ __html: notes }} />
//                 {!isSaving && !saveMessage && (
//                   <ActionButton onClick={handleSaveNotes}>Save Notes</ActionButton>
//                 )}
//                 {isSaving && <SavingMessage>Saving<AnimatedDots>...</AnimatedDots></SavingMessage>}
//                 {saveMessage && <SaveMessage>{saveMessage}</SaveMessage>}
//               </>
//             )}
//           </Content>
//           {imagePreview && (
//             <ImagePreviewContainer>
//               <PreviewTitle>Uploaded Image Preview</PreviewTitle>
//               <ImagePreview src={imagePreview} alt="Uploaded Image Preview" />
//               {selectedTemplate && (
//                 <TemplateSelectedContainer>
//                   <TemplateSelectedTitle>Template Selected</TemplateSelectedTitle>
//                   <TemplateImageContainer>
//                     <TemplateImage src={selectedTemplate.imageUrl} alt={selectedTemplate.name} />
//                   </TemplateImageContainer>
//                   <ChooseTemplateButton onClick={() => navigate('/templates')}>Choose Template</ChooseTemplateButton>
//                 </TemplateSelectedContainer>
//               )}
//             </ImagePreviewContainer>
//           )}
//         </MainContent>
//         <ToggleButton onClick={toggleSidebar}>⋮</ToggleButton>
//       </Container>
//     </>
//   );
// };

// const GlobalStyle = createGlobalStyle`
//   html, body {
//     margin: 0;
//     padding: 0;
//     height: 100%;
//     overflow: hidden;
//     background-color: #F0F8FF;
//     color: #0D173B;
//     font-family: 'Arial', sans-serif;
//     background-image: url('your-background-image-url.jpg'); /* Add your background image URL here */
//     background-size: cover;
//     background-position: center;
//   }

//   #root {
//     height: 100%;
//     overflow: hidden;
//   }
// `;

// const Container = styled.div`
//   background: linear-gradient(90deg, #F0F8FF 0%, #ffeef8 100%);
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   margin: 0;
//   padding: 0;
//   overflow: hidden;
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// `;

// const MainContent = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   justify-content: space-between;
//   flex-grow: 1;
//   padding-top: 80px; /* Adjust padding to account for the fixed navbar */
//   overflow-y: auto; /* Make the content scrollable */
//   position: relative;
// `;

// const SidebarContainer = styled.div`
//   width: ${props => props.width}px;
//   background-color: #4AB7E0;
//   padding: 20px;
//   border-right: 1px solid #ccc;
//   overflow-y: auto;
//   height: 100vh; /* Ensure the sidebar spans the full height of the page */
//   position: absolute;
//   top: 0;
//   left: 0;
//   transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
//   transition: transform 0.3s ease;
//   z-index: 1000;
// `;

// const SidebarHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const SidebarTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #0D173B;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
//   color: #0D173B;
// `;

// const NotesTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;

//   th, td {
//     border: 1px solid #ccc;
//     padding: 10px;
//     text-align: left;
//   }

//   th {
//     background-color: #f0f0f0;
//   }
// `;

// const Content = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   flex-grow: 1;
//   padding: 20px;
//   margin-left: ${props => (props.isSidebarOpen ? `${props.sidebarWidth}px` : '0')};
//   transition: margin-left 0.3s ease;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   font-weight: bold;
//   color: #0D173B;
//   margin-bottom: 1.5rem;
//   text-align: center;
// `;

// const Subtitle = styled.p`
//   font-size: 1.2rem;
//   color: #5569af;
//   margin-bottom: 2rem;
//   text-align: center;
// `;

// const UploadSection = styled.div`
//   margin-bottom: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const FileInput = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   background: linear-gradient(90deg, #4AB7E0, #84AC64);
//   color: white;
//   cursor: pointer;
//   transition: background 0.3s ease;

//   &:hover {
//     background: linear-gradient(90deg, #84AC64, #4AB7E0);
//   }
// `;

// const FileName = styled.span`
//   margin-top: 10px;
//   font-size: 1rem;
//   color: #0D173B;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #0D173B;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   height: 150px;
//   padding: 10px;
//   margin-bottom: 2rem;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-size: 1rem;
// `;

// const ImagePreviewContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-left: 20px;
//   margin-right: 50px;
//   padding: 20px;
//   background-color: #fff;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   width: calc(100% - 40px); /* Adjust width to fit the container */
// `;

// const PreviewTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #0D173B;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const ImagePreview = styled.img`
//   max-width: 100%;
//   max-height: 450px;
//   width: auto;
//   height: auto;
//   object-fit: contain;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   padding: 20px;
//   background-color: #fff;
//   margin-bottom: 20px; /* Add margin to separate from template */
// `;

// const TemplateSelectedContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background-color: #fff;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   width: 100%;
// `;

// const TemplateSelectedTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: bold;
//   color: #0D173B;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const TemplateImageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const TemplateImage = styled.img`
//   max-width: 100%;
//   max-height: 450px;
//   width: auto;
//   height: auto;
//   object-fit: contain;
//   border-radius: 5px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const ChooseTemplateButton = styled.button`
//   padding: 10px 20px;
//   font-size: 1rem;
//   border-radius: 15px;
//   background: linear-gradient(90deg, #4AB7E0, #84AC64);
//   color: white;
//   border: none;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   margin-top: 20px;

//   &:hover {
//     background: linear-gradient(90deg, #84AC64, #4AB7E0);
//   }
// `;

// const ActionButton = styled.button`
//   padding: 10px 20px;
//   font-size: 1rem;
//   border-radius: 15px;
//   background: linear-gradient(90deg, #4AB7E0, #84AC64);
//   color: white;
//   border: none;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   margin-bottom: 2rem;

//   &:hover {
//     background: linear-gradient(90deg, #84AC64, #4AB7E0);
//   }
// `;

// const LoadingMessage = styled.p`
//   font-size: 1.2rem;
//   color: #5569af;
//   margin-bottom: 2rem;
//   text-align: center;
// `;

// const ErrorMessage = styled.p`
//   font-size: 1.2rem;
//   color: red;
//   margin-bottom: 2rem;
//   text-align: center;
// `;

// const SaveMessage = styled.p`
//   font-size: 1.2rem;
//   color: green;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const SavingMessage = styled.p`
//   font-size: 1.2rem;
//   color: #5569af;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const AnimatedDots = styled.span`
//   &::after {
//     content: '...';
//     animation: ${dotAnimation} 1.5s steps(5, end) infinite;
//   }
// `;

// const DragHandle = styled.div`
//   width: 10px;
//   height: 100%;
//   position: absolute;
//   right: 0;
//   top: 0;
//   cursor: ew-resize;
//   z-index: 10;
// `;

// const ToggleButton = styled.button`
//   position: fixed;
//   top: 80px; /* Adjust the top position to be below the logo */
//   left: 20px;
//   background: linear-gradient(90deg, #4AB7E0, #84AC64);
//   color: white;
//   border: none;
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   font-size: 1.5rem;
//   z-index: 1000;

//   &:hover {
//     background: linear-gradient(90deg, #84AC64, #4AB7E0);
//   }
// `;

// export default NotesPage;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { db } from '../config/firebaseConfig';
import { useAuthContext } from '../hooks/AuthProvider';
import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, getDocs, deleteField, deleteDoc } from 'firebase/firestore';
import './notes.css'; // Import the CSS file
// import { doc, getDoc, setDoc, collection, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

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
  const [imageUrl, setImageUrl] = useState(''); // Store the image URL
  const [extractedText, setExtractedText] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // New state for saving status
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);
  const sidebarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);

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

    const fetchSavedNotes = async () => {
      const userId = user.uid;
      const userRef = doc(db, 'notes_store', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const notesCollection = collection(db, 'notes_store', userId, 'notes');
        const notesSnapshot = await getDocs(notesCollection);
        const notesData = notesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSavedNotes(notesData);

        const dates = notesData.map(note => note.id);
        setDateOptions(dates);
      }
    };

    fetchSavedNotes();
  }, [location.state, user.uid]);

  useEffect(() => {
    // Save state to local storage
    if (image) localStorage.setItem('image', image);
    if (imagePreview) localStorage.setItem('imagePreview', imagePreview);
    if (extractedText) localStorage.setItem('extractedText', extractedText);
    if (keywords) localStorage.setItem('keywords', JSON.stringify(keywords));
    if (notes) localStorage.setItem('notes', notes);
  }, [image, imagePreview, extractedText, keywords, notes]);

  const handleImageUpload = async (event) => {
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
        notes: arrayUnion({
          notes,
          date: today,
          image: imagePreview
        })
      });

      setSaveMessage('Notes successfully saved.');
      setSavedNotes(prevNotes => [...prevNotes, {
        id: today,
        notes: [{ notes, date: today, image: imagePreview }]
      }]);
      setDateOptions(prevDates => [...new Set([...prevDates, today])]);
    } catch (error) {
      console.error('Error saving notes:', error);
      setSaveMessage('Error saving notes. Please try again.');
    } finally {
      setIsSaving(false); // Finish saving
    }
  };

  const handleDeleteNote = async (date, noteIndex) => {
    const userId = user.uid; // Get the user ID from the authenticated user
    const notesRef = doc(collection(db, 'notes_store', userId, 'notes'), date);

    try {
      const notesDoc = await getDoc(notesRef);
      if (notesDoc.exists()) {
        const notesData = notesDoc.data().notes;
        notesData.splice(noteIndex, 1);
        await updateDoc(notesRef, {
          notes: notesData
        });
        setSaveMessage('Note successfully deleted.');
        setSavedNotes(prevNotes => {
          const updatedNotes = prevNotes.map(note => {
            if (note.id === date) {
              return {
                ...note,
                notes: notesData
              };
            }
            return note;
          });
          return updatedNotes;
        });
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      setSaveMessage('Error deleting note. Please try again.');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.documentElement.style.setProperty('--sidebar-translate', isSidebarOpen ? '-100%' : '0');
    document.documentElement.style.setProperty('--sidebar-margin', isSidebarOpen ? `${sidebarWidth}px` : '0');
  };

  const startDragging = (e) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleDragging);
    document.addEventListener('mouseup', stopDragging);
  };

  const handleDragging = (e) => {
    if (isDragging) {
      const newWidth = e.clientX;
      setSidebarWidth(newWidth);
      document.documentElement.style.setProperty('--sidebar-width', `${newWidth}px`);
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDragging);
    document.removeEventListener('mouseup', stopDragging);
  };

  const handleViewNote = (date, noteIndex) => {
    const note = savedNotes.find(note => note.id === date).notes[noteIndex];
    navigate('/view-note', { state: { note, date } });
  };

  return (
    <div className="container">
      <Navbar /> {/* Use the Navbar component */}
      <div className="main-content">
        <div className={`sidebar-container`} ref={sidebarRef}>
          <div className="sidebar-header">
            <div className="sidebar-title">Saved Notes</div>
            <button className="close-button" onClick={toggleSidebar}>×</button>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search by date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div className="date-dropdown">
            <button className="date-dropdown-button" onClick={() => setSelectedDate(null)}>
              All Dates
            </button>
            {dateOptions.map(date => (
              <div
                key={date}
                className="date-dropdown-item"
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </div>
            ))}
          </div>
          <table className="notes-table">
            <thead>
              <tr>
                <th>Notes</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedNotes
                .filter(note => !selectedDate || note.id === selectedDate)
                .map(note => (
                  note.notes.map((item, index) => (
                    <tr key={index}>
                      <td>{item.notes}</td>
                      <td><img src={item.image} alt="Saved" style={{ maxWidth: '50px' }} /></td>
                      <td>
                        <button className="action-button" onClick={() => handleViewNote(note.id, index)}>View</button>
                        <button className="action-button" onClick={() => handleDeleteNote(note.id, index)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ))}
            </tbody>
          </table>
          <div className="drag-handle" onMouseDown={startDragging} />
        </div>
        <div className={`content`}>
          <div className="title">Notes Generation Page</div>
          <div className="subtitle">Upload an image to generate notes.</div>
          <div className="upload-section">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
            {image && <span className="file-name">{image.name}</span>}
          </div>
          {image && (
            <button className="action-button" onClick={handleGenerateNotes}>Generate Notes</button>
          )}
          {loading && <div className="loading-message">Your notes are on the way<span className="animated-dots">...</span></div>}
          {error && <div className="error-message">{error}</div>}
          {extractedText && (
            <>
              <div className="section-title">Extracted Text</div>
              <textarea value={extractedText} readOnly className="text-area" />
            </>
          )}
          {keywords.length > 0 && (
            <>
              <div className="section-title">Key Points</div>
              <ul>
                {keywords.map((keyword, index) => (
                  <li key={index}>{keyword}</li>
                ))}
              </ul>
            </>
          )}
          {notes && (
            <>
              <div className="section-title">Final Notes</div>
              <div dangerouslySetInnerHTML={{ __html: notes }} />
              {!isSaving && !saveMessage && (
                <button className="action-button" onClick={handleSaveNotes}>Save Notes</button>
              )}
              {isSaving && <div className="saving-message">Saving<span className="animated-dots">...</span></div>}
              {saveMessage && <div className="save-message">{saveMessage}</div>}
            </>
          )}
        </div>
        {imagePreview && (
          <div className="image-preview-container">
            <div className="preview-title">Uploaded Image Preview</div>
            <img src={imagePreview} alt="Uploaded Image Preview" className="image-preview" />
            {selectedTemplate && (
              <div className="template-selected-container">
                <div className="template-selected-title">Template Selected</div>
                <div className="template-image-container">
                  <img src={selectedTemplate.imageUrl} alt={selectedTemplate.name} className="template-image" />
                </div>
                <button className="choose-template-button" onClick={() => navigate('/templates')}>Choose Template</button>
              </div>
            )}
          </div>
        )}
      </div>
      <button className="toggle-button" onClick={toggleSidebar}>⋮</button>
    </div>
  );
};

export default NotesPage;
