import React from 'react';

export const CityHorizonIllustration: React.FC<{ className?: string }> = ({
  className = 'w-full h-12',
}) => {
  return (
    <svg
      viewBox="0 0 1200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Layer 1: Soft Hills (Cantareira & Interior SP) */}
      <path
        d="M0 50C150 42 280 48 420 44C560 40 680 47 820 42C960 37 1090 44 1200 39V80H0V50Z"
        fill="#E8F8F0"
        opacity="0.85"
      />

      {/* Layer 2: Subtle SP Skyline Silhouette */}
      {/* Altino Arantes / Banespa Silhouette */}
      <path d="M140 50V32H145V24H148V16H150V24H153V32H158V50H140Z" fill="#CBD5E1" />
      {/* Skyline Clusters */}
      <rect x="90" y="38" width="25" height="15" rx="1.5" fill="#DCE5F2" />
      <rect x="170" y="34" width="30" height="20" rx="1.5" fill="#DCE5F2" />
      <rect x="220" y="40" width="35" height="14" rx="1.5" fill="#DCE5F2" />

      {/* Paulista Antenna */}
      <rect x="360" y="30" width="32" height="24" rx="2" fill="#DCE5F2" />
      <line x1="376" y1="30" x2="376" y2="8" stroke="#16233B" strokeWidth="1.5" opacity="0.4" />
      <circle cx="376" cy="8" r="2" fill="#E11D48" />

      {/* Cable-Stayed Bridge (Octavio Frias) */}
      <path
        d="M660 55L675 14H685L700 55H690L680 24L670 55H660Z"
        fill="#CBD5E1"
        opacity="0.75"
      />
      <line x1="680" y1="22" x2="640" y2="55" stroke="#2764E8" strokeWidth="0.8" opacity="0.4" />
      <line x1="680" y1="28" x2="652" y2="55" stroke="#2764E8" strokeWidth="0.8" opacity="0.4" />
      <line x1="680" y1="22" x2="720" y2="55" stroke="#2764E8" strokeWidth="0.8" opacity="0.4" />
      <line x1="680" y1="28" x2="708" y2="55" stroke="#2764E8" strokeWidth="0.8" opacity="0.4" />

      {/* Airport Radar & Small Plane towards GRU */}
      <rect x="960" y="36" width="28" height="18" rx="2" fill="#DCE5F2" />
      <line x1="974" y1="36" x2="974" y2="24" stroke="#16233B" strokeWidth="1.5" opacity="0.5" />
      <path
        d="M1020 22L1034 18L1032 14L1024 17L1019 12L1017 13L1020 18L1013 20L1011 18L1009 18L1011 22L1020 22Z"
        fill="#2764E8"
        opacity="0.85"
      />

      {/* Layer 3: Road Ribbon */}
      <path
        d="M0 64C240 56 450 68 720 60C950 52 1100 62 1200 58V80H0V64Z"
        fill="#142544"
      />

      {/* Van Yellow Center Road Dash */}
      <path
        d="M0 72C240 64 450 76 720 68C950 60 1100 70 1200 66"
        stroke="#F5A623"
        strokeWidth="2.5"
        strokeDasharray="14 10"
        fill="none"
      />
    </svg>
  );
};
