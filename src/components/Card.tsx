import React from 'react';
import Image from 'next/image';
import { Card } from '@/hooks/useGameState/gameStateReducer';
import { clsMerge } from '@/utils/classname-merge';

interface CardProps {
  card: Card;
  flipped: boolean;
  disabled: boolean;
  onClick: () => void;
  index: number;
}

const CardComponent = ({ card, flipped, disabled, onClick, index }: CardProps) => {
  return (
    <div style={{ '--index': index } as React.CSSProperties} className='card-animation relative w-full max-w-[180px] md:max-w-[180px] h-full'>
      <Image
        width={180}
        height={120}
        className={clsMerge(
          'backface-hidden absolute w-full h-full rounded-md  transform transition-all duration-200 ease-in',
          flipped ? 'rotate-y-0 delay-200' : 'rotate-y-90'
        )}
        src={card.src}
        alt='card front'
      />

      <div
        className={clsMerge(
          ' backface-hidden w-[180px] h-[120px] rounded-md bg-foreground transform transition-transform duration-200 ease-in delay-200',
          flipped ? 'rotate-y-90' : 'rotate-y-0',
          disabled ? '' : 'cursor-pointer'
        )}
        aria-label='card cover'
        onClick={onClick}
      />
    </div>
  );
};

export default CardComponent;
