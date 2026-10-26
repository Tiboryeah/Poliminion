import { useMemo } from 'react';
import { Gerbera, Strawberry } from './Art';

// Fondo azul marino con estrellitas, gerberas y fresas flotando muy suave
export default function FloatingBackground() {
  const stars = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.2 + 0.8,
    delay: Math.random() * 4,
  })), []);

  const floaters = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: (i * 10 + Math.random() * 6) % 100,
    duration: 22 + Math.random() * 18,
    delay: -Math.random() * 30,
    flower: i % 2 === 0,
    color: ['#ff8c42', '#ff6fa3', '#ffd84d', '#ff8a9b'][i % 4],
  })), []);

  return (
    <div className="bg" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
      {floaters.map((f) => (
        <span
          key={f.id}
          className="floater"
          style={{ left: `${f.left}%`, animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }}
        >
          {f.flower ? <Gerbera size={38} color={f.color} /> : <Strawberry size={28} />}
        </span>
      ))}
    </div>
  );
}
