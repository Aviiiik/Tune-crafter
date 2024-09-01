import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import googleLogo from './logo-google.png'; // Adjust the path to your Google logo image
import './LoginPage.css';

function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const toggleLoginForm = () => {
    setShowLoginForm(true);
    setErrorMessage('');
  };

  const toggleSignupForm = () => {
    setShowLoginForm(false);
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMessage('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Incorrect password.');
          break;
        default:
          setErrorMessage('Email is Not Registered . Please Sign-up !');
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('Email is already in use.');
          break;
        case 'auth/weak-password':
          setErrorMessage('Password should be at least 6 characters.');
          break;
        default:
          setErrorMessage('Error signing up. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      setErrorMessage('Error signing in with Google. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="image-container1">
        {/* The image will be set as a background in CSS */}
      </div>
      <div className="divider"></div>
      <div className="form-side">
        <div className="button-container">
          <button className={`login-btn ${showLoginForm ? 'active' : ''}`} onClick={toggleLoginForm}>Login</button>
          <button className={`signup-btn ${showLoginForm ? '' : 'active'}`} onClick={toggleSignupForm}>Signup</button>
        </div>

        <div className={`form-container login-form ${showLoginForm ? 'show' : ''}`}>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
          <button onClick={handleGoogleSignIn} className="google-signin-btn">
            <img src={googleLogo} alt="Google Logo" className="google-logo" />
            Sign in with Google
          </button>
        </div>

        <div className={`form-container signup-form ${showLoginForm ? '' : 'show'}`}>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
          <button onClick={handleGoogleSignIn} className="google-signin-btn">
            <img src={googleLogo} alt="Google Logo" className="google-logo" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;