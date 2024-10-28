import React from 'react';
import Image from 'next/image';
import { Card } from '@/hooks/useGameState/gameStateReducer';

interface CardProps {
  card: Card;
  flipped: boolean;
  disabled: boolean;
  onClick: () => void;
}

const Card = ({ card, flipped, disabled, onClick }: CardProps) => {
  return (
    <div className='relative w-full h-full'>
      <div>
        <Image
          width={150}
          height={150}
          className={`backface-hidden absolute w-full h-full rounded-md  transform transition-all duration-200 ease-in 
            ${flipped ? 'rotate-y-0 delay-200' : 'rotate-y-90'}
           `}
          src={card.src}
          alt='card front'
        />

        <div
          className={`backface-hidden w-[150px] h-[150px] rounded-md bg-[#1d1d1d] transform transition-transform duration-200 ease-in delay-200 ${
            flipped ? 'rotate-y-90' : 'rotate-y-0'
          } ${disabled ? '' : 'cursor-pointer'}`}
          aria-label='card cover'
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Card;
