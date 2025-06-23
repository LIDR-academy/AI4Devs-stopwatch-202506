import React from 'react';
import Stopwatch from './features/stopwatch/Stopwatch';
import Countdown from './features/countdown/Countdown';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center">
        {t('title')}
      </h1>
      <Stopwatch />
      <Countdown />
    </div>
  );
}