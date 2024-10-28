import { useReducer, useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { Card, gameReducer, initialState } from './gameStateReducer';

export function useGameState(uniquePairs: number = 8) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const [modalOpen, setModalOpen] = useState(false);

  const [bestScore, setBestScore] = useState<number | null>(null);
  const [newBestScore, setNewBestScore] = useState(false);

  const isGameCompleted = Boolean(
    state.cards.length && state.cards.every((card) => card.matched)
  );

  const shuffleCards = () => {
    // generate 2 unique pairs for each image with respect to the epecified initializer (uniquePairs)
    const images = Array.from({ length: uniquePairs }).map(
      (_, index) => `https://picsum.photos/200?random=${index}`
    );
    const cards = images.flatMap((image) => [
      { src: image, id: crypto.randomUUID(), matched: false },
      { src: image, id: crypto.randomUUID(), matched: false },
    ]);

    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    dispatch({ type: 'SHUFFLE_CARDS', payload: shuffledCards });
    setNewBestScore(false);
  };

  const handleClick = (card: Card) => {
    if (state.selectedCards.length < 2) {
      dispatch({ type: 'SELECT_CARD', payload: card });
      enqueueSnackbar('Card Flipped');
    }
  };

  // Register match if both selected cards have the same src attribute or unselect the cards 1000ms no match is found
  useEffect(() => {
    let timeoutId: number | undefined;

    if (state.selectedCards.length === 2) {
      const [first, second] = state.selectedCards;
      if (first.src === second.src) {
        dispatch({ type: 'FOUND_MATCH' });
      } else {
        timeoutId = window.setTimeout(
          () => dispatch({ type: 'UNSELECT_CARDS' }),
          1000
        );
      }
    }

    return () => clearTimeout(timeoutId);
  }, [state.selectedCards]);

  // Trigger completed modal and set store clicks value if it's a  best score
  useEffect(() => {
    if (isGameCompleted) {
      setModalOpen(true);
      if (bestScore === null || bestScore === 0 || state.clicks < bestScore) {
        localStorage.setItem('bestScore', String(state.clicks));
        setBestScore(state.clicks);
        setNewBestScore(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameCompleted, state.clicks]);

  // Shuffle deck on intital mount and fetch current best score if any
  useEffect(() => {
    const storedBestScore = localStorage.getItem('bestScore');

    if (storedBestScore) {
      setBestScore(Number(storedBestScore));
    }

    shuffleCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    modalOpen,
    setModalOpen,
  };
}
