import React, { useState } from 'react';
import Flashcard from './components/flashcard';
import './App.css';

const cardPairs = [
  { question: 'What is the capital of France?', answer: 'Paris', difficulty: 'easy' },
  { question: 'How many continents are there?', answer: '7', difficulty: 'easy' },
  { question: 'What is the largest mammal in the world?', answer: 'Blue Whale', difficulty: 'easy' },
  { question: 'Who wrote the play "Romeo and Juliet"?', answer: 'William Shakespeare', difficulty: 'medium' },
  { question: 'In which year did World War II end?', answer: '1945', difficulty: 'medium' },
  { question: 'What is the chemical symbol for gold?', answer: 'Au', difficulty: 'medium' },
  { question: 'Which planet is known as the Red Planet?', answer: 'Mars', difficulty: 'medium' },
  { question: 'What is the speed of light in a vacuum?', answer: '299,792 kilometers per second', difficulty: 'hard' },
  { question: 'Who developed the theory of relativity?', answer: 'Albert Einstein', difficulty: 'hard' },
  { question: 'In which year did the French Revolution begin?', answer: '1789', difficulty: 'hard' },
];

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleNextCard = () => {
    const nextIndex = (currentCardIndex + 1) % shuffledCards.length;
    setCurrentCardIndex(nextIndex);
    // Reset the current streak only if the user made an incorrect guess
    if (userGuess.toLowerCase() !== shuffledCards[currentCardIndex].answer.toLowerCase()) {
      setCurrentStreak(0);
    }
  };
  
  const handlePrevCard = () => {
    // Move to the previous card
    const prevIndex = (currentCardIndex - 1 + shuffledCards.length) % shuffledCards.length;
    setCurrentCardIndex(prevIndex);
    
    // Reset the current streak only if the user made an incorrect guess
    if (userGuess.toLowerCase() !== shuffledCards[currentCardIndex].answer.toLowerCase()) {
      setCurrentStreak(0);
    }
  };

  const handleShuffle = () => {
    setShuffledCards(shuffleArray(cardPairs));
    setCurrentCardIndex(0);
  };

  const handleStartGame = () => {
    setShuffledCards(shuffleArray(cardPairs));
    setCurrentCardIndex(0);
    setGameStarted(true);
  };

  const handleCorrectGuess = () => {
    setCurrentStreak(currentStreak + 1);
    setLongestStreak(Math.max(longestStreak, currentStreak + 1));
  };

  const handleIncorrectGuess = () => {
    setCurrentStreak(0); // Reset current streak on an incorrect guess
  };

  return (
    <div className="app-container">
      <h1>Trivia Test 🧠</h1>
      <h3>How much do you know? Test your knowledge!</h3>
      {gameStarted ? (
        <>
          <p>{`Number of cards: ${shuffledCards.length} cards`}</p>
          <p>{`Current Streak: ${currentStreak}`}</p>
          <p>{`Longest Streak: ${longestStreak}`}</p>
          <Flashcard
            card={shuffledCards[currentCardIndex]}
            onNextCard={() => {
              handleNextCard();
              handleIncorrectGuess();
            }}
            onPrevCard={() => {
              handlePrevCard();
              handleIncorrectGuess();
            }}
            onShuffle={handleShuffle}
            onCorrectGuess={handleCorrectGuess}
            onIncorrectGuess={handleIncorrectGuess}
          />
        </>
      ) : (
        <>
          <p>Click the button below to start the game!</p>
          <button className="start-button" onClick={handleStartGame}>
            Start Game
          </button>
        </>
      )}
    </div>
  );
};

export default App;
