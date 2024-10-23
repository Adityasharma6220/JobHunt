

import React from 'react';
import Navbar from './shared/Navbar';

const GameEmbeded = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 overflow-hidden">
        <iframe
          src="https://play.rosebud.ai/games/ee5e3ee1-eb52-4476-a3d0-38d3c3664a3e"
          className="w-full h-full rounded-lg shadow-lg overflow-hidden"
          frameBorder="0"
          allowFullScreen
          title="Embedded Game"
          scrolling="no" 
        ></iframe>
      </div>
    </div>
  );
};

export default GameEmbeded;
