import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Track selected answers for all questions
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem('email'); // Get email from session storage

  // Fetch questions from localStorage
  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
      setLoading(false);
    } else {
      console.error('No questions found in localStorage');
      setLoading(false);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, [currentIndex]);

  const handleOptionClick = (option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentIndex]: option, // Save the selected answer for the current question
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTimer(30);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setTimer(30);
    }
  };

  const handleSubmitQuiz = () => {
    const responses = Object.keys(answers).map((index) => ({
      questionId: questions[index].id,
      question: questions[index].question,
      selectedAnswer: answers[index],
      correctAnswer: questions[index].answer,
    }));

    const quizData = {
      email: userEmail,
      responses,
    };

    // Check if quiz responses already exist in local storage
    const existingQuizResponses = JSON.parse(localStorage.getItem('quizResponses')) || [];

    if (existingQuizResponses.length > 0) {
      // If responses already exist, update the response for this user
      const updatedResponses = existingQuizResponses.filter(response => response.email !== userEmail);
      updatedResponses.push(quizData); // Add the new or updated response
      localStorage.setItem('quizResponses', JSON.stringify(updatedResponses));
    } else {
      // If no responses exist, initialize with the first entry
      localStorage.setItem('quizResponses', JSON.stringify([quizData]));
    }

    // Navigate to a new page (for example, to the results or leaderboard page)
    navigate('/leaderboard');
  };

  // Render a loader while questions are loading
  if (loading) {
    return (
      <div className="quiz-page bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="loader text-2xl font-semibold text-blue-600">
          Loading questions...
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl lg:w-4/5 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {questions[currentIndex]?.question}
        </h2>
        <div className="options grid grid-cols-1 gap-4 mb-6">
          {questions[currentIndex]?.options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`option-button p-4 text-lg font-medium border rounded-lg transition 
                ${answers[currentIndex] === option ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="text-center text-lg text-gray-700 mb-4">
          Time left: <span className="font-bold text-red-500">{timer}</span> seconds
        </p>
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold transition hover:bg-gray-600"
          >
            Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold transition hover:bg-green-600"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!answers[currentIndex]} // Disable Next if no answer selected
              className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold transition hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
