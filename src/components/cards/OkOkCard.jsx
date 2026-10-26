import { Music2, Play, Pause } from 'lucide-react';
import Card from '../Card';
import { playClick } from '../../utils/audio';

export default function OkOkCard({ song, isPlaying, missing, onTogglePlay }) {
  return (
    <Card
      index={7}
      icon={<Music2 size={20} />}
      title={`"${song.title}"`}
      desc={`Tu canción de ${song.artist}. Dale play y que suene mientras recorres tu página.`}
    >
      <div className={`turntable ${isPlaying ? 'playing' : ''}`}>
        <div className="vinyl">
          <div className="vinyl-label">
            <span>OK</span>
            <span>OK</span>
          </div>
        </div>
        <span className="tonearm" />
      </div>
      <div className="okok-words" aria-hidden="true">
        {['ok', 'ok', 'ok', 'ok'].map((w, i) => (
          <span key={i} className={isPlaying ? 'bounce' : ''} style={{ animationDelay: `${i * 0.15}s` }}>{w}</span>
        ))}
      </div>
      {missing ? (
        <a className="btn" href={song.fallback} target="_blank" rel="noreferrer">Escucharla en YouTube</a>
      ) : (
        <button type="button" className="btn" onClick={() => { playClick(); onTogglePlay(); }}>
          {isPlaying ? <><Pause size={16} /> Pausar</> : <><Play size={16} /> Poner la canción</>}
        </button>
      )}
    </Card>
  );
}
