import React from 'react';
import Card from './Card';
import { useGameState } from '@/hooks/useGameState';

const GameBoard = () => {
  const { cards, clicks, selectedCards, handleClick, shuffleCards, disabled, bestScore, newBestScore } = useGameState();

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-xl font-semibold mb-2'>Memory Matching Game</h1>
      <p className='mb-2'>Clicks: {clicks}</p>
      {<div>{newBestScore ? <p>🎉 New Best Score! 🎉</p> : <p>Best Score: {bestScore}</p>}</div>}
      <div className='grid grid-cols-4 gap-2 mt-4'>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={card.matched || selectedCards.includes(card)}
            onClick={() => !disabled && handleClick(card)}
            disabled={disabled}
          />
        ))}
      </div>
      <button onClick={shuffleCards} className='mt-4 bg-black text-white py-2 px-4 rounded'>
        Restart Game
      </button>
    </div>
  );
};

export default GameBoard;
