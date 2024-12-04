import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { auth, db } from '../config/firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import StudentForm from './StudentForm.js';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        // Handle Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save basic user data to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: 'Student',
          isProfileComplete: false // Add this flag
        });

        setCurrentUser(user);
        setShowForm(true);

      } else {
        // Handle Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if profile is complete
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        if (userData && !userData.isProfileComplete) {
          setCurrentUser(user);
          setShowForm(true);
        }
      }
    } catch (error) {
      setError(error.message);
      console.error("Error in authentication:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        // New Google user - create profile
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: 'Student',
          isProfileComplete: false
        });
        setCurrentUser(user);
        setShowForm(true);
      } else {
        // Existing user - check if profile is complete
        const userData = userDoc.data();
        if (!userData.isProfileComplete) {
          setCurrentUser(user);
          setShowForm(true);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Show appropriate form based on role if showForm is true
  if (showForm && currentUser) {
    return <StudentForm user={currentUser} />;
  }

  return (
    <Container>
      <FormCard>
        <Title>{isSignUp ? 'Welcome to Notezy' : 'Welcome Back to Notezy'}</Title>
        <Subtitle>
          {isSignUp
            ? 'Sign up to start generating detailed notes!'
            : 'Login to continue generating notes!'
          }
        </Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </InputGroup>

          <Button type="submit">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <Divider>or</Divider>

          <GoogleButton type="button" onClick={handleGoogleSignIn}>
            <GoogleIcon src="/google_icon.jpg" alt="Google" />
            Continue with Google
          </GoogleButton>

          <ToggleText>
            {isSignUp
              ? 'Already have an account? '
              : "Don't have an account? "
            }
            <ToggleLink onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </ToggleLink>
          </ToggleText>
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

// Styled Components
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
  background: #fff;
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

const GoogleButton = styled(Button)`
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const Divider = styled.div`
  text-align: center;
  position: relative;
  color: #666;
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #ddd;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
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

const ToggleText = styled.p`
  font-size: 14px;
  text-align: center;
`;

const ToggleLink = styled.span`
  color: #4a90e2;
  cursor: pointer;
`;

export default Login;