import { Play, Pause, Volume2, VolumeX, Disc3, PartyPopper } from 'lucide-react';
import { playClick } from '../utils/audio';

export default function Header({ song, isPlaying, volume, missing, onTogglePlay, onVolume, onCelebrate }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-name">Fresita</span>
        <span className="brand-tag">Poliminion · 19</span>
      </div>

      <div className="mini-player">
        <Disc3 size={20} className={isPlaying ? 'spin' : ''} />
        <div className="mini-player-text">
          <strong>{song.title}</strong>
          <span>{missing ? 'Falta el archivo de la canción' : song.artist}</span>
        </div>
        <button
          type="button"
          className="icon-btn play"
          onClick={() => { playClick(); onTogglePlay(); }}
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <label className="volume" title={`Volumen ${volume}%`}>
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolume(Number(e.target.value))}
            aria-label="Volumen"
            style={{ '--level': `${volume}%` }}
          />
        </label>
      </div>

      <button type="button" className="celebrate-btn" onClick={onCelebrate}>
        <PartyPopper size={16} /> <span>Festejar</span>
      </button>
    </header>
  );
}
