import React from 'react';

export type BadgeVariant =
  | 'approved'
  | 'under_review'
  | 'pending'
  | 'rejected'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'warning'
  | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'info',
  className = '',
  dot = true,
}) => {
  const variantStyles: Record<BadgeVariant, { bg: string; text: string; dotColor: string }> = {
    approved: {
      bg: 'bg-emerald-50 border border-emerald-200',
      text: 'text-emerald-700',
      dotColor: 'bg-emerald-500',
    },
    confirmed: {
      bg: 'bg-emerald-50 border border-emerald-200',
      text: 'text-emerald-700',
      dotColor: 'bg-emerald-500',
    },
    completed: {
      bg: 'bg-blue-50 border border-blue-200',
      text: 'text-blue-700',
      dotColor: 'bg-blue-500',
    },
    under_review: {
      bg: 'bg-amber-50 border border-amber-200',
      text: 'text-amber-800',
      dotColor: 'bg-amber-500',
    },
    pending: {
      bg: 'bg-amber-50 border border-amber-200',
      text: 'text-amber-800',
      dotColor: 'bg-amber-500',
    },
    warning: {
      bg: 'bg-orange-50 border border-orange-200',
      text: 'text-orange-800',
      dotColor: 'bg-orange-500',
    },
    rejected: {
      bg: 'bg-rose-50 border border-rose-200',
      text: 'text-rose-700',
      dotColor: 'bg-rose-500',
    },
    cancelled: {
      bg: 'bg-slate-100 border border-slate-200',
      text: 'text-slate-600',
      dotColor: 'bg-slate-400',
    },
    info: {
      bg: 'bg-sky-50 border border-sky-200',
      text: 'text-sky-700',
      dotColor: 'bg-sky-500',
    },
  };

  const current = variantStyles[variant] || variantStyles.info;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${current.bg} ${current.text} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor} animate-pulse`} />}
      {children}
    </span>
  );
};
