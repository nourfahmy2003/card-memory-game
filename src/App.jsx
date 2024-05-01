import React, { useState } from 'react';
import Board from './Board.jsx';
import './App.css';

function App() {
  const [selectedLevel, setSelectedLevel] = useState('easy');
  const [startGame, setStartGame] = useState(false);

  const handleLevelSelection = (level) => {
    setSelectedLevel(level); // Change the selected level
  };

  const handleGameStart = () => {
    setStartGame(true); // Indicate that the game should start
  };

  return (
    <div className="app-container">
      <h1>3D Memory Card Game</h1>
      {!startGame ? (
        <div>
          <h2>Select Difficulty Level</h2>
          <div>
            <button onClick={() => handleLevelSelection('easy')}>Easy</button>
            <button onClick={() => handleLevelSelection('medium')}>Medium</button>
            <button onClick={() => handleLevelSelection('hard')}>Hard</button>
          </div>
          <p>Selected Level: {selectedLevel}</p> {/* Display the current level */}
          <button onClick={handleGameStart}>Start Game</button> {/* Submit button */}
        </div>
      ) : (
        <Board level={selectedLevel} /> 
      )}
    </div>
  );
}

export default App;
