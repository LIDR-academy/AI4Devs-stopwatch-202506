import React from 'react';
import clsx from 'clsx';

const variants = {
  green: 'bg-green-500 hover:bg-green-600',
  red: 'bg-red-600 hover:bg-red-700',
  yellow: 'bg-yellow-400 hover:bg-yellow-500',
};

export default function Button({ children, color = 'green', className = '', ...props }) {
  return (
    <button
      className={clsx(
        variants[color],
        'text-white text-xl md:text-3xl font-bold py-3 px-8 rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}