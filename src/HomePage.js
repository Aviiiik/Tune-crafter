import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage({ onLogout }) {
    const tilesRef = useRef(null);
    const navigate = useNavigate();
    const [playingTrack, setPlayingTrack] = useState(null);
    const trackRefs = useRef([]);

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

    const handleGetStarted = () => {
        tilesRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    const handleLaunch = () => {
        navigate('/launch');
    };

    const handleAboutUs = () => {
        navigate('/about');
    };

    const handleContact = () => {
        navigate('/contact');
    };

    const handlePlayTrack = (trackId) => {
        if (playingTrack === trackId) {
            trackRefs.current[trackId - 1].pause();
            trackRefs.current[trackId - 1].currentTime = 0;
            setPlayingTrack(null);
            console.log(`Stopped playing track ${trackId}`);
        } else {
            if (playingTrack !== null) {
                trackRefs.current[playingTrack - 1].pause();
                trackRefs.current[playingTrack - 1].currentTime = 0;
            }
            trackRefs.current[trackId - 1].play();
            setPlayingTrack(trackId);
            console.log(`Now playing track ${trackId}`);
        }
    };

    const tracks = [
        { id: 1, title: 'Track 1', artist: 'Upbeat Music Pop', src: 'track1.wav' },
        { id: 2, title: 'Track 2', artist: 'Upbeat Nusic Classical', src: 'track2.wav' },
        { id: 3, title: 'Track 3', artist: 'Classical EDM with drums', src: 'track3.wav' },
    ];

    return (
        <div className="home-page">
            <div className="music-background"></div>
            <div className="top-right">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="center">
                <div className="content-wrapper">
                    <div className="image-container">
                        <img src="tune.png" alt="Top Image" className="top-image" />
                    </div>
                    <div className="button-group">
                        <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
                        <button className="about-us-btn" onClick={handleAboutUs}>About Us</button>
                        <button className="contact-btn" onClick={handleContact}>Contact</button>
                    </div>
                </div>
            </div>
            <div className="tiles-section" ref={tilesRef}>
                {tracks.map((track, index) => (
                    <div key={track.id} className="music-tile">
                        <div className="tile-content">
                            <h3>{track.title}</h3>
                            <p>{track.artist}</p>
                        </div>
                        <audio ref={(ref) => (trackRefs.current[index] = ref)} src={track.src} />
                        <button 
                            className="play-button" 
                            onClick={() => handlePlayTrack(track.id)}
                        >
                            <PlayCircle size={48} color={playingTrack === track.id ? "#1DB954" : "white"} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="launch-container">
                <button className="launch-btn" onClick={handleLaunch}>Launch</button>
            </div>
        </div>
    );
}

export default HomePage;