import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './hooks/AuthProvider';
import Login from './components/Login';
import StudentForm from './components/StudentForm';
import HomePage from './pages/home';
import NotesPage from './pages/notes';
import UserProfile from './components/UserProfile';
import UpdateProfile from './components/UpdateProfile';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { user } = useAuthContext(); // Get the current authenticated user
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (user) {
      console.log('Current user state:', {
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        path: location.pathname
      });
    }
  }, [user, location]);

  // If no user is logged in, show the Login page
  if (!user) {
    return <Login />;
  }

  // Add this debug log to help understand the values
  console.log('User state:', {
    role: user.role,
    isProfileComplete: user.isProfileComplete
  });

  return (
    <>
      <UserProfile />
      <Routes>
        <Route path="/" element={
          user.isProfileComplete ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/student/form" replace />
          )
        } />

        <Route
          path="/student/form"
          element={
            <ProtectedRoute requiredRole="Student">
              {user.isProfileComplete ? (
                <Navigate to="/home" replace />
              ) : (
                <StudentForm user={user} />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute requiredRole="Student">
              {!user.isProfileComplete && location.state?.isProfileComplete !== true ? (
                <Navigate to="/student/form" replace />
              ) : (
                <HomePage />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute requiredRole="Student">
              {!user.isProfileComplete && location.state?.isProfileComplete !== true ? (
                <Navigate to="/student/form" replace />
              ) : (
                <NotesPage />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/update_profile"
          element={
            <ProtectedRoute requiredRole="Student">
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        {/* Default route for invalid paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}