import React from 'react';
import { Dialog as ReachDialog } from '@reach/dialog';

import CancelIcon from '@/assets/CancelIcon';
import '@reach/dialog/styles.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  newBestScore: boolean;
  bestScore: number | null;
}

const CompletionModal = ({
  isOpen,
  onClose,
  bestScore,
  newBestScore,
  score,
}: ModalProps) => {
  return (
    <ReachDialog
      isOpen={isOpen}
      onDismiss={onClose}
      aria-labelledby="modal-title"
    >
      <div className="relative mx-auto w-full max-w-2xl bg-white py-20">
        <div className="absolute right-1 top-1">
          <button
            onClick={onClose}
            className="hover:bg-grey-700 relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] hover:opacity-70"
          >
            <CancelIcon />
          </button>
        </div>

        <section className="flex justify-center py-5">
          <div className="grid gap-2 text-background">
            <h3 className="text-lg font-bold">Game Completed</h3>
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
