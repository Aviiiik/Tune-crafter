import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'; // Make sure this import is correct
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import LaunchPage from './LaunchPage';
import AboutUsPage from './AboutUsPage'; 
import ContactPage from './ContactPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold authentication errors

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    }, (authError) => {
      setError(authError);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsAuthenticated(false);
    }).catch((signOutError) => {
      setError(signOutError);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <LoginPage />
          } />
          <Route path="/" element={
            isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />
          } />
          <Route path="/launch" element={
            isAuthenticated ? <LaunchPage /> : <Navigate to="/login" />
          } />
          <Route path="/contact" element={
            isAuthenticated ? <ContactPage /> : <Navigate to="/login" />
          } />
          <Route path="/about" element={
            isAuthenticated ? <AboutUsPage /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
