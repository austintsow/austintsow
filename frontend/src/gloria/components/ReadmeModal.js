import React, { useEffect } from 'react';
import '../FinderBrowser.css';

const ReadmeModal = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="readme-overlay" onClick={onClose}>
      <div className="readme-modal" onClick={(e) => e.stopPropagation()}>
        <div className="readme-header">
          <div className="readme-title">README.md</div>
          <button className="readme-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="readme-content">
          <div className="readme-text">
            i knew you'd say yes!!!!! i hope that you've been doing well gloria i really miss you and im glad that i get to be your valentine (i'm truly the luckiest person in the world). you're the best in the world. the best in the world! not just the best girlfriend in the world, but the best in the world!!!!!! i love you for everything that you are. everyday, every time, i think or see you, my love for you grows stronger. wow i love you so much. the other day i heard a lyric and it really resonated with me. it said "my phone's been dead for a while - still, my eyes light up" and it made me think of you ahhhhh it made me so happy the song is so good i want you to listen to it when you get the chance. click on this link to listen to the song: <a href="https://open.spotify.com/track/2jOA97KGRClRY9c0yDoyK4?si=1d57b90811ca44de" target="_blank" rel="noopener noreferrer" className="song-link">MAGIC by Reuben Aziz</a>. anyways, i love you so much gloria and i'll never stop loving you. happy valentines day, or upcoming valentines whenever you open and read this. i love you ❤️
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadmeModal;
