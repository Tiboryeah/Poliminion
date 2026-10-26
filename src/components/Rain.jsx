import { Heart, Star } from 'lucide-react';
import { Banana, Gerbera, Maki, Strawberry } from './Art';

const COLORS = ['#ffe9a8', '#ffd84d', '#ff8a9b', '#e8344e', '#ff8c42', '#9ec5ff'];

// Lluvia de cosas bonitas: fresas, gerberas, bananas, sushi, corazones y estrellas
export function makeDrops(kind = 'mix', amount = 46) {
  const kinds = kind === 'mix' ? ['strawberry', 'gerbera', 'banana', 'maki', 'heart', 'star'] : [kind];
  return Array.from({ length: amount }, (_, i) => ({
    id: `${Date.now()}-${i}-${Math.random()}`,
    type: kinds[Math.floor(Math.random() * kinds.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    left: `${Math.random() * 94 + 1}vw`,
    delay: i * 0.05,
    scale: Math.random() * 0.6 + 0.7,
    spin: Math.random() > 0.5 ? 1 : -1,
  }));
}

function Drop({ type, color }) {
  switch (type) {
    case 'strawberry': return <Strawberry size={30} />;
    case 'gerbera': return <Gerbera size={34} color={color === '#ffe9a8' ? '#ff6fa3' : color} />;
    case 'banana': return <Banana size={32} />;
    case 'maki': return <Maki size={28} />;
    case 'heart': return <Heart size={24} fill={color} stroke="none" />;
    default: return <Star size={22} fill={color} stroke="none" />;
  }
}

export default function Rain({ drops }) {
  return (
    <div className="rain" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="drop"
          style={{ left: d.left, animationDelay: `${d.delay}s`, '--spin': d.spin }}
        >
          <span style={{ display: 'inline-block', transform: `scale(${d.scale})` }}>
            <Drop type={d.type} color={d.color} />
          </span>
        </span>
      ))}
    </div>
  );
}
