
export const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
    options: ["London", "Berlin", "Paris", "Madrid"]
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
    options: ["Venus", "Mars", "Jupiter", "Saturn"]
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"]
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    answer: "Pacific Ocean",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"]
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    answer: "Au",
    options: ["Ag", "Fe", "Au", "Cu"]
  }
];


export const GAME_STATES = {
  LOBBY: 'lobby',
  PLAYING: 'playing',
  ROUND_END: 'round_end',
  GAME_END: 'game_end'
};