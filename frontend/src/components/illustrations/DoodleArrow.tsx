import React from 'react';

export const DoodleArrow: React.FC<{ className?: string }> = ({
  className = 'w-16 h-12 text-brand-yellow',
}) => {
  return (
    <svg
      viewBox="0 0 68 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 36C18 38 38 32 50 18C54 13 58 7 60 4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M47 3L61 4L63 17"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
