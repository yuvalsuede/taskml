'use client';

/**
 * Button - TaskML branded button component
 * See BRANDBOOK.md for design guidelines
 */

import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// Signal Orange for primary actions - use sparingly for maximum impact
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-signal text-white font-medium
    hover:bg-signal-hover active:bg-signal-dark
    shadow-sm
  `,
  secondary: `
    bg-midnight-surface text-gray-100
    border border-midnight-border
    hover:bg-midnight-elevated hover:border-midnight-border-active
    dark:bg-midnight-surface dark:text-gray-100
    dark:border-midnight-border dark:hover:bg-midnight-elevated
  `,
  ghost: `
    text-gray-300
    hover:bg-midnight-surface hover:text-gray-100
    active:bg-midnight-elevated
  `,
  danger: `
    bg-status-blocked text-white font-medium
    hover:bg-red-600 active:bg-red-700
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs gap-1.5',
  md: 'px-3 py-2 text-sm gap-2',
  lg: 'px-4 py-2.5 text-base gap-2',
  icon: 'p-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center
          rounded-md
          transition-all duration-fast ease-out-custom
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-midnight
          disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
