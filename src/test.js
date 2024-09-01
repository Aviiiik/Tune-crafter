import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css';

function ContactPage() {
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
      note.style.animationDuration = `${10 + Math.random() * 5}s`; // Match the speed with HomePage
      note.style.animationDelay = `${Math.random() * 5}s`; // Match the delay with HomePage
      background.appendChild(note);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted review:', review, 'Rating:', rating);
    alert('Thank you for your review!');
    setReview('');
    setRating(0);
  };

  return (
    <div className="contact-page">
      <div className="music-background"></div>
      <button className="back-btn" onClick={() => navigate('/')}>🢀</button>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <p>Email: contact@example.com</p>
          <p>Phone: (123) 456-7890</p>
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
