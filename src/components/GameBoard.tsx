import React from 'react';
import { enqueueSnackbar } from 'notistack';

import { useGameState } from '@/hooks/useGameState';

import Card from './Card';
import CompletionModal from './ComplettionModal';

const GameBoard = () => {
  const {
    cards,
    clicks,
    selectedCards,
    handleClick,
    shuffleCards,
    disabled,
    newBestScore,
    bestScore,
    modalOpen,
    setModalOpen,
  } = useGameState();

  if (modalOpen) {
    return (
      <CompletionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        score={clicks}
        newBestScore={newBestScore}
        bestScore={bestScore}
      />
    );
  }

  function handleShuffle() {
    enqueueSnackbar('Cards Reshuffled');
    shuffleCards();
  }
  return (
    <>
      <header>
        <div className="flex justify-end gap-2">
          <p className="text-sm">Clicks: {clicks}</p>
          {<p className="text-sm">Best: {bestScore ?? 'n/a'}</p>}
        </div>
      </header>
      <h1 className="my-1 text-center text-xl font-semibold">
        Memory Matching Game
      </h1>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold">Instructions</h2>
        <ul className="text-center">
          <li>Click on card to reveal image</li>
          <li>Only 2 cards can be flipped at a time</li>
          <p>Match all card pairs to complete the game</p>
        </ul>
      </div>

      <section className="flex flex-col items-center" aria-label="card grid">
        <div className="mt-4 flex flex-wrap justify-center gap-3 md:grid md:grid-cols-4">
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
          onClick={handleShuffle}
          className="mt-4 rounded border border-foreground px-4 py-2 text-foreground hover:bg-foreground hover:text-background"
        >
          Restart Game
        </button>
      </section>
    </>
  );
};

export default GameBoard;
