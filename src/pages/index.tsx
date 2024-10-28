import React from 'react';
import localFont from 'next/font/local';

import GameBoard from '../components/GameBoard';
import { clsMerge } from '@/utils/classname-merge';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const Home = () => {
  return (
    <div className={clsMerge(geistSans.variable, geistMono.variable)}>
      <main className='min-h-screen p-4'>
        <GameBoard />
      </main>
    </div>
  );
};

export default Home;
