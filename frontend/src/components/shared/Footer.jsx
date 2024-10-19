import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Career Connect</h2>
            <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="https://www.youtube.com/@CareerConnect-PS04" 
              className="hover:text-gray-400" 
              aria-label="YouTube"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
            </a>
            <a 
              href="https://discord.gg/DHzBzBXedA" 
              className="hover:text-gray-400" 
              aria-label="Discord"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faDiscord} className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
