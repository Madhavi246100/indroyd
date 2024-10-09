// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to the Welcome page
    navigate('/');
  };

  const handleHome = () => {
    // Redirect to User Email Page
    navigate('/register');
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Quiz App</h1>
      <div>
        <button
          onClick={handleHome}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-4"
        >
          Home
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
