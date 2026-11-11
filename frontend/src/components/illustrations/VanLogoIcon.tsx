import React from 'react';

export const VanLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Passenger Van Body Outline */}
      <path
        d="M2 15V8C2 6.9 2.9 6 4 6H15C15.8 6 16.5 6.4 16.9 7.1L19.8 11.2C20.6 12 21 13 21 14.1V15C21 15.6 20.6 16 20 16H19.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Underside lines */}
      <path
        d="M2 16H4.5M9.5 16H15M20 16H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Rear Wheel */}
      <circle cx="7" cy="16" r="2.5" stroke="currentColor" strokeWidth="2" fill="currentColor" />
      {/* Front Wheel */}
      <circle cx="17.5" cy="16" r="2.5" stroke="currentColor" strokeWidth="2" fill="currentColor" />
      {/* Passenger Window 1 */}
      <rect x="4.5" y="8" width="4" height="3.5" rx="0.75" stroke="currentColor" strokeWidth="1.5" />
      {/* Passenger Window 2 */}
      <rect x="10" y="8" width="4" height="3.5" rx="0.75" stroke="currentColor" strokeWidth="1.5" />
      {/* Front Windshield */}
      <path
        d="M15.5 8H16.4C16.8 8 17.1 8.2 17.3 8.5L19.2 11.5H15.5V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
