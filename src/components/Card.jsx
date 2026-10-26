import { useEffect, useRef } from 'react';

// Tarjeta base: aparece al hacer scroll y se inclina un poquito con el mouse
export default function Card({ id, index, icon, title, desc, tone = 'cream', wide = false, children }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        card.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || !window.matchMedia('(pointer: fine)').matches) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const { clientX, clientY } = e;
    frameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1200px) translateY(-4px) rotateX(${y * -2.5}deg) rotateY(${x * 2.5}deg)`;
    });
  };

  const handleMouseLeave = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <article
      className={`card card-${tone} ${wide ? 'card-wide' : ''}`}
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <header className="card-head">
        <span className="card-index">{String(index).padStart(2, '0')}</span>
        <span className="card-icon">{icon}</span>
      </header>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{desc}</p>
      <div className="card-body">{children}</div>
    </article>
  );
}
