import React from 'react';
import Card from './Card';
import { useGameState } from '@/hooks/useGameState';
import CompletionModal from './ComplettionModal';

const GameBoard = () => {
  const { cards, clicks, selectedCards, handleClick, shuffleCards, disabled, newBestScore, bestScore, isGameCompleted, modalOpen, setModalOpen } =
    useGameState();

  if (modalOpen) {
    return (
      <CompletionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} score={clicks} newBestScore={newBestScore} bestScore={bestScore} />
    );
  }
  return (
    <>
      <header>
        <div className='flex justify-end gap-2'>
          <p className='text-sm'>Clicks: {clicks}</p>
          {<p className='text-sm'>Best: {bestScore ?? 'n/a'}</p>}
        </div>
      </header>
      <h1 className='text-xl font-semibold my-1 text-center'>Memory Matching Game</h1>
      <div className='flex flex-col items-center'>
        <h2 className='font-semibold'>Instructions</h2>
        <ul className='text-center'>
          <li>Click on card to reveal image</li>
          <li>Only 2 cards can be flipped at a time</li>
          <p>Match all card pairs to complete the game</p>
        </ul>
      </div>

      <section className='flex flex-col items-center'>
        <div className='flex flex-wrap justify-center md:grid md:grid-cols-4 gap-3 mt-4'>
          {cards.map((card, i) => (
            <Card
              key={card.id}
              card={card}
              flipped={card.matched || selectedCards.includes(card)}
              onClick={() => !disabled && handleClick(card)}
              disabled={disabled}
              index={i}
            />
          ))}
        </div>
        <button
          onClick={shuffleCards}
          className='mt-4 text-foreground border border-foreground hover:text-background hover:bg-foreground py-2 px-4 rounded'>
          Restart Game
        </button>
      </section>
    </>
  );
};

export default GameBoard;
