// src/components/GameEmbeded.js

import React from 'react';
import Navbar from './shared/Navbar';

const GameEmbeded = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 overflow-hidden">
        <iframe
          src="https://play.rosebud.ai/games/fb42ce41-252c-4518-b6f7-7f280a312f40"
          className="w-full h-full rounded-lg shadow-lg overflow-hidden"
          frameBorder="0"
          allowFullScreen
          title="Embedded Game"
          scrolling="no"  // Disables iframe scrolling
        ></iframe>
      </div>
    </div>
  );
};

export default GameEmbeded;
