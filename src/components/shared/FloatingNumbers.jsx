import React, { useMemo } from 'react';

const SYMBOLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '×', '+', '=', 'm³', 'cm³'];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left: `${(i * 5.5 + Math.sin(i) * 3) % 95}%`,
      animationDelay: `${(i * 1.2) % 18}s`,
      animationDuration: `${18 + (i % 8)}s`,
      fontSize: `${1.8 + (i % 4) * 0.4}rem`,
    }));
  }, []);

  return (
    <div className="floating-numbers">
      {items.map((item) => (
        <span
          key={item.id}
          className="floating-number"
          style={{
            left: item.left,
            animationDelay: item.animationDelay,
            animationDuration: item.animationDuration,
            fontSize: item.fontSize,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
