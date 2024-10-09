import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const WelcomePage = ({ gameId }) => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/register'); // Navigate to the quiz page
  };

  return (
    <div className="w-full border p-2 flex justify-center items-center min-h-screen bg-gradient-to-r from-cyan-400 to-blue-600">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-5 text-gray-800">Welcome to the KBC-style Game!</h1>
        <QRCodeCanvas value={`/register`} className="mx-auto mb-4" />
        <p className="text-lg text-gray-600 mb-4">Scan to join the game!</p>
        <button
          onClick={handleStartGame}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500 transition duration-300"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
