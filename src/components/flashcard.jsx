import React, { useState, useEffect } from 'react';

const Flashcard = ({
  card,
  onNextCard,
  onPrevCard,
  onShuffle,
  onCorrectGuess,
  onIncorrectGuess,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setUserGuess('');
    setFeedback('');
    onNextCard();
  };

  const handlePrev = () => {
    setUserGuess('');
    setFeedback('');
    onPrevCard();
  };

  const handleGuessSubmit = () => {
    if (userGuess.toLowerCase() === card.answer.toLowerCase()) {
      setFeedback('Correct!');
      onCorrectGuess(); // Notify parent component about the correct guess
    } else {
      setFeedback('Incorrect. Try again.');
      onIncorrectGuess(); // Notify parent component about the incorrect guess
    }
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const getColorByDifficulty = () => {
    switch (card.difficulty) {
      case 'easy':
        return 'lightgreen';
      case 'medium':
        return 'lightgoldenrodyellow';
      case 'hard':
        return 'lightcoral';
      default:
        return 'white';
    }
  };

  useEffect(() => {
    setIsFlipped(false); // Reset flip state when a new card is displayed
  }, [card]);

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flashcard-content" style={{ backgroundColor: getColorByDifficulty() }}>
        <div className="flashcard-front">
          <h2>{card.question}</h2>
        </div>
        <div className="flashcard-back">
          <p>{card.answer}</p>
        </div>
      </div>
      <div className="interaction-container">
        <input
          type="text"
          placeholder="Your guess"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          onClick={stopPropagation}
        />
        <button onClick={(e) => { e.stopPropagation(); handleGuessSubmit(); }}>Submit</button>
        <p>{feedback}</p>
      </div>
      <div className="button-container">
        <button className="prev-button" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
          Prev
        </button>
        <button className="next-button" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
          Next
        </button>
        <button className="shuffle-button" onClick={(e) => { e.stopPropagation(); onShuffle(); }}>
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
