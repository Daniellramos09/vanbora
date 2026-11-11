import React from 'react';

export const VanWithDriverIllustration: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-[420px] h-auto',
}) => {
  return (
    <svg
      viewBox="0 0 460 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Van executiva amigável com motorista credenciado em rota por São Paulo"
    >
      {/* Ground Road Shadow with Texture */}
      <ellipse cx="230" cy="254" rx="190" ry="14" fill="#E8E4DC" />
      <ellipse cx="230" cy="254" rx="140" ry="8" fill="#D4CEBF" opacity="0.6" />

      {/* Speed Dust Cartoon Puffs (Movement Narrative) */}
      <circle cx="50" cy="242" r="10" fill="#E8E4DC" />
      <circle cx="34" cy="246" r="6" fill="#E8E4DC" />
      <circle cx="64" cy="246" r="5" fill="#E8E4DC" />

      {/* Van Main Body Shell */}
      <path
        d="M60 205V105C60 85 75 70 95 70H285C300 70 315 78 325 90L375 145C383 154 388 165 388 178V205C388 214 380 220 370 220H78C68 220 60 214 60 205Z"
        fill="#2764E8"
        stroke="#142544"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Van Roof Luggage Rack */}
      <rect x="100" y="58" width="170" height="8" rx="4" fill="#142544" />
      <line x1="120" y1="66" x2="120" y2="70" stroke="#142544" strokeWidth="4" />
      <line x1="185" y1="66" x2="185" y2="70" stroke="#142544" strokeWidth="4" />
      <line x1="250" y1="66" x2="250" y2="70" stroke="#142544" strokeWidth="4" />

      {/* Cartoon Luggage on Roof (Ready for Airport or Excursion) */}
      <rect x="130" y="44" width="45" height="14" rx="3" fill="#F5A623" stroke="#142544" strokeWidth="2.5" />
      <rect x="180" y="40" width="55" height="18" rx="4" fill="#15803D" stroke="#142544" strokeWidth="2.5" />
      <line x1="152" y1="44" x2="152" y2="58" stroke="#142544" strokeWidth="2" />
      <line x1="205" y1="40" x2="205" y2="58" stroke="#142544" strokeWidth="2" />

      {/* Windows with Tint & Inner Characters */}
      {/* Front Windshield with Driver Character */}
      <path
        d="M295 85L355 142H280V85H295Z"
        fill="#EBF2FE"
        stroke="#142544"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* The Driver Character (Cap, Smile, Hands on Wheel) */}
      <circle cx="312" cy="116" r="13" fill="#FCE7D0" stroke="#142544" strokeWidth="2.5" />
      {/* Cap */}
      <path d="M299 110C299 104 305 99 313 99C321 99 326 104 326 110H299Z" fill="#142544" />
      <path d="M312 108H332C334 108 335 110 334 112L330 114H312V108Z" fill="#142544" />
      {/* Eyes & Smile */}
      <circle cx="319" cy="114" r="2" fill="#142544" />
      <path d="M316 122C318 124 322 124 324 122" stroke="#142544" strokeWidth="1.75" strokeLinecap="round" />
      {/* Uniform Shirt */}
      <path d="M302 129C304 126 308 125 315 125C322 125 326 126 328 129V142H302V129Z" fill="#2764E8" stroke="#142544" strokeWidth="2" />
      {/* Steering wheel */}
      <circle cx="338" cy="132" r="10" stroke="#142544" strokeWidth="3" fill="none" />

      {/* Passenger Window 1 with Happy Passenger */}
      <rect x="195" y="85" width="70" height="48" rx="6" fill="#EBF2FE" stroke="#142544" strokeWidth="3" />
      {/* Passenger 1 (Headphone listener heading to event) */}
      <circle cx="230" cy="112" r="12" fill="#FED7AA" stroke="#142544" strokeWidth="2" />
      <path d="M218 108C218 102 223 97 230 97C237 97 242 102 242 108" stroke="#F5A623" strokeWidth="3.5" fill="none" />
      <circle cx="218" cy="110" r="3.5" fill="#F5A623" />
      <circle cx="242" cy="110" r="3.5" fill="#F5A623" />
      <circle cx="233" cy="111" r="1.5" fill="#142544" />
      <path d="M228 117C230 119 233 119 235 117" stroke="#142544" strokeWidth="1.5" strokeLinecap="round" />

      {/* Passenger Window 2 with Passenger with coffee / smiling */}
      <rect x="110" y="85" width="70" height="48" rx="6" fill="#EBF2FE" stroke="#142544" strokeWidth="3" />
      <circle cx="145" cy="112" r="12" fill="#E2E8F0" stroke="#142544" strokeWidth="2" />
      <circle cx="148" cy="111" r="1.5" fill="#142544" />
      <path d="M142 117C145 119 148 119 151 117" stroke="#142544" strokeWidth="1.5" strokeLinecap="round" />

      {/* Vibrant "Faixa Amarela Paulistana" Accent Stripe */}
      <path d="M60 152H386V170H60V152Z" fill="#F5A623" stroke="#142544" strokeWidth="3" />
      <path d="M75 157H85V165H75V157Z" fill="#FFFFFF" />
      <path d="M95 157H105V165H95V157Z" fill="#FFFFFF" />
      <path d="M115 157H125V165H115V157Z" fill="#FFFFFF" />
      <path d="M135 157H145V165H135V157Z" fill="#FFFFFF" />
      <path d="M155 157H165V165H155V157Z" fill="#FFFFFF" />

      {/* Headlights & Light Beam */}
      <path
        d="M380 172H395C398 172 400 175 400 178V192C400 195 398 198 395 198H380V172Z"
        fill="#F5A623"
        stroke="#142544"
        strokeWidth="3"
      />
      <polygon points="400,175 450,158 450,215 400,195" fill="#FEF7E6" opacity="0.45" />

      {/* Taillights */}
      <rect x="54" y="170" width="6" height="24" rx="2" fill="#E11D48" stroke="#142544" strokeWidth="2" />

      {/* Front & Rear Bumpers */}
      <rect x="376" y="206" width="22" height="14" rx="6" fill="#142544" />
      <rect x="52" y="206" width="16" height="14" rx="6" fill="#142544" />

      {/* Wheels with 3D Depth & Expressive Rims */}
      {/* Rear Wheel Arch */}
      <path d="M100 220C100 198 118 180 140 180C162 180 180 198 180 220H100Z" fill="#142544" />
      {/* Front Wheel Arch */}
      <path d="M280 220C280 198 298 180 320 180C342 180 360 198 360 220H280Z" fill="#142544" />

      {/* Rear Wheel */}
      <circle cx="140" cy="220" r="32" fill="#142544" />
      <circle cx="140" cy="220" r="20" fill="#FAF8F5" stroke="#142544" strokeWidth="3" />
      <circle cx="140" cy="220" r="9" fill="#F5A623" stroke="#142544" strokeWidth="2" />

      {/* Front Wheel */}
      <circle cx="320" cy="220" r="32" fill="#142544" />
      <circle cx="320" cy="220" r="20" fill="#FAF8F5" stroke="#142544" strokeWidth="3" />
      <circle cx="320" cy="220" r="9" fill="#F5A623" stroke="#142544" strokeWidth="2" />

      {/* Door Handle */}
      <rect x="268" y="174" width="16" height="4" rx="2" fill="#142544" />

      {/* Side Mirror */}
      <rect x="360" y="142" width="12" height="18" rx="4" fill="#142544" />
    </svg>
  );
};
