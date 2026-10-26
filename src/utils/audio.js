// Sonidos sintetizados con Web Audio (sin archivos externos), igual que en Ratita
let audioCtx;

function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone({ type = 'sine', from, to, start = 0, length, volume = 0.15 }) {
  const ac = ctx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const now = ac.currentTime + start;
  osc.type = type;
  osc.frequency.setValueAtTime(from, now);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, now + length);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + length);
  osc.connect(gain).connect(ac.destination);
  osc.start(now);
  osc.stop(now + length);
}

export const playClick = () => tone({ type: 'triangle', from: 220, to: 110, length: 0.1 });

export const playPop = () => tone({ from: 140, to: 900, length: 0.09, volume: 0.2 });

export function playChime() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
    tone({ from: f, start: i * 0.07, length: 0.28, volume: 0.12 }));
}

// Fanfarria corta para la "Victoria Magistral"
export function playFanfare() {
  [392, 523.25, 659.25, 783.99, 659.25, 1046.5].forEach((f, i) =>
    tone({ type: 'square', from: f, start: i * 0.11, length: i === 5 ? 0.5 : 0.14, volume: 0.06 }));
}

export function playSwoosh() {
  tone({ type: 'sawtooth', from: 900, to: 120, length: 0.5, volume: 0.05 });
}

// Voz de minion: el navegador habla agudo y rápido
export function minionSay(text) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.pitch = 2;
  u.rate = 1.35;
  u.lang = 'es-MX';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
