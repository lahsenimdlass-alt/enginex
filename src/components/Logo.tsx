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
          {/* Background circle with gradient effect */}
          <circle cx="50" cy="50" r="48" fill="#156D3E" />
          <circle cx="50" cy="50" r="42" fill="#1a7d49" />

          {/* Letter E */}
          <g fill="#FFFFFF">
            <rect x="32" y="30" width="20" height="6" rx="2" />
            <rect x="32" y="30" width="6" height="40" rx="2" />
            <rect x="32" y="47" width="16" height="6" rx="2" />
            <rect x="32" y="64" width="20" height="6" rx="2" />
          </g>

          {/* Letter X stylized */}
          <g fill="#F5B700">
            <rect x="54" y="30" width="6" height="42" rx="2" transform="rotate(30 57 51)" />
            <rect x="54" y="30" width="6" height="42" rx="2" transform="rotate(-30 57 51)" />
          </g>

          {/* Accent dot */}
          <circle cx="68" cy="32" r="3" fill="#F5B700" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`${sizeClasses.text} font-bold text-[#156D3E] tracking-tight`}>
          ENGINEX
        </span>
        {size !== 'sm' && (
          <span className="text-[10px] text-gray-600 font-medium tracking-widest uppercase">
            MAROC
          </span>
        )}
      </div>
    </div>
  );
}
