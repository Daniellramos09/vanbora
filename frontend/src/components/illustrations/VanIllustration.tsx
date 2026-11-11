import React from 'react';

export const VanIllustration: React.FC<{ className?: string }> = ({ className = 'w-64 h-48' }) => {
  return (
    <svg className={className} viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft shadow */}
      <ellipse cx="160" cy="182" rx="125" ry="10" fill="#E2E8F0" />
      
      {/* Van Body */}
      <path
        d="M50 145V85C50 68 64 54 81 54H195C205 54 214 59 220 67L248 102C253 108 256 116 256 124V145C256 150 252 154 247 154H59C54 154 50 150 50 145Z"
        fill="#3478F6"
      />
      {/* Van Roof Rack / Top highlight */}
      <rect x="75" y="46" width="115" height="6" rx="3" fill="#1F3F75" />
      <rect x="90" y="42" width="6" height="6" fill="#1F3F75" />
      <rect x="165" y="42" width="6" height="6" fill="#1F3F75" />

      {/* Van Windows */}
      {/* Front Windshield */}
      <path
        d="M205 66L232 98H195V66H205Z"
        fill="#EBF2FE"
      />
      {/* Passenger Window 1 */}
      <rect x="140" y="66" width="46" height="32" rx="4" fill="#EBF2FE" />
      {/* Passenger Window 2 */}
      <rect x="85" y="66" width="46" height="32" rx="4" fill="#EBF2FE" />

      {/* Friendly Eye / Smile in Front Windshield (Skeelo touch) */}
      <circle cx="218" cy="82" r="3" fill="#1F3F75" />

      {/* Decorative Side Stripe */}
      <path d="M50 115H254V124H50V115Z" fill="#F5C45E" />

      {/* Headlight */}
      <path d="M251 126H257C259 126 260 128 260 130V138C260 140 259 142 257 142H251V126Z" fill="#F5C45E" />
      <path d="M260 128L285 120V148L260 140V128Z" fill="#FEF9ED" opacity="0.6" />

      {/* Taillight */}
      <rect x="48" y="126" width="4" height="14" rx="2" fill="#F43F5E" />

      {/* Door handle */}
      <rect x="180" y="128" width="12" height="3" rx="1.5" fill="#1F3F75" />

      {/* Front Bumper */}
      <rect x="245" y="146" width="18" height="8" rx="4" fill="#1F3F75" />
      <rect x="44" y="146" width="14" height="8" rx="4" fill="#1F3F75" />

      {/* Wheels */}
      {/* Rear Wheel Arch */}
      <path d="M80 154C80 140 92 129 106 129C120 129 132 140 132 154H80Z" fill="#1F3F75" opacity="0.15" />
      {/* Front Wheel Arch */}
      <path d="M192 154C192 140 204 129 218 129C232 129 244 140 244 154H192Z" fill="#1F3F75" opacity="0.15" />

      {/* Rear Wheel */}
      <circle cx="106" cy="154" r="22" fill="#1F3F75" />
      <circle cx="106" cy="154" r="13" fill="#F7F8FA" />
      <circle cx="106" cy="154" r="6" fill="#38A879" />

      {/* Front Wheel */}
      <circle cx="218" cy="154" r="22" fill="#1F3F75" />
      <circle cx="218" cy="154" r="13" fill="#F7F8FA" />
      <circle cx="218" cy="154" r="6" fill="#38A879" />
    </svg>
  );
};
