const WeddingLogo = ({ size = "default", showText = true }: { size?: "small" | "default" | "large"; showText?: boolean }) => {
  const dimensions = {
    small: { width: 32, height: 32 },
    default: { width: 40, height: 40 },
    large: { width: 56, height: 56 },
  };
  const { width, height } = dimensions[size];

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        {/* Thin circle */}
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="0.6" />

        {/* Subtle stem */}
        <path
          d="M38 68 C44 55, 50 45, 62 32"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Tiny bell flower 1 */}
        <ellipse cx="44" cy="60" rx="2" ry="2.5" stroke="currentColor" strokeWidth="0.5" fill="none" />

        {/* Tiny bell flower 2 */}
        <ellipse cx="52" cy="48" rx="1.8" ry="2.2" stroke="currentColor" strokeWidth="0.5" fill="none" />

        {/* Tiny bell flower 3 */}
        <ellipse cx="58" cy="38" rx="1.5" ry="2" stroke="currentColor" strokeWidth="0.5" fill="none" />

        {/* Initials */}
        <text
          x="44"
          y="56"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="18"
          fontWeight="300"
          fill="currentColor"
          textAnchor="middle"
        >
          N
        </text>
        <text
          x="58"
          y="56"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="18"
          fontWeight="300"
          fill="currentColor"
          textAnchor="middle"
        >
          L
        </text>
      </svg>

      {showText && size !== "small" && (
        <span className="text-xs tracking-[0.25em] uppercase text-primary font-sans">
          Nam & Linh
        </span>
      )}
    </div>
  );
};

export default WeddingLogo;
