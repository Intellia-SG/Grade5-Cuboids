import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ stars = 0, maxStars = 3, size = 18 }) {
  return (
    <div style={{ display: 'inline-flex', gap: '4px' }}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < stars ? '#fbbf24' : 'rgba(255,255,255,0.15)'}
          color={i < stars ? '#fbbf24' : 'rgba(255,255,255,0.3)'}
        />
      ))}
    </div>
  );
}
