import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { db } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const StudentForm = ({ user }) => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('StudentForm mounted');
    return () => {
      console.log('StudentForm unmounted');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    console.log('Starting form submission...');

    if (!name || !rollNo || !phoneNumber || !grade || !school) {
      setError('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Saving student details...');
      // Save student details to Firestore
      await setDoc(doc(db, 'students', user.uid), {
        name,
        rollNo,
        phoneNumber,
        grade,
        school,
        userId: user.uid,
        email: user.email,
        notes: [""]
      });
      console.log('Student details saved successfully');

      console.log('Updating user profile...');
      // Update the user's profile completion status
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'Student',
        isProfileComplete: true,
        studentProfile: true  // Add this flag
      }, { merge: true });

      console.log('Student data saved to Firestore!');

      navigate('/student/home', { replace: true, state: { isProfileComplete: true } });

    } catch (error) {
      console.error('Error saving student data:', error);
      setError('Failed to save student data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Student Information</Title>
        <Subtitle>Please provide your details to complete the sign-up.</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Roll Number</Label>
            <Input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter your roll number"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Grade</Label>
            <Input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter your grade"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>School</Label>
            <Input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Enter your school name"
              required
            />
          </InputGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Student Details'}
          </Button>
        </Form>
      </FormCard>
    </Container>
  );
};

// Keyframes for animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled Components (similar to the login page)
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url('/notezy_background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
`;

const FormCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 10px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 12px;
  text-align: center;
  animation: ${fadeIn} 1.5s ease-in-out;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 24px;
  text-align: center;
  animation: ${fadeIn} 2s ease-in-out;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 12px;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #4a90e2, #7cb3f4);
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  text-align: center;

  &:hover {
    background: linear-gradient(90deg, #7cb3f4, #4a90e2);
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 12px;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c00;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 20px;
`;

export default StudentForm;