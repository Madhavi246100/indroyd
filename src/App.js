// App.js
import React, { useEffect, useState } from 'react';
import WelcomePage from './Pages/WelcomePage';
import QuizPage from './Pages/QuizPage';
import LeaderboardPage from './Pages/LeaderboardPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserEmailPage from './Pages/UserEmailPage';
import {questions} from './data/data'
import Header from './components/Header'; // Import the Header component

function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const gameId = Date.now().toString();

  useEffect(() => {
    // Check if questions are already stored in localStorage
    const storedQuestions = localStorage.getItem('questions');
    if (!storedQuestions) {
      // If not, save the questions to localStorage
      localStorage.setItem('questions', JSON.stringify(questions));
      console.log('Questions saved to localStorage');
    } else {
      console.log('Questions already exist in localStorage');
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header /> {/* Include the Header component */}
        <Routes>
          <Route path="/" element={<WelcomePage gameId={gameId} />} />
          <Route path="/register" element={<UserEmailPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage leaderboard={leaderboard} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
