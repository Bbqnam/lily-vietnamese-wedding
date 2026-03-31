const WeddingLogo = ({ size = "default", showText = true }: { size?: "small" | "default" | "large"; showText?: boolean }) => {
  const dimensions = {
    small: { width: 48, height: 48 },
    default: { width: 120, height: 120 },
    large: { width: 200, height: 200 },
  };
  const { width, height } = dimensions[size];

  return (
    <div className="flex flex-col items-center">
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        {/* Double circle emblem */}
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="84" stroke="currentColor" strokeWidth="0.5" />

        {/* Lily of the Valley stem — lower-left to upper-right */}
        <path
          d="M55 165 C70 130, 90 100, 130 45"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Small leaves */}
        <path
          d="M72 138 C65 130, 60 135, 65 142"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M85 118 C78 112, 74 118, 78 124"
          stroke="currentColor"
          strokeWidth="0.6"
          fill="none"
        />

        {/* Bell-shaped flowers hanging from stem */}
        {/* Flower 1 */}
        <ellipse cx="78" cy="133" rx="4" ry="5" stroke="currentColor" strokeWidth="0.7" fill="none" />
        <line x1="78" y1="128" x2="75" y2="134" stroke="currentColor" strokeWidth="0.5" />

        {/* Flower 2 */}
        <ellipse cx="88" cy="120" rx="3.5" ry="4.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
        <line x1="88" y1="115.5" x2="86" y2="121" stroke="currentColor" strokeWidth="0.5" />

        {/* Flower 3 */}
        <ellipse cx="98" cy="105" rx="3.5" ry="4.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
        <line x1="98" y1="100.5" x2="96" y2="106" stroke="currentColor" strokeWidth="0.5" />

        {/* Flower 4 */}
        <ellipse cx="110" cy="88" rx="3" ry="4" stroke="currentColor" strokeWidth="0.7" fill="none" />
        <line x1="110" y1="84" x2="108" y2="89" stroke="currentColor" strokeWidth="0.5" />

        {/* Flower 5 */}
        <ellipse cx="120" cy="72" rx="2.5" ry="3.5" stroke="currentColor" strokeWidth="0.7" fill="none" />
        <line x1="120" y1="68.5" x2="118" y2="73" stroke="currentColor" strokeWidth="0.5" />

        {/* Initials N L — elegant serif, slightly overlapping */}
        <text
          x="88"
          y="108"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="38"
          fontWeight="300"
          fill="currentColor"
          textAnchor="middle"
        >
          N
        </text>
        <text
          x="116"
          y="108"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="38"
          fontWeight="300"
          fill="currentColor"
          textAnchor="middle"
        >
          L
        </text>
      </svg>

      {showText && size !== "small" && (
        <div className="text-center mt-3">
          <p className="text-xs tracking-[0.35em] uppercase text-primary font-sans">
            Nam & Linh
          </p>
        </div>
      )}
    </div>
  );
};

export default WeddingLogo;
