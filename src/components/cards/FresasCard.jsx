import { useState } from 'react';
import { Cherry } from 'lucide-react';
import Card from '../Card';
import { Strawberry } from '../Art';
import { playChime, playPop } from '../../utils/audio';

// 19 años, 19 fresas, 19 razones
const REASONS = [
  'Tu risa. Ya sabes que es mi sonido favorito.',
  'Lo dulce que eres, más que cualquier fresa.',
  'Que te emocionen los minions como a una niña.',
  'Lo talentosa que eres dibujando y diseñando.',
  'Que vas a ser la mejor arquitecta del mundo.',
  'Que vas a diseñar nuestra casa (y confío en ti).',
  'Lo bien que te ves de amarillo pastel.',
  'Que el azul marino también te queda perfecto.',
  'Cómo se te iluminan los ojos con el sushi.',
  'Que tu lugar favorito sea Sushito (ya tengo un plan).',
  'Las partidas de Fortnite contigo.',
  'Cómo te ríes cuando perdemos en Fortnite.',
  'Que tu canción sea "OK OK" y suene increíble contigo.',
  'Que te encanten las gerberas (muy buen gusto).',
  'Tu forma de ver el mundo, como un plano lleno de ideas.',
  'Lo dedicada que eres con la carrera.',
  'Que me dejes decirte Poliminion.',
  'Que existas. Así de simple.',
  'Que hoy cumples 19 y yo puedo celebrarlo contigo.',
];

export default function FresasCard({ onRain }) {
  const [picked, setPicked] = useState([]);
  const [last, setLast] = useState(null);
  const done = picked.length === REASONS.length;

  const pick = (i) => {
    if (picked.includes(i)) {
      setLast(i);
      return;
    }
    playPop();
    const next = [...picked, i];
    setPicked(next);
    setLast(i);
    if (next.length === REASONS.length) {
      playChime();
      onRain('strawberry');
    }
  };

  return (
    <Card
      index={3}
      icon={<Cherry size={20} />}
      title="19 fresas, 19 razones"
      desc="Una fresa por cada año. Recoge las 19, cada una esconde algo que me gusta de ti."
      wide
    >
      <div className="berry-field">
        {REASONS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`berry ${picked.includes(i) ? 'picked' : ''} ${last === i ? 'current' : ''}`}
            onClick={() => pick(i)}
            aria-label={`Fresa ${i + 1}`}
          >
            <Strawberry size={42} picked={picked.includes(i)} />
            <span className="berry-num">{i + 1}</span>
          </button>
        ))}
      </div>
      <div className="berry-reason" aria-live="polite">
        {last === null ? (
          <span className="muted">Empieza por la que quieras…</span>
        ) : (
          <>
            <strong>Razón #{last + 1}</strong>
            <span>{REASONS[last]}</span>
          </>
        )}
      </div>
      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={19} aria-valuenow={picked.length}>
        <span style={{ width: `${(picked.length / REASONS.length) * 100}%` }} />
      </div>
      <p className="tiny-note">
        {done ? '¡Canasta completa! 19 razones y me quedé corto.' : `${picked.length} de 19 fresas recogidas`}
      </p>
    </Card>
  );
}
