import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = true }) => {
  return (
    <div className={`bg-gray-800 rounded-xl border border-gray-700 ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;