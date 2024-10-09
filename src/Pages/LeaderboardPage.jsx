import React, { useEffect, useState } from 'react';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch quiz responses from local storage
    const quizResponses = JSON.parse(localStorage.getItem('quizResponses')) || [];

    console.log("quizResponses-->", quizResponses);

    // Ensure that quizResponses is an array
    if (!Array.isArray(quizResponses)) {
      console.error("Quiz responses are not in the expected format.");
      return;
    }

    // Create a map to track scores and details
    const scoresMap = new Map();

    // Calculate scores and aggregate responses
    quizResponses.forEach(({ email, responses }) => {
      const correctAnswersCount = responses.filter(
        (r) => r.selectedAnswer === r.correctAnswer
      ).length;

      const incorrectAnswersCount = responses.length - correctAnswersCount;

      if (scoresMap.has(email)) {
        // Update existing user score
        const userScore = scoresMap.get(email);
        userScore.score += correctAnswersCount; // Update score
        userScore.correctAnswers += correctAnswersCount; // Update correct answers count
        userScore.incorrectAnswers += incorrectAnswersCount; // Update incorrect answers count
        userScore.responses.push(...responses); // Append responses
      } else {
        // Add new user
        scoresMap.set(email, {
          name: email,
          score: correctAnswersCount,
          correctAnswers: correctAnswersCount,
          incorrectAnswers: incorrectAnswersCount,
          responses: [...responses],
        });
      }
    });

    // Convert the map to an array and sort by score
    const sortedScores = Array.from(scoresMap.values()).sort((a, b) => b.score - a.score);
    setLeaderboard(sortedScores);
  }, []);

  return (
    <div className="leaderboard-page bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-semibold mb-6">Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-left">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Player</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Correct Answers</th>
              <th className="py-3 px-4">Incorrect Answers</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{player.name}</td>
                <td className="py-2 px-4 text-blue-600">{player.score}</td>
                <td className="py-2 px-4 text-green-600">{player.correctAnswers}</td>
                <td className="py-2 px-4 text-red-600">{player.incorrectAnswers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-lg text-gray-600">No scores available yet.</p>
      )}
    </div>
  );
};

export default LeaderboardPage;
