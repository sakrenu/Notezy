import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import StudentForm from './components/StudentForm';
// import StudentHome from './StudentHome'; // Assuming you have a StudentHome component
import styled from 'styled-components';

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/form" element={<StudentForm />} />
          {/* <Route path="/student/home" element={<StudentHome />} /> */}
        </Routes>
      </AppContainer>
    </Router>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
`;

export default App;