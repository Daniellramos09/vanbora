import React from 'react';

export const CityHorizonIllustration: React.FC<{ className?: string }> = ({
  className = 'w-full h-auto',
}) => {
  return (
    <svg
      viewBox="0 0 1200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Layer 1: Distant Hills (Serra da Cantareira & Mata Atlântica) */}
      <path
        d="M0 160C150 140 280 155 420 145C560 135 680 150 820 138C960 126 1090 142 1200 130V240H0V160Z"
        fill="#E8F8F0"
        opacity="0.8"
      />

      {/* Layer 2: Distant Urban Skyline (Towers & Buildings of Greater SP) */}
      {/* Tower 1 (Altino Arantes / Banespa Silhouette) */}
      <path d="M120 160V90H135V70H142V55H146V40H148V55H152V70H159V90H174V160H120Z" fill="#DCE5F2" />
      {/* Building Clusters */}
      <rect x="70" y="110" width="35" height="50" rx="2" fill="#DCE5F2" />
      <rect x="190" y="100" width="45" height="60" rx="2" fill="#DCE5F2" />
      <rect x="250" y="118" width="50" height="42" rx="2" fill="#DCE5F2" />

      {/* Paulista Antennas Silhouette (Center Left) */}
      <rect x="360" y="85" width="48" height="75" rx="3" fill="#DCE5F2" />
      {/* Giant Antenna Mast */}
      <line x1="384" y1="85" x2="384" y2="15" stroke="#16233B" strokeWidth="2.5" opacity="0.4" />
      <line x1="375" y1="35" x2="393" y2="35" stroke="#16233B" strokeWidth="2" opacity="0.4" />
      <line x1="371" y1="52" x2="397" y2="52" stroke="#16233B" strokeWidth="2" opacity="0.4" />
      <line x1="367" y1="70" x2="401" y2="70" stroke="#16233B" strokeWidth="2" opacity="0.4" />
      <circle cx="384" cy="15" r="3" fill="#E11D48" />

      {/* Cable-Stayed Bridge (Ponte Estaiada Octavio Frias - Center Right) */}
      {/* X Pylon */}
      <path
        d="M660 160L695 30H715L750 160H732L705 60L678 160H660Z"
        fill="#CBD5E1"
        stroke="#16233B"
        strokeWidth="1.5"
        opacity="0.65"
      />
      <path
        d="M750 160L715 30H695L660 160H678L705 60L732 160H750Z"
        fill="#CBD5E1"
        stroke="#16233B"
        strokeWidth="1.5"
        opacity="0.65"
      />
      {/* Cables */}
      <line x1="705" y1="50" x2="620" y2="160" stroke="#2764E8" strokeWidth="1" opacity="0.35" />
      <line x1="705" y1="65" x2="638" y2="160" stroke="#2764E8" strokeWidth="1" opacity="0.35" />
      <line x1="705" y1="80" x2="654" y2="160" stroke="#2764E8" strokeWidth="1" opacity="0.35" />
      <line x1="705" y1="50" x2="790" y2="160" stroke="#2764E8" strokeWidth="1" opacity="0.35" />
      <line x1="705" y1="65" x2="772" y2="160" stroke="#2764E8" strokeWidth="1" opacity="0.35" />
      <line x1="705" y1="80" x2="756" y2="160" stroke="#2764E8" strokeWidth="1" opacity="0.35" />

      {/* Airport Radar & Airplane (Far Right - GRU Cumbica Reference) */}
      <rect x="980" y="105" width="40" height="55" rx="3" fill="#DCE5F2" />
      <line x1="1000" y1="105" x2="1000" y2="80" stroke="#16233B" strokeWidth="2" opacity="0.5" />
      <circle cx="1000" cy="80" r="10" stroke="#2764E8" strokeWidth="2" fill="none" opacity="0.6" />
      <line x1="990" y1="80" x2="1010" y2="80" stroke="#2764E8" strokeWidth="2" opacity="0.6" />
      {/* Small Plane taking off towards GRU */}
      <path
        d="M1060 60L1085 52L1082 45L1068 50L1060 42L1056 44L1061 52L1048 56L1045 52L1042 53L1045 59L1060 60Z"
        fill="#2764E8"
        opacity="0.8"
      />

      {/* Layer 3: Foreground Sinuous Road Ribbon (The Journey Track) */}
      <path
        d="M0 210C240 185 450 225 720 195C950 170 1100 205 1200 190V240H0V210Z"
        fill="#142544"
      />

      {/* Dashed Center Route Line in Van Yellow (Allwhere/Armadillo feel) */}
      <path
        d="M0 225C240 200 450 240 720 210C950 185 1100 220 1200 205"
        stroke="#F5A623"
        strokeWidth="3.5"
        strokeDasharray="16 12"
        fill="none"
      />
    </svg>
  );
};
