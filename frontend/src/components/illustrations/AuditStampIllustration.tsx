import React from 'react';

export const AuditStampIllustration: React.FC<{ className?: string; text?: string }> = ({
  className = 'w-24 h-24',
  text = 'AUDITADO SP',
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none transform -rotate-12 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-brand-green" fill="currentColor">
        {/* Outer Stamped Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="6 3"
          fill="none"
          opacity="0.85"
        />
        {/* Inner Solid Ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
        />
        {/* Center Star & Text */}
        <text
          x="50"
          y="34"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="800"
          letterSpacing="1"
          fill="currentColor"
          fontFamily="system-ui"
        >
          {text}
        </text>
        <path
          d="M50 40L52 46H58L53 50L55 56L50 52L45 56L47 50L42 46H48L50 40Z"
          fill="currentColor"
        />
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="currentColor"
          fontFamily="system-ui"
        >
          SEGURO APP 100%
        </text>
        <text
          x="50"
          y="77"
          textAnchor="middle"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="0.5"
          fill="currentColor"
          fontFamily="system-ui"
          opacity="0.75"
        >
          DTP · ARTESP
        </text>
      </svg>
    </div>
  );
};
