import React from 'react';
import yt from '../assets/yt.png';
import discord from '../assets/discord.png';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const Networking = () => {
  return ( 
    <div>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Connect with Us</h1>
      <p className="text-lg text-center mb-8 text-gray-700">
        Explore our channels for valuable content, updates, and community discussions!
      </p>
      <div className="flex justify-between w-full max-w-4xl">
        {/* YouTube Card */}
        <div className="bg-white rounded-lg shadow-lg w-1/2 flex flex-col items-center overflow-hidden">
          <a href="https://www.youtube.com/@CareerConnect-PS04" target="_blank" rel="noopener noreferrer" className="w-full h-full">
            <img 
              src={yt} 
              alt="YouTube Channel" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
            />
          </a>
          <p className="text-lg font-semibold mt-2">YouTube</p>
        </div>

        {/* Discord Card */}
        <div className="bg-white rounded-lg shadow-lg w-1/2 flex flex-col items-center overflow-hidden">
          <a href="https://discord.gg/uRwKpZStZF" target="_blank" rel="noopener noreferrer" className="w-full h-full">
            <img 
              src={discord} 
              alt="Discord Channel" 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
            />
          </a>
          <p className="text-lg font-semibold mt-2">Discord</p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Networking;
