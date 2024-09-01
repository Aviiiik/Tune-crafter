import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUsPage.css';

function AboutUsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    createMusicNotes();
  }, []);

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

  const teamMembers = [
    {
      name: 'Argha Dutta(2347106)',
      role: 'Frontend Designer',
      image: 'argha.jpg',
      linkedin: 'https://www.linkedin.com/in/argha-dutta-a49b09b3',
      github: 'https://github.com/Argha-Dutta'
    },
    {
      name: 'Avik Mallick(2347110)',
      role: 'Backend Designer',
      image: 'avikk.jpg',
      linkedin: 'https://www.linkedin.com/in/avik-mallick-03b2b0232',
      github: 'https://github.com/Aviiiik'
    },
    {
      name: 'Yash Tolani(2347165)',
      role: 'Database Designer',
      image: 'yash.jpg',
      linkedin: 'https://www.linkedin.com/in/yash-tolani08',
      github: 'https://github.com/Yasht08'
    }
  ];

  return (
    <div className="about-us-page">
      <div className="music-background"></div>
      <button className="back-btn" onClick={() => navigate('/')}>🢀</button>
      <div className="about-us-container">
        <h2>About Us</h2>
        <p>This project is a music generation platform that allows users to create and customize their own music tracks.</p>
        <div className="team-section">
          {teamMembers.map((member) => (
            <div className="team-member" key={member.name}>
              <div className="image-container">
                <img src={member.image} alt={member.name} className="team-image" />
                <div className="overlay">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;