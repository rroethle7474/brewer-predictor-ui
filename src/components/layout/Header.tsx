'use client';
import React, { useState } from "react";
import MessageModal from '../modals/MessageModal';

// TODO: Replace this with actual Brewers logo when available
const brewersLogo = (
  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-md border-4 border-yellow-600">
    <span className="text-2xl font-bold text-blue-900">B</span>
  </div>
);

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
    <header
      className="w-full bg-gradient-to-r from-blue-900 to-yellow-600 py-4 shadow-lg relative"
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 20px)',
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center px-4 md:flex-row md:justify-between">
        <div className="flex items-center space-x-4">
          {brewersLogo}
          <span className="ml-2 text-2xl md:text-3xl font-extrabold text-yellow-400 drop-shadow-sm tracking-wide">
            Brewers Prediction Game
          </span>
        </div>
        <button
          onClick={openModal}
          className="bg-brewers-gold hover:bg-brewers-gold/90 text-brewers-navy font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Send Message
        </button>
      </div>
    </header>
    <MessageModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Header;