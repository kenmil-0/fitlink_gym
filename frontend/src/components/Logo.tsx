import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main dumbbell shape */}
        <rect
          x="8"
          y="20"
          width="32"
          height="8"
          rx="4"
          fill="url(#primaryGradient)"
          stroke="url(#accentGradient)"
          strokeWidth="2"
        />
        
        {/* Left weight */}
        <circle
          cx="12"
          cy="24"
          r="6"
          fill="url(#accentGradient)"
          stroke="url(#primaryGradient)"
          strokeWidth="2"
        />
        
        {/* Right weight */}
        <circle
          cx="36"
          cy="24"
          r="6"
          fill="url(#accentGradient)"
          stroke="url(#primaryGradient)"
          strokeWidth="2"
        />
        
        {/* Connection lines - representing the "link" concept */}
        <path
          d="M 44 24 Q 40 20 36 24"
          stroke="url(#primaryGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 4 24 Q 8 20 12 24"
          stroke="url(#primaryGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Energy dots */}
        <circle
          cx="24"
          cy="16"
          r="1.5"
          fill="url(#accentGradient)"
          className="animate-pulse-slow"
        />
        <circle
          cx="24"
          cy="32"
          r="1.5"
          fill="url(#primaryGradient)"
          className="animate-pulse-slow"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
