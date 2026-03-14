import React from 'react';

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className = '', shimmerWidth = 100 }) => {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:200%_100%] animate-shimmer ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 1) 55%, rgba(255, 255, 255, 0.4))`,
        backgroundSize: `${shimmerWidth * 2}% 100%`,
      }}
    >
      {text}
    </span>
  );
};
