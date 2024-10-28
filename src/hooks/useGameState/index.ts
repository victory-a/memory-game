import { useReducer, useEffect, useState } from 'react';
import { Card, gameReducer, initialState } from './gameStateReducer';

export function useGameState(uniquePairs: number = 8) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const [bestScore, setBestScore] = useState<number | null>(null);
  const [newBestScore, setNewBestScore] = useState(false);

  const isGameCompleted = Boolean(state.cards.length && state.cards.every((card) => card.matched));

  const shuffleCards = () => {
    const images = Array.from({ length: uniquePairs }).map((_, index) => `https://picsum.photos/200?random=${index}`);
    const cards = images.flatMap((image, index) => [
      { src: image, id: index * 2, matched: false },
      { src: image, id: index * 2 + 1, matched: false },
    ]);

    const shuffledCards = cards.sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
    dispatch({ type: 'SHUFFLE_CARDS', payload: shuffledCards });
    setNewBestScore(false);
  };

  const handleClick = (card: Card) => {
    if (state.selectedCards.length < 2) {
      dispatch({ type: 'SELECT_CARD', payload: card });
    }
  };

  useEffect(() => {
    let timeoutId: number | undefined;

    if (state.selectedCards.length === 2) {
      const [first, second] = state.selectedCards;
      if (first.src === second.src) {
        dispatch({ type: 'MATCH_CARDS' });
      } else {
        timeoutId = window.setTimeout(() => dispatch({ type: 'CLOSE_CARDS' }), 1000);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [state.selectedCards]);

  useEffect(() => {
    if (isGameCompleted) {
      if (bestScore === null || state.clicks < bestScore) {
        localStorage.setItem('bestScore', String(state.clicks));
        setBestScore(state.clicks);
        setNewBestScore(true);
      }
    }
  }, [isGameCompleted, state.clicks]);

  useEffect(() => {
    const storedBestScore = localStorage.getItem('bestScore');

    if (storedBestScore) {
      setBestScore(Number(storedBestScore));
    }

    shuffleCards();
  }, []);

  return {
    cards: state.cards,
    clicks: state.clicks,
    selectedCards: state.selectedCards,
    disabled: state.disabled,
    handleClick,
    shuffleCards,
    bestScore,
    newBestScore,
  };
}
