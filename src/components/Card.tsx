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

const CardComponent = ({
  card,
  flipped,
  disabled,
  onClick,
  index,
}: CardProps) => {
  return (
    <div
      style={{ '--index': index } as React.CSSProperties}
      className="card-animation relative h-full w-full max-w-[180px] md:max-w-[180px]"
    >
      <Image
        width={180}
        height={120}
        className={clsMerge(
          'backface-hidden absolute h-full w-full transform rounded-md transition-all duration-200 ease-in',
          flipped ? 'rotate-y-0 delay-200' : 'rotate-y-90'
        )}
        src={card.src}
        alt="card front"
      />

      <div
        className={clsMerge(
          'backface-hidden h-[120px] w-[180px] transform rounded-md bg-foreground transition-transform delay-200 duration-200 ease-in',
          flipped ? 'rotate-y-90' : 'rotate-y-0',
          disabled ? '' : 'cursor-pointer'
        )}
        aria-label="card cover"
        onClick={onClick}
      />
    </div>
  );
};

export default CardComponent;
