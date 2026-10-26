import { useState } from 'react';
import { Cherry } from 'lucide-react';
import Card from '../Card';
import { Strawberry } from '../Art';
import { BIRTHDAY_TUNE, playNote, playTuneFinale } from '../../utils/audio';

// 19 años, 19 fresas, 19 razones
const REASONS = [
  'Tu risa. Ya sabes que es mi sonido favorito.',
  'Lo dulce que eres, más que cualquier fresa.',
  'Que te emocionen los minions como a una niña.',
  'Lo creativa que eres, siempre con ideas nuevas en la cabeza.',
  'Que vas a ser la mejor arquitecta del mundo.',
  'Que vas a diseñar nuestra casa (y confío en ti).',
  'Lo bien que te ves de amarillo pastel.',
  'Que el azul marino también te queda perfecto.',
  'Cómo se te iluminan los ojos con unos chilaquiles.',
  'Que tu lugar favorito sea Sushito (ya tengo un plan).',
  'Las partidas de Fortnite contigo.',
  'Cómo te ríes cuando perdemos en Fortnite.',
  'Que tu canción sea "OK OK" y suene increíble contigo.',
  'Que te encanten las gerberas (muy buen gusto).',
  'Que ves el mundo rosita y con brillitos (y lo haces más bonito).',
  'Cómo le echas ganas a la carrera, aunque tengas que desvelarte.',
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
    playNote(BIRTHDAY_TUNE[picked.length]);
    const next = [...picked, i];
    setPicked(next);
    setLast(i);
    if (next.length === REASONS.length) {
      setTimeout(playTuneFinale, 650);
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
      <div className={`berry-reason ${last === null ? 'empty' : ''}`} aria-live="polite">
        <span className="reason-tape" aria-hidden="true" />
        <div className="reason-badge" aria-hidden="true">
          <Strawberry size={64} />
          <span>{last === null ? '?' : last + 1}</span>
        </div>
        <div key={last} className="reason-copy">
          <span className="reason-label">
            {last === null ? 'Tu canasta te espera' : `Razón ${last + 1} de 19`}
          </span>
          <p>{last === null ? 'Toca cualquier fresa para descubrir la primera…' : REASONS[last]}</p>
        </div>
      </div>
      <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={19} aria-valuenow={picked.length}>
        <span style={{ width: `${(picked.length / REASONS.length) * 100}%` }} />
      </div>
      <p className="tiny-note">
        {done
          ? '¡Canasta completa! 19 razones, una canción, y me quedé corto.'
          : picked.length === 0
            ? 'Cada fresa toca una notita… a ver qué canción sale.'
            : `${picked.length} de 19 fresas recogidas`}
      </p>
    </Card>
  );
}
