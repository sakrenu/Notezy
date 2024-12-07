import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const UpdateProfile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    phoneNumber: '',
    grade: '',
    school: '',
    userId: user.uid,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      const userDocRef = doc(db, 'students', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Fetched user data:', data);

        const updatedFormData = {
          name: data.name || '',
          rollNo: data.rollNo || '',
          phoneNumber: data.phoneNumber || '',
          grade: data.grade || '',
          school: data.school || '',
          userId: user.uid,
        };

        setFormData(updatedFormData);
      } else {
        console.warn('No document found for user');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching student profile:', error);
      setError(error.message);
      setIsLoading(false);
      alert('Failed to fetch profile. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');

    try {
      const userDocRef = doc(db, 'students', user.uid);
      await updateDoc(userDocRef, formData);
      setSuccessMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  return (
    <Container>
      <ProfileCard>
        <Title>Update Student Profile</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="rollNo">Roll Number</Label>
            <Input
              id="rollNo"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="Enter your roll number"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="grade">Grade</Label>
            <Input
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Enter your grade"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="Enter your school name"
              required
            />
          </FormGroup>

          <ButtonWrapper>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Profile'}
            </SubmitButton>
          </ButtonWrapper>

          {successMessage && (
            <SuccessMessage>
              {successMessage}
            </SuccessMessage>
          )}

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
        </Form>
      </ProfileCard>
    </Container>
  );
};

=======
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ExternalBackButton onClick={handleGoBack}>
        ←
      </ExternalBackButton>
      <Container>
        <ProfileCard>
          <Title>Update Student Profile</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="rollNo">Roll Number</Label>
              <Input
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="Enter your roll number"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                placeholder="Enter your grade"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Enter your school name"
                required
              />
            </FormGroup>

            <ButtonWrapper>
              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Profile'}
              </SubmitButton>
            </ButtonWrapper>

            {successMessage && (
              <SuccessMessage>
                {successMessage}
              </SuccessMessage>
            )}

            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
          </Form>
        </ProfileCard>
      </Container>
    </>
  );
};

const ExternalBackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #0D173B;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 10;
  transition: background-color 0.3s ease;
  border-radius: 50%;

  &:hover {
    background-color: rgba(74, 183, 224, 0.1);
  }
`;

>>>>>>> e6dfd5c8120357599d9802cbe570e7280710e782
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(180deg, #f1f5ff 0%, #ffeef8 100%);
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  margin: auto;
`;

const SuccessMessage = styled.div`
  background-color: #e6f7e9;
  color: #2e8b57;
  border: 1px solid #2e8b57;
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background-color: #fff0f0;
  color: #d9534f;
  border: 1px solid #d9534f;
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 70vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  color: #0D173B;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #5569af;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e0e7ff;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4AB7E0;
    box-shadow: 0 0 0 2px rgba(74, 183, 224, 0.2);
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(90deg, #4AB7E0, #84AC64);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #84AC64, #4AB7E0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default UpdateProfile;