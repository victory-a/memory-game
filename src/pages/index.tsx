import React from 'react';
import GameBoard from '../components/GameBoard';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <GameBoard />
    </div>
  );
};

export default Home;