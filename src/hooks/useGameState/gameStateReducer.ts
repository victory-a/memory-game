interface Card {
  id: string;
  src: string;
  matched: boolean;
}

interface GameState {
  cards: Card[];
  clicks: number;
  selectedCards: Card[];
  disabled: boolean;
}

type Action =
  | { type: 'SHUFFLE_CARDS'; payload: Card[] }
  | { type: 'SELECT_CARD'; payload: Card }
  | { type: 'MATCH_CARDS' }
  | { type: 'CLOSE_CARDS' };

const initialState: GameState = {
  cards: [],
  clicks: 0,
  selectedCards: [],
  disabled: false,
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SHUFFLE_CARDS':
      return {
        ...initialState,
        cards: action.payload,
        clicks: 0,
        selectedCards: [],
      };
    case 'SELECT_CARD':
      return {
        ...state,
        selectedCards: [...state.selectedCards, action.payload],
        disabled: state.selectedCards.length === 1, // Disable if 2 cards are selected
        clicks: state.clicks + 1,
      };
    case 'MATCH_CARDS':
      return {
        ...state,
        cards: state.cards.map((card) =>
          state.selectedCards.some((selected) => selected.src === card.src)
            ? { ...card, matched: true }
            : card
        ),
        selectedCards: [],
        disabled: false,
      };
    case 'CLOSE_CARDS':
      return { ...state, selectedCards: [], disabled: false };
    default:
      return state;
  }
}

export { gameReducer, initialState, type Card, type GameState, type Action };
