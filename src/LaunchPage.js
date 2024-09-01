import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LaunchPage.css';

function LaunchPage() {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState(20);
  const [submitStatus, setSubmitStatus] = useState(null); // For feedback messages
  const [audioSrc, setAudioSrc] = useState(null); // Stores the audio URL for playback
  const [downloadUrl, setDownloadUrl] = useState(null); // Stores the download URL
  const [isLoading, setIsLoading] = useState(false); // Loading state for the generate button
  const [autoSubmit, setAutoSubmit] = useState(false); // Flag for auto-submit
  const navigate = useNavigate();

  useEffect(() => {
    createMusicNotes();
  }, []);

  useEffect(() => {
    // Trigger form submission if autoSubmit is set to true
    if (autoSubmit) {
      handleSubmit({ preventDefault: () => {} });
      setAutoSubmit(false); // Reset the flag
    }
  }, [prompt, genre]); // Dependency array to watch for state updates

  const createMusicNotes = () => {
    const notes = ['♩', '♪', '♫', '♬', '♭', '🎼'];
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
    console.log('Submitted:', { prompt, genre, duration });

    setIsLoading(true);
    setSubmitStatus(null);


    try {
      const response = await axios.post('http://localhost:5000/api/music', {
        prompt,
        genre,
        duration
      });
      alert('Your data was saved on the Database. Thank you.');
      
    } catch (error) {
      console.error('Error saving review:', error);
      alert('Failed to save your feedback.');
    }
    
  
    
     
    try {
      const response = await fetch('http://localhost:5001/generate_music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText: prompt, duration, genre }),
      });
      console.log(response);
      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
        setDownloadUrl(audioUrl);
        setSubmitStatus('Success! Your music has been generated.');
      } else {
        console.error('Failed to generate music');
        setSubmitStatus('Error: Failed to generate music.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('Error: An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMusicGeneration = (type) => {
    let predefinedPrompt = '';
    let predefinedGenre = '';

    switch (type) {
      case 'happy':
        predefinedPrompt = 'Upbeat, joyful, and energetic';
        predefinedGenre = 'Pop';
        break;
      case 'soothing':
        predefinedPrompt = 'Calm, relaxing, and mellow';
        predefinedGenre = 'Jazz';
        break;
      case 'party':
        predefinedPrompt = 'Lively, exciting, and rhythmic';
        predefinedGenre = 'Electronic';
        break;
      default:
        return;
    }

    setPrompt(predefinedPrompt);
    setGenre(predefinedGenre);
    setAutoSubmit(true); // Set the flag to trigger auto-submit
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const genres = [
    'Pop',
    'Rock',
    'Hip Hop',
    'Jazz',
    'Classical',
    'Electronic',
    'Country',
  ];

  return (
    <div className="launch-page">
      <div className="music-background"></div>
      <button className="back-btn" onClick={handleBack}>🢀</button>

      <form className="launch-form" onSubmit={handleSubmit}>
        <h2>Create Your Music</h2>

        <div className="form-group">
          <label htmlFor="prompt">Prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select a genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration: {duration} seconds</label>
          <input
            type="range"
            id="duration"
            min="5"
            max="15"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Create Music'}
          </button>
        </div>

        {submitStatus && (
          <div className="submit-status">
            {submitStatus}
          </div>
        )}
      </form>

      <div className="image-holders">
        <div className="image-holder">
          <img src="happy.png" alt="Happy Music" />
          <button onClick={() => handleMusicGeneration('happy')}>
            Generate Happy Music
          </button>
        </div>

        <div className="image-holder">
          <img src="soothing.png" alt="Soothing Music" />
          <button onClick={() => handleMusicGeneration('soothing')}>
            Generate Soothing Music
          </button>
        </div>

        <div className="image-holder">
          <img src="party.png" alt="Party Music" />
          <button onClick={() => handleMusicGeneration('party')}>
            Generate Party Music
          </button>
        </div>
      </div>

      {/* Music Player Section */}
      {audioSrc && (
        <div className="music-player">
          <h3 style={{ color: 'white' }}>Generated Music:</h3>
          <audio controls>
            <source src={audioSrc} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <a
              href={downloadUrl}
            download="generated_music.wav"
              className="download-btn"
                >
              Download Music
               </a>
          
        </div>
      )}
    </div>
  );
}

export default LaunchPage;
