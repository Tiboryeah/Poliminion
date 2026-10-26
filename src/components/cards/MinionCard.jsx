import { useState } from 'react';
import { Banana as BananaIcon } from 'lucide-react';
import Card from '../Card';
import { Minion } from '../Art';
import { minionSay, playPop } from '../../utils/audio';

const PHRASES = [
  { text: '¡Bello, Poliminion!', say: 'Bello Poliminion', mood: 'happy' },
  { text: '¡Tulaliloo ti amo!', say: 'Tulaliloo ti amo', mood: 'love' },
  { text: '¡Bee-do bee-do bee-do!', say: 'Bido bido bido', mood: 'wow' },
  { text: '¡Banana! (pero tú eres más dulce)', say: 'Banaaana', mood: 'happy' },
  { text: '¡Poopaye! …mentira, aquí me quedo', say: 'Pupayé', mood: 'wow' },
  { text: '¡Kampai por tus 19!', say: 'Kampai', mood: 'love' },
  { text: '¡Bello, futura arquitecta!', say: 'Bello arquitecta', mood: 'happy' },
];

export default function MinionCard({ onRain }) {
  const [phrase, setPhrase] = useState(null);
  const [count, setCount] = useState(0);

  const talk = () => {
    playPop();
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
