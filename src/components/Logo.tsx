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
          width={sizeClasses.icon * 1.2}
          height={sizeClasses.icon}
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          {/* Yellow gear background */}
          <circle cx="60" cy="35" r="28" fill="#F5B700" />

          {/* Gear teeth */}
          <g fill="#F5B700">
            <rect x="57" y="5" width="6" height="8" rx="1" />
            <rect x="77" y="12" width="6" height="8" rx="1" transform="rotate(45 80 16)" />
            <rect x="86" y="32" width="8" height="6" rx="1" />
            <rect x="77" y="52" width="6" height="8" rx="1" transform="rotate(-45 80 56)" />
            <rect x="57" y="59" width="6" height="8" rx="1" />
            <rect x="37" y="52" width="6" height="8" rx="1" transform="rotate(45 40 56)" />
            <rect x="28" y="32" width="8" height="6" rx="1" />
            <rect x="37" y="12" width="6" height="8" rx="1" transform="rotate(-45 40 16)" />
          </g>

          {/* Green tractor body */}
          <path
            d="M 35 50 L 35 42 L 45 38 L 75 38 L 85 42 L 85 50 Z"
            fill="#156D3E"
          />

          {/* Tractor cabin windows */}
          <rect x="48" y="42" width="7" height="6" rx="1" fill="#FFFFFF" opacity="0.8" />
          <rect x="58" y="42" width="7" height="6" rx="1" fill="#FFFFFF" opacity="0.8" />
          <rect x="68" y="42" width="7" height="6" rx="1" fill="#FFFFFF" opacity="0.8" />

          {/* Tractor base */}
          <rect x="32" y="50" width="56" height="8" rx="2" fill="#156D3E" />

          {/* Treads/tracks pattern */}
          <g fill="#0f5630">
            <rect x="35" y="52" width="3" height="4" rx="0.5" />
            <rect x="40" y="52" width="3" height="4" rx="0.5" />
            <rect x="45" y="52" width="3" height="4" rx="0.5" />
            <rect x="50" y="52" width="3" height="4" rx="0.5" />
            <rect x="55" y="52" width="3" height="4" rx="0.5" />
            <rect x="60" y="52" width="3" height="4" rx="0.5" />
            <rect x="65" y="52" width="3" height="4" rx="0.5" />
            <rect x="70" y="52" width="3" height="4" rx="0.5" />
            <rect x="75" y="52" width="3" height="4" rx="0.5" />
            <rect x="80" y="52" width="3" height="4" rx="0.5" />
          </g>

          {/* Small wheel (front) */}
          <circle cx="42" cy="65" r="7" fill="#0f5630" />
          <circle cx="42" cy="65" r="5" fill="#F5B700" />
          <circle cx="42" cy="65" r="2.5" fill="#0f5630" />

          {/* Large wheel (back) */}
          <circle cx="78" cy="68" r="10" fill="#0f5630" />
          <circle cx="78" cy="68" r="7" fill="#F5B700" />
          <circle cx="78" cy="68" r="4" fill="#0f5630" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`${sizeClasses.text} font-bold text-[#156D3E] tracking-tight`}>
          ENGINEX
        </span>
        {size !== 'sm' && (
          <span className="text-[11px] text-[#9ACD32] font-semibold tracking-wider uppercase">
            MAROC
          </span>
        )}
      </div>
    </div>
  );
}
