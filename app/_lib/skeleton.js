export function generateSkeletonDataURL(
  width = 700,
  height = 475,
  backgroundColor = "#f3f4f6",
  shimmerColor = "#e5e7eb"
) {
  const shimmerWidth = width * 1.5;
  const shimmerTransform = `translateX(-${shimmerWidth}px)`;

  const svg = `
      <svg 
        width="${width}" 
        height="${height}" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient id="shimmer" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0.0" stop-color="${backgroundColor}">
              <animate
                attributeName="offset"
                values="-1; 2"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="0.5" stop-color="${shimmerColor}">
              <animate
                attributeName="offset"
                values="-0.5; 2.5"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="1.0" stop-color="${backgroundColor}">
              <animate
                attributeName="offset"
                values="0; 3"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="${width}"
          height="${height}"
          fill="url(#shimmer)"
        />
      </svg>
    `.trim();

  const encodedSVG = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${encodedSVG}`;
}
