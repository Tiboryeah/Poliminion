import { useState } from 'react';
import { Banana as BananaIcon } from 'lucide-react';
import Card from '../Card';
import { Minion } from '../Art';
import { minionSay } from '../../utils/audio';

const PHRASES = [
  { text: '¡Bello, Poliminion!', say: 'bello', mood: 'happy' },
  { text: '¡Bee-do bee-do bee-do!', say: 'bee-do', mood: 'wow' },
  { text: '¡Banana! (pero tú eres más dulce)', say: 'banana', mood: 'happy' },
  { text: 'Jajaja… (tu risa es más bonita)', say: 'risa', mood: 'love' },
  { text: '¡Poopaye! …mentira, aquí me quedo', say: 'poopaye', mood: 'wow' },
  { text: '¡Yes! ¡19 años!', say: 'yes', mood: 'love' },
  { text: '¡Bello, futura arquitecta!', say: 'bello', mood: 'happy' },
];

export default function MinionCard({ onRain }) {
  const [phrase, setPhrase] = useState(null);
  const [count, setCount] = useState(0);

  const talk = () => {
    const next = PHRASES[count % PHRASES.length];
    setPhrase(next);
    setCount((c) => c + 1);
    minionSay(next.say);
    if ((count + 1) % 3 === 0) onRain('banana');
  };

  return (
    <Card
      index={1}
      icon={<BananaIcon size={20} />}
      title="Bello, Poliminion"
      desc="Tu minion personal tiene muchas cosas que decirte. Tócalo (con volumen)."
    >
      <div className="minion-stage">
        {phrase && <div key={count} className="speech">{phrase.text}</div>}
        <button type="button" className="minion-btn" onClick={talk} aria-label="Hablar con el minion">
          <Minion mood={phrase?.mood ?? 'happy'} waving={count === 0} />
        </button>
      </div>
      <p className="tiny-note">
        {count === 0 ? 'Psst… cada tercer "bello" llueven bananas.' : `${count} ${count === 1 ? 'bello' : 'bellos'} para Fresita`}
      </p>
    </Card>
  );
}
