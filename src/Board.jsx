import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import './Board.css';

function Board({ level }) {
  const [cards, setCards] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    const cardCount = level === 'easy' ? 4 : level === 'medium' ? 8 : 12;

    const fetchCards = async () => {
      try {
        const response = await fetch(
          `https://last-airbender-api.fly.dev/api/v1/characters/random?count=${cardCount}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch cards');
        }

        const data = await response.json();
        const shuffled = shuffleCards(data);
        setCards(shuffled);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [level]);

  useEffect(() => {
    const cardCount = level === 'easy' ? 4 : level === 'medium' ? 8 : 12;
    if (highScore === cardCount) {
      alert('You win!'); // Log when highScore equals cardCount
    }
  }, [highScore, level]); // Check if the win condition is met

  function shuffleCards(cards) {
    return cards.sort(() => 0.5 - Math.random()); // Shuffle
  }

  function handleCardClick(card) {
    if (shuffling) {
      return; // Prevent clicking while shuffling
    }

    const cardCount = level === 'easy' ? 4 : level === 'medium' ? 8 : 12;

    if (pickedCards.some(pickedCard => pickedCard._id === card._id)) {
      setScore(0);
      setPickedCards([]);
      startShuffle();

      if (score > highScore) {
        setHighScore(score);
      }
    } else {
      const newScore = score + 1;
      setPickedCards([...pickedCards, card]);
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore); // Update highScore
      }

      startShuffle(); // Shuffle after a delay
    }
  }

  function startShuffle() {
    setShuffling(true); // Start shuffling
    setTimeout(() => {
      setShuffling(false); 
      setCards(shuffleCards(cards)); // Shuffle after 1 second
    }, 1000);
  }

  return (
    <div className="board">
        <div className='top'>
        <div className="score">Score: {score}</div>
        <div className='highscore'> High Score: {highScore}</div>
        </div>
      
      {cards.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          image={card.photoUrl}
          onClick={() => handleCardClick(card)}
          isFlipped={shuffling} 
        />
      ))}
    </div>
  );
}

export default Board;
