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
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className={`${sizeClasses.container} relative`}>
        <svg
          width={sizeClasses.icon}
          height={sizeClasses.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <circle cx="50" cy="50" r="48" fill="#156D3E" />

          <rect x="25" y="55" width="50" height="8" rx="2" fill="white" />

          <path
            d="M30 55 L30 45 L40 40 L60 40 L70 45 L70 55"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="35" cy="67" r="6" fill="white" />
          <circle cx="35" cy="67" r="3" fill="#156D3E" />

          <circle cx="65" cy="67" r="6" fill="white" />
          <circle cx="65" cy="67" r="3" fill="#156D3E" />

          <path
            d="M40 30 L42 25 L48 25 L50 30"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          <path
            d="M52 30 L54 25 L60 25 L62 30"
            stroke="white"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />

          <rect x="42" y="45" width="6" height="8" rx="1" fill="white" opacity="0.7" />
          <rect x="52" y="45" width="6" height="8" rx="1" fill="white" opacity="0.7" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`${sizeClasses.text} font-bold text-[#156D3E] tracking-tight`}>
          Engine<span className="text-[#0f5630]">x</span>
        </span>
        {size !== 'sm' && (
          <span className="text-[10px] text-gray-600 font-medium tracking-wider uppercase">
            Maroc
          </span>
        )}
      </div>
    </div>
  );
}
