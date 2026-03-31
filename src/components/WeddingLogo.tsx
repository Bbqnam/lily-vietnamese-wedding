type WeddingLogoProps = {
  size?: "small" | "default" | "large";
  showText?: boolean;
};

const WeddingLogo = ({ size = "default", showText = true }: WeddingLogoProps) => {
  const dimensions = {
    small: { width: 42, height: 42 },
    default: { width: 98, height: 98 },
    large: { width: 122, height: 122 },
  };

  const isSmall = size === "small";
  const { width, height } = dimensions[size];

  return (
    <div className="flex flex-col items-center leading-none">
      <svg
        width={width}
        height={height}
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        aria-hidden="true"
      >
        <path
          d="M61 40C82 27 112 28 132 43C150 56 160 80 157 110"
          stroke="currentColor"
          strokeWidth={isSmall ? "1.7" : "1.4"}
          strokeLinecap="round"
        />
        <path
          d="M48 122C59 136 79 144 103 141"
          stroke="currentColor"
          strokeWidth={isSmall ? "1.7" : "1.4"}
          strokeLinecap="round"
        />

        {!isSmall && (
          <>
            <path
              d="M38 99C40 106 44 112 49 118C54 124 62 129 71 132"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M37 96C30 93 26 86 28 79C35 82 39 88 37 96Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M44 107C37 105 33 99 34 92C41 95 45 101 44 107Z"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinejoin="round"
            />
            <path
              d="M52 117C45 115 41 109 42 102C49 105 53 111 52 117Z"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            <path
              d="M57 124C53 119 53 113 57 108C61 112 61 118 57 124Z"
              stroke="currentColor"
              strokeWidth="1.05"
              strokeLinejoin="round"
            />
            <path d="M57 116L63 122" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M63 120C64 116 67 114 71 114C70 118 67 121 63 120Z" stroke="currentColor" strokeWidth="0.95" />
            <path d="M49 107L55 112" stroke="currentColor" strokeWidth="0.95" strokeLinecap="round" />
            <path d="M55 111C56 107 59 105 63 105C62 109 59 112 55 111Z" stroke="currentColor" strokeWidth="0.9" />
            <path d="M42 97L48 101" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M48 101C49 97 52 95 55 95C54 99 51 102 48 101Z" stroke="currentColor" strokeWidth="0.85" />
          </>
        )}

        <text
          x="54"
          y="84"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize={isSmall ? "54" : "74"}
          fontWeight="400"
        >
          N
        </text>

        <text
          x="92"
          y="112"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize={isSmall ? "52" : "84"}
          fontWeight="400"
          opacity={isSmall ? "0.92" : "1"}
        >
          &
        </text>

        <text
          x="124"
          y="132"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize={isSmall ? "58" : "80"}
          fontWeight="400"
        >
          L
        </text>
      </svg>

      {showText && size !== "small" && (
        <div className="mt-3 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-primary/85">
            Nam &amp; Linh
          </p>
        </div>
      )}
    </div>
  );
};

export default WeddingLogo;
