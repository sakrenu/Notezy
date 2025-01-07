import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './hooks/AuthProvider';
import Login from './components/Login';
import StudentForm from './components/StudentForm';
import HomePage from './pages/home';
import NotesPage from './pages/notes';
import TemplatesPage from './pages/templates';
import UserProfile from './components/UserProfile';
import UpdateProfile from './components/UpdateProfile';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { user } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      console.log('Current user state:', {
        isProfileComplete: user.isProfileComplete,
        path: location.pathname
      });
    }
  }, [user, location]);

  if (!user) {
    return <Login />;
  }

  console.log('User state:', {
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
            <ProtectedRoute>
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
            <ProtectedRoute>
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
            <ProtectedRoute>
              {!user.isProfileComplete && location.state?.isProfileComplete !== true ? (
                <Navigate to="/student/form" replace />
              ) : (
                <NotesPage />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              {!user.isProfileComplete && location.state?.isProfileComplete !== true ? (
                <Navigate to="/student/form" replace />
              ) : (
                <TemplatesPage />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/update_profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
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