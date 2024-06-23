import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

const NumberGuessingGame = () => {
  const [generatedNumber, setGeneratedNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; // Generates a random number between 1 and 100
  }

  function handleInputChange(event) {
    setUserGuess(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const guess = parseInt(userGuess, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      alert('Please enter a valid number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === generatedNumber) {
      setFeedback(`Congratulations! You guessed the number ${generatedNumber} in ${attempts + 1} attempts.`);
      setGameEnded(true);
    } else if (guess < generatedNumber) {
      setFeedback('Too low! Try a higher number.');
    } else {
      setFeedback('Too high! Try a lower number.');
    }

    setUserGuess('');
  }

  function resetGame() {
    setGeneratedNumber(generateRandomNumber());
    setUserGuess('');
    setFeedback('');
    setAttempts(0);
    setGameEnded(false);
  }

  return (
    <>
      <div class="background">
        <div class="blob blob1"></div>
        <div class="blob blob2"></div>
      </div>
      <div className="number-guessing-game">
        <h1 id='heading'>Number Guessing Game</h1>
        {gameEnded ? (
          <div className="end-game-message">
            <p>{feedback}</p>
            <button className='guess-button' onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <label id='prompt'>
              Enter your guess (between 1 and 100):
              <input
                type="number"
                value={userGuess}
                onChange={handleInputChange}
                className="guess-input"
              />
            </label>
            <button type="submit" className="guess-button">Guess</button>
            <p className="feedback">{feedback}</p>
          </form>
        )}
      </div>
    </>
  );
};

export default NumberGuessingGame;
