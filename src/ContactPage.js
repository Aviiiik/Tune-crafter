import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContactPage.css';

function ContactPage() {
  const [prompt, setPrompt] = useState('');  // New state for prompt
  const [genre, setGenre] = useState('');    // New state for genre
  const [duration, setDuration] = useState(0); // New state for duration
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    createMusicNotes();
  }, []);

  const createMusicNotes = () => {
    const notes = ['♩', '♪', '♫', '♬','♭','🎼'];
    const background = document.querySelector('.music-background');

    for (let i = 0; i < 20; i++) {
      const note = document.createElement('div');
      note.className = 'music-note';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = `${Math.random() * 100}%`;
      note.style.animationDuration = `${10 + Math.random() * 5}s`;
      note.style.animationDelay = `${Math.random() * 5}s`;
      background.appendChild(note);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/music', {
        
        review,
        rating
      });
      alert('Your feedback was saved on the Database. Thank you.');
      setReview('');
      setRating(0);
    } catch (error) {
      console.error('Error saving review:', error);
      alert('Failed to save your feedback.');
    }
  };

  return (
    <div className="contact-page">
      <div className="music-background"></div>
      <button className="back-btn" onClick={() => navigate('/')}>🢀</button>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <p>Email: TuneCraft@gmail.com</p>
          <p>Phone: 9878986545</p>
        </div>
        <form onSubmit={handleSubmit} className="review-form">
          <h3>Write a Review</h3>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            required
          />
          <div className="rating-container">
            <p>Rate your experience:</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => setRating(star)}
                style={{ cursor: 'pointer' }}
              >
                ★
              </span>
            ))}
          </div>
          <button type="submit" className="submit-btn">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
