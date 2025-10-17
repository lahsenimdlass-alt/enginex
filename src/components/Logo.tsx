type LogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

export function Logo({ className = '', size = 'md', onClick }: LogoProps) {
  const sizes = {
    sm: { container: 'h-8', text: 'text-xl', icon: 32 },
    md: { container: 'h-10', text: 'text-2xl', icon: 40 },
    lg: { container: 'h-16', text: 'text-4xl', icon: 64 },
  };

  const sizeClasses = sizes[size];

  return (
    <div
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className={`${sizeClasses.container} relative`}>
        <svg
          width={sizeClasses.icon}
          height={sizeClasses.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#15803d', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#166534', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <rect x="2" y="2" width="96" height="96" rx="20" fill="url(#primaryGrad)" />

          <path
            d="M30 62 L30 48 L40 42 L60 42 L70 48 L70 62"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <rect x="25" y="60" width="50" height="10" rx="3" fill="white" />

          <circle cx="35" cy="75" r="7" fill="white" />
          <circle cx="35" cy="75" r="4" fill="url(#accentGrad)" />

          <circle cx="65" cy="75" r="7" fill="white" />
          <circle cx="65" cy="75" r="4" fill="url(#accentGrad)" />

          <path
            d="M42 32 L45 26 L55 26 L58 32"
            stroke="url(#accentGrad)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          <rect x="43" y="48" width="5" height="10" rx="1.5" fill="white" opacity="0.8" />
          <rect x="52" y="48" width="5" height="10" rx="1.5" fill="white" opacity="0.8" />

          <path
            d="M20 38 L25 33 L30 38"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M70 38 L75 33 L80 38"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="50" cy="50" r="2.5" fill="url(#accentGrad)" opacity="0.6" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`${sizeClasses.text} font-extrabold tracking-tight`}>
          <span className="bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent">
            Engine
          </span>
          <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            X
          </span>
        </span>
        {size !== 'sm' && (
          <span className="text-[11px] text-gray-600 font-semibold tracking-widest uppercase mt-0.5">
            .ma
          </span>
        )}
      </div>
    </div>
  );
}
