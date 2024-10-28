import { Dialog as ReachDialog } from '@reach/dialog';
import React from 'react';

import '@reach/dialog/styles.css';

import CancelIcon from '@/assets/CancelIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  newBestScore: boolean;
  bestScore: number | null;
}

const CompletionModal = ({ isOpen, onClose, bestScore, newBestScore, score }: ModalProps) => {
  return (
    <ReachDialog isOpen={isOpen} onDismiss={onClose} aria-labelledby='modal-title'>
      <div className='relative w-full max-w-2xl mx-auto py-20 bg-white'>
        <div className='absolute right-1 top-1'>
          <button
            onClick={onClose}
            className='hover:bg-grey-700 relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] hover:opacity-70'>
            <CancelIcon />
          </button>
        </div>

        <section className='flex py-5 justify-center'>
          <div className='grid gap-2 text-background'>
            <h3 className='font-bold text-lg'>Game Completed</h3>
            <p>Total Clicks: {score}</p>
            {newBestScore ? (
              <p>🎉 Congrats on setting a new best Score! 🎉</p>
            ) : (
              <p>
                Best score: {bestScore}, {''}Try again 😌
              </p>
            )}
          </div>
        </section>
      </div>
    </ReachDialog>
  );
};

export default CompletionModal;
