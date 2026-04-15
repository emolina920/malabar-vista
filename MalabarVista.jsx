'use client';
// ─── MalabarVista.jsx ────────────────────────────────────────────────────────
// Landing page de venta directa · Casa campestre de lujo · Cerritos Malabar
// Stack: React JSX · Inline styles + <style> inyectado · Sin dependencias CSS
// Para Next.js: mover a src/app/malabar-vista/page.jsx
// Para React puro: eliminar la línea 'use client' del inicio
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:       '#0A1918',
  bgMid:    '#0E2020',
  bgCard:   '#122120',
  bgLight:  '#F7F2E4',
  bgLightD: '#EDE7D5',
  gold:     '#C8A76B',
  goldL:    '#DEBF87',
  goldDim:  '#7A6438',
  cream:    '#EDE8D5',
  muted:    '#8A9890',
  dark:     '#040E0D',
  ink:      '#1A1A17',
};

const WA = 'https://wa.me/573217664826?text=Hola%2C%20me%20interesa%20la%20casa%20con%20vista%20al%20lago%20en%20Cerritos%20Malabar';

// ─── CSS GLOBAL INYECTADO ─────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');

.mv * { box-sizing: border-box; margin: 0; padding: 0; }
.mv { font-family: 'Montserrat', sans-serif; background: #0A1918; color: #EDE8D5; -webkit-font-smoothing: antialiased; }

/* ── Navbar ── */
.mv-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 2.25rem 3rem; transition: all 0.45s ease;
}
.mv-nav.is-scrolled {
  background: rgba(10, 25, 24, 0.97);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  padding: 1.2rem 3rem;
  border-bottom: 1px solid rgba(200, 167, 107, 0.15);
}
.mv-nav-logo { font-family: 'Cormorant', serif; font-size: 1rem; letter-spacing: 0.4em; text-transform: uppercase; color: #C8A76B; font-weight: 500; text-decoration: none; }
.mv-nav-links { display: flex; gap: 2.5rem; list-style: none; }
.mv-nav-links a { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: #EDE8D5; text-decoration: none; opacity: 0.75; transition: opacity 0.2s, color 0.2s; }
.mv-nav-links a:hover { opacity: 1; color: #C8A76B; }
.mv-nav-cta { font-size: 0.63rem; letter-spacing: 0.18em; text-transform: uppercase; background: #C8A76B; color: #0A1918; padding: 0.65rem 1.5rem; font-weight: 700; cursor: pointer; border: none; font-family: 'Montserrat', sans-serif; text-decoration: none; transition: background 0.2s; }
.mv-nav-cta:hover { background: #DEBF87; }

/* ── Hero ── */
.mv-hero { position: relative; height: 100vh; min-height: 680px; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; }
.mv-hero-img-wrap { position: absolute; inset: 0; width: 100%; height: 100%; }
.mv-hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.mv-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(4,14,13,0.15) 0%, rgba(4,14,13,0.05) 35%, rgba(10,25,24,0.72) 65%, rgba(10,25,24,0.97) 100%); }
.mv-hero-body { position: relative; z-index: 2; padding: 0 3rem 7rem; max-width: 1400px; }
.mv-eyebrow { font-size: 0.62rem; letter-spacing: 0.42em; text-transform: uppercase; color: #C8A76B; font-weight: 600; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.6rem; }
.mv-eyebrow::before { content: ''; flex-shrink: 0; width: 2.5rem; height: 1px; background: #C8A76B; }
.mv-hero-title { font-family: 'Cormorant', serif; font-size: clamp(3rem, 6.5vw, 7rem); font-weight: 400; line-height: 1.02; letter-spacing: -0.025em; color: #EDE8D5; margin-bottom: 0.75rem; }
.mv-hero-title em { font-style: italic; color: #C8A76B; }
.mv-hero-sub { font-size: 0.7rem; letter-spacing: 0.28em; text-transform: uppercase; color: #8A9890; margin-bottom: 3.5rem; }
.mv-hero-foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 3rem; flex-wrap: wrap; }
.mv-price-tag-label { font-size: 0.58rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A9890; margin-bottom: 0.4rem; }
.mv-price-tag-val { font-family: 'Cormorant', serif; font-size: clamp(1.7rem, 3vw, 2.8rem); font-weight: 600; color: #EDE8D5; line-height: 1.1; }
.mv-price-tag-usd { font-size: 0.78rem; color: #8A9890; margin-top: 0.3rem; }
.mv-ctas { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }

/* ── Buttons ── */
.mv-btn-gold { display: inline-flex; align-items: center; gap: 0.7rem; background: #C8A76B; color: #0A1918; font-family: 'Montserrat', sans-serif; font-size: 0.63rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 1.05rem 2rem; text-decoration: none; cursor: pointer; border: none; transition: background 0.2s; }
.mv-btn-gold:hover { background: #DEBF87; }
.mv-btn-ghost { display: inline-flex; align-items: center; gap: 0.7rem; background: transparent; color: #EDE8D5; font-family: 'Montserrat', sans-serif; font-size: 0.63rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; padding: 1.05rem 2rem; text-decoration: none; cursor: pointer; border: 1px solid rgba(237,232,213,0.3); transition: all 0.2s; }
.mv-btn-ghost:hover { border-color: #C8A76B; color: #C8A76B; }

/* ── Scroll hint ── */
@keyframes mv-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
.mv-scroll-hint { position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: #8A9890; font-size: 0.52rem; letter-spacing: 0.3em; text-transform: uppercase; }
.mv-scroll-line { width: 1px; height: 2.75rem; background: linear-gradient(to bottom, rgba(200,167,107,0.9), transparent); animation: mv-bounce 2.2s ease infinite; }

/* ── Specs bar ── */
.mv-specs { background: #0E2020; border-top: 1px solid rgba(200,167,107,0.13); border-bottom: 1px solid rgba(200,167,107,0.13); padding: 3.5rem 3rem; }
.mv-specs-grid { display: grid; grid-template-columns: repeat(6, 1fr); }
.mv-spec { padding: 1.5rem 1rem; text-align: center; border-right: 1px solid rgba(200,167,107,0.12); }
.mv-spec:last-child { border-right: none; }
.mv-spec-icon { color: #C8A76B; display: flex; justify-content: center; margin-bottom: 0.8rem; }
.mv-spec-val { font-family: 'Cormorant', serif; font-size: 1.75rem; font-weight: 600; color: #EDE8D5; line-height: 1; margin-bottom: 0.35rem; }
.mv-spec-lbl { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: #8A9890; }

/* ── Section header ── */
.mv-sh-eyebrow { font-size: 0.6rem; letter-spacing: 0.42em; text-transform: uppercase; color: #C8A76B; font-weight: 600; display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; }
.mv-sh-eyebrow::before { content: ''; flex-shrink: 0; width: 2rem; height: 1px; background: #C8A76B; }
.mv-sh-title { font-family: 'Cormorant', serif; font-size: clamp(2rem, 4vw, 3.8rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.01em; color: #EDE8D5; }
.mv-sh-title em { font-style: italic; color: #C8A76B; }

/* ── Features ── */
.mv-features { padding: 8rem 3rem; background: #0A1918; }
.mv-features-hd { max-width: 580px; margin-bottom: 5rem; }
.mv-feat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3px; }
.mv-feat-card { position: relative; overflow: hidden; aspect-ratio: 4/3; cursor: default; }
.mv-feat-card:hover .mv-feat-ph-inner { transform: scale(1.05); }
.mv-feat-ph-inner { transition: transform 0.65s ease; height: 100%; }
.mv-feat-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(4,14,13,0.97) 0%, rgba(4,14,13,0.5) 55%, rgba(4,14,13,0.1) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 2.5rem; }
.mv-feat-num { font-family: 'Cormorant', serif; font-size: 3rem; font-weight: 300; color: rgba(200,167,107,0.22); line-height: 1; margin-bottom: 0.5rem; }
.mv-feat-name { font-family: 'Cormorant', serif; font-size: 1.55rem; font-weight: 500; color: #EDE8D5; margin-bottom: 0.6rem; }
.mv-feat-desc { font-size: 0.73rem; line-height: 1.75; color: #8A9890; }

/* ── Gallery ── */
.mv-gallery { padding: 8rem 0; background: #0A1918; }
.mv-gallery-hd { padding: 0 3rem; margin-bottom: 3rem; }
.mv-gallery-vp { overflow: hidden; }
.mv-gallery-track { display: flex; gap: 1.5rem; padding-left: 3rem; transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94); will-change: transform; }
.mv-gallery-slide { flex: 0 0 68vw; max-width: 900px; }
.mv-gallery-ctrl { display: flex; align-items: center; gap: 1rem; padding: 2rem 3rem 0; }
.mv-gal-btn { width: 48px; height: 48px; border: 1px solid rgba(200,167,107,0.35); background: transparent; color: #C8A76B; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
.mv-gal-btn:hover:not(:disabled) { background: #C8A76B; color: #0A1918; }
.mv-gal-btn:disabled { opacity: 0.25; cursor: not-allowed; }
.mv-gal-count { font-family: 'Cormorant', serif; font-size: 1.2rem; color: #C8A76B; margin-left: auto; }
.mv-thumbs { display: flex; gap: 0.75rem; padding: 1.5rem 3rem 0; overflow-x: auto; scrollbar-width: none; }
.mv-thumbs::-webkit-scrollbar { display: none; }
.mv-thumb { flex: 0 0 90px; height: 62px; cursor: pointer; opacity: 0.35; border: 1.5px solid transparent; transition: opacity 0.25s, border-color 0.25s; overflow: hidden; }
.mv-thumb.is-active { opacity: 1; border-color: #C8A76B; }
.mv-thumb:hover { opacity: 0.75; }

/* ── Stats ── */
.mv-stats { padding: 8rem 3rem; background: linear-gradient(135deg, #0E2020 0%, #0A1918 100%); border-top: 1px solid rgba(200,167,107,0.1); border-bottom: 1px solid rgba(200,167,107,0.1); }
.mv-stats-hd { text-align: center; margin-bottom: 5rem; }
.mv-stats-hd .mv-sh-eyebrow { justify-content: center; }
.mv-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.mv-stat { text-align: center; }
.mv-stat-num { font-family: 'Cormorant', serif; font-size: clamp(3rem, 5vw, 5.5rem); font-weight: 600; color: #C8A76B; line-height: 1; margin-bottom: 0.75rem; }
.mv-stat-lbl { font-size: 0.63rem; letter-spacing: 0.22em; text-transform: uppercase; color: #8A9890; line-height: 1.75; }
@keyframes mv-fade-up { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
.mv-stat.is-visible { animation: mv-fade-up 0.6s ease both; }
.mv-stat:nth-child(2).is-visible { animation-delay: 0.1s; }
.mv-stat:nth-child(3).is-visible { animation-delay: 0.2s; }
.mv-stat:nth-child(4).is-visible { animation-delay: 0.3s; }

/* ── Location ── */
.mv-location { padding: 8rem 3rem; background: #F7F2E4; color: #1A1A17; }
.mv-location .mv-sh-eyebrow { color: #7A6438; }
.mv-location .mv-sh-eyebrow::before { background: #7A6438; }
.mv-location .mv-sh-title { color: #1A1A17; }
.mv-location .mv-sh-title em { color: #7A6438; }
.mv-loc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
.mv-loc-desc { font-size: 0.92rem; line-height: 1.95; color: #3E3E38; margin: 1.75rem 0 2.5rem; }
.mv-distances { }
.mv-dist-row { display: flex; align-items: center; justify-content: space-between; padding: 0.95rem 0; border-bottom: 1px solid rgba(26,26,23,0.08); }
.mv-dist-row:first-child { border-top: 1px solid rgba(26,26,23,0.08); }
.mv-dist-place { font-size: 0.78rem; letter-spacing: 0.03em; color: #3E3E38; }
.mv-dist-time { font-family: 'Cormorant', serif; font-size: 1.15rem; font-weight: 600; color: #7A6438; }
.mv-map-ph { background: #EDE7D5; border: 2px dashed #7A6438; min-height: 460px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.25rem; color: #7A6438; text-align: center; padding: 2.5rem; font-family: 'Montserrat', sans-serif; }
.mv-map-ph-title { font-family: 'Cormorant', serif; font-size: 1.3rem; font-weight: 500; }
.mv-map-ph-code { font-size: 0.6rem; background: rgba(122,100,56,0.12); padding: 4px 10px; border-radius: 3px; font-family: monospace; margin-top: 0.25rem; }
.mv-map-ph-hint { font-size: 0.6rem; opacity: 0.5; }

/* ── International Buyers ── */
.mv-intl { padding: 8rem 3rem; background: #0A1918; }
.mv-intl-hd { max-width: 700px; margin-bottom: 5rem; }
.mv-intl-title { font-family: 'Cormorant', serif; font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 400; color: #EDE8D5; line-height: 1.1; margin-bottom: 1.25rem; }
.mv-intl-title em { font-style: italic; color: #C8A76B; }
.mv-intl-sub { font-size: 0.82rem; line-height: 1.85; color: #8A9890; max-width: 580px; }
.mv-intl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
.mv-intl-card { background: #0E2020; padding: 3rem 2.5rem; border-bottom: 3px solid transparent; transition: border-color 0.3s, background 0.3s; }
.mv-intl-card:hover { border-color: #C8A76B; background: #122120; }
.mv-intl-icon { color: #C8A76B; margin-bottom: 1.75rem; }
.mv-intl-card-title { font-family: 'Cormorant', serif; font-size: 1.5rem; font-weight: 500; color: #EDE8D5; margin-bottom: 1rem; line-height: 1.2; }
.mv-intl-card-text { font-size: 0.78rem; line-height: 1.85; color: #8A9890; }

/* ── CTA Final ── */
.mv-cta-final { padding: 10rem 3rem; background: linear-gradient(to bottom, #0A1918, #040E0D); text-align: center; position: relative; overflow: hidden; }
.mv-cta-final::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 700px; height: 700px; background: radial-gradient(circle, rgba(200,167,107,0.05) 0%, transparent 65%); pointer-events: none; }
.mv-cta-vert-line { width: 1px; height: 5rem; background: linear-gradient(to bottom, transparent, #C8A76B); margin: 0 auto 3.5rem; }
.mv-cta-eyebrow { font-size: 0.58rem; letter-spacing: 0.5em; text-transform: uppercase; color: #C8A76B; margin-bottom: 2.25rem; }
.mv-cta-title { font-family: 'Cormorant', serif; font-size: clamp(2.8rem, 5.5vw, 5.5rem); font-weight: 300; color: #EDE8D5; line-height: 1.08; margin-bottom: 1rem; }
.mv-cta-title em { font-style: italic; color: #C8A76B; }
.mv-cta-sub { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #8A9890; margin-bottom: 4rem; }
.mv-wa-btn { display: inline-flex; align-items: center; gap: 1rem; background: #1DB954; color: #FFF; font-family: 'Montserrat', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 1.3rem 3rem; text-decoration: none; cursor: pointer; transition: background 0.2s, transform 0.2s; }
.mv-wa-btn:hover { background: #17A348; transform: translateY(-2px); }
.mv-wa-note { margin-top: 1.75rem; font-size: 0.67rem; color: #8A9890; letter-spacing: 0.12em; }

/* ── Footer ── */
.mv-footer { background: #040E0D; padding: 4.5rem 3rem 2.5rem; border-top: 1px solid rgba(200,167,107,0.1); }
.mv-footer-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 3rem; margin-bottom: 3rem; flex-wrap: wrap; }
.mv-footer-brand { font-family: 'Cormorant', serif; font-size: 1rem; letter-spacing: 0.4em; text-transform: uppercase; color: #C8A76B; margin-bottom: 0.5rem; }
.mv-footer-tagline { font-size: 0.68rem; color: #8A9890; letter-spacing: 0.08em; }
.mv-footer-links a { display: block; font-size: 0.72rem; color: #8A9890; text-decoration: none; margin-bottom: 0.5rem; transition: color 0.2s; }
.mv-footer-links a:hover { color: #C8A76B; }
.mv-footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1.75rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
.mv-footer-legal { font-size: 0.58rem; color: #8A9890; letter-spacing: 0.06em; }

/* ── Image Placeholder ── */
.mv-ph { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.85rem; background: linear-gradient(145deg, #122120 0%, #0A1918 100%); border: 2px dashed rgba(200,167,107,0.45); color: #C8A76B; text-align: center; padding: 2.5rem; width: 100%; height: 100%; font-family: 'Montserrat', sans-serif; }
.mv-ph-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; line-height: 1.5; }
.mv-ph-size { font-size: 0.58rem; opacity: 0.5; margin-top: -0.25rem; }
.mv-ph-light { background: linear-gradient(145deg, #EDE7D5 0%, #E4DEC8 100%); border-color: rgba(122,100,56,0.45); color: #7A6438; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .mv-specs-grid { grid-template-columns: repeat(3,1fr); }
  .mv-spec:nth-child(3) { border-right: none; }
  .mv-spec:nth-child(4), .mv-spec:nth-child(5), .mv-spec:nth-child(6) { border-top: 1px solid rgba(200,167,107,0.12); }
  .mv-stats-grid { grid-template-columns: repeat(2,1fr); gap: 3rem; }
  .mv-loc-grid { grid-template-columns: 1fr; gap: 3rem; }
  .mv-intl-grid { grid-template-columns: 1fr; gap: 3px; }
  .mv-feat-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .mv-nav { padding: 1.5rem; }
  .mv-nav.is-scrolled { padding: 1rem 1.5rem; }
  .mv-nav-links { display: none; }
  .mv-hero-body { padding: 0 1.5rem 5rem; }
  .mv-hero-foot { flex-direction: column; align-items: flex-start; gap: 2rem; }
  .mv-ctas { flex-direction: column; align-items: flex-start; }
  .mv-specs { padding: 2.5rem 1.5rem; }
  .mv-specs-grid { grid-template-columns: repeat(2,1fr); }
  .mv-spec:nth-child(2) { border-right: none; }
  .mv-spec:nth-child(3), .mv-spec:nth-child(4), .mv-spec:nth-child(5), .mv-spec:nth-child(6) { border-top: 1px solid rgba(200,167,107,0.12); }
  .mv-spec:nth-child(3) { border-right: 1px solid rgba(200,167,107,0.12); }
  .mv-spec:nth-child(5) { border-right: 1px solid rgba(200,167,107,0.12); }
  .mv-features { padding: 5rem 1.5rem; }
  .mv-gallery { padding: 5rem 0; }
  .mv-gallery-hd { padding: 0 1.5rem; }
  .mv-gallery-slide { flex: 0 0 82vw; }
  .mv-gallery-ctrl { padding: 1.75rem 1.5rem 0; }
  .mv-thumbs { padding: 1.25rem 1.5rem 0; }
  .mv-stats { padding: 5rem 1.5rem; }
  .mv-location { padding: 5rem 1.5rem; }
  .mv-intl { padding: 5rem 1.5rem; }
  .mv-cta-final { padding: 6rem 1.5rem; }
  .mv-footer { padding: 3.5rem 1.5rem 2rem; }
  .mv-footer-top { flex-direction: column; gap: 2rem; }
  .mv-footer-bottom { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .mv-scroll-line, .mv-stat { animation: none !important; }
  .mv-gallery-track { transition: none; }
}
`;

// ─── PLACEHOLDER DE IMAGEN ─────────────────────────────────────────────────────
function Placeholder({ label, size, style = {}, light = false }) {
  return (
    <div className={`mv-ph${light ? ' mv-ph-light' : ''}`} style={style}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      {label && <p className="mv-ph-label">{label}</p>}
      {size  && <p className="mv-ph-size">Recomendado: {size}</p>}
    </div>
  );
}

// ─── SVG ICONS ─────────────────────────────────────────────────────────────────
const Icons = {
  House:   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Land:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>,
  Bed:     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4v16M22 4v16M2 8h20M2 16h20"/><rect x="6" y="8" width="5" height="5" rx="1"/><rect x="13" y="8" width="5" height="5" rx="1"/></svg>,
  Bath:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6 9 2 5 2"/><path d="M2 12h20v2a8 8 0 0 1-16 0v-2"/><path d="M2 12V7a2 2 0 0 1 2-2h1"/></svg>,
  Pool:    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12 C4 10 6 14 8 12 C10 10 12 14 14 12 C16 10 18 14 20 12 C22 10 22 12 22 12"/><path d="M2 18 C4 16 6 20 8 18 C10 16 12 20 14 18 C16 16 18 20 20 18"/><path d="M7 4 L7 10"/><path d="M17 4 L17 10"/><path d="M7 4 L17 4"/></svg>,
  Shield:  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Pin:     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Card:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Globe:   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Dollar:  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  WA:      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.127 1.529 5.863L.073 23.927l6.263-1.438A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.86 0-3.604-.5-5.106-1.373l-.367-.216-3.714.852.868-3.614-.237-.383A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>,
  ChevL:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevR:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  Img:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
};

// ─── GALERÍA — datos ──────────────────────────────────────────────────────────
const GALLERY = [
  { label: 'Vista al Lago desde la Terraza Principal',  size: '1400×900px' },
  { label: 'Fachada Principal · Acceso al Conjunto',     size: '1400×900px' },
  { label: 'Piscina Privada · Vista al Jardín',          size: '1400×900px' },
  { label: 'Sala Principal · Doble Altura',              size: '1400×900px' },
  { label: 'Suite Master con Vista al Lago',             size: '1400×900px' },
  { label: 'Cocina Tipo Gourmet con Isla Central',       size: '1400×900px' },
  { label: 'Terraza y Zona de Bienestar al Aire Libre',  size: '1400×900px' },
  { label: 'Vista Aérea · Conjunto Malabar y el Lago',   size: '1600×1050px' },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function MalabarVista() {
  const [scrolled,      setScrolled]      = useState(false);
  const [slide,         setSlide]         = useState(0);
  const [statsVisible,  setStatsVisible]  = useState(false);
  const [counts,        setCounts]        = useState({ val: 0, min: 0, m2: 0 });

  const trackRef  = useRef(null);
  const statsRef  = useRef(null);

  // ── Navbar scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Gallery translate ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!trackRef.current) return;
    const slides = trackRef.current.querySelectorAll('.mv-gallery-slide');
    if (!slides[0]) return;
    // gap between slides = 1.5rem = 24px
    const w = slides[0].offsetWidth + 24;
    trackRef.current.style.transform = `translateX(${-slide * w}px)`;
  }, [slide]);

  // ── Stats intersection observer ───────────────────────────────────────────
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── Animated counters ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!statsVisible) return;
    const target = { val: 12, min: 15, m2: 2000 };
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const p    = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounts({
        val: Math.round(target.val * ease),
        min: Math.round(target.min * ease),
        m2:  Math.round(target.m2  * ease),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [statsVisible]);

  const goSlide = (n) => setSlide(Math.max(0, Math.min(GALLERY.length - 1, n)));

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="mv">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <nav className={`mv-nav${scrolled ? ' is-scrolled' : ''}`}>
        <a href="#hero" className="mv-nav-logo">Malabar Vista</a>
        <ul className="mv-nav-links">
          <li><a href="#propiedad">La Propiedad</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#ubicacion">Ubicación</a></li>
          <li><a href="#inversion">Inversión</a></li>
        </ul>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="mv-nav-cta">
          Agendar Visita
        </a>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section id="hero" className="mv-hero">
        <div className="mv-hero-img-wrap">
          {/* REEMPLAZAR: foto del lago Malabar al atardecer — mejor con drone */}
          <Placeholder
            label="Foto Principal · Vista al Lago desde la Casa"
            size="1920×1080px mínimo — Drone o gran angular al atardecer"
            style={{ position: 'absolute', inset: 0, border: 'none', borderRadius: 0 }}
          />
        </div>
        <div className="mv-hero-overlay" />

        <div className="mv-hero-body">
          <p className="mv-eyebrow">Cerritos Malabar · Pereira, Risaralda</p>
          <h1 className="mv-hero-title">
            Una Vista que<br />
            <em>Pocos Privilegiados</em><br />
            Conocerán
          </h1>
          <p className="mv-hero-sub">
            Casa Campestre de Lujo · Vista Directa al Lago · Conjunto Cerrado · Seguridad 24/7
          </p>
          <div className="mv-hero-foot">
            <div>
              <p className="mv-price-tag-label">Precio de venta</p>
              <p className="mv-price-tag-val">$6.500.000.000 COP</p>
              <p className="mv-price-tag-usd">≈ USD $1.780.000 &nbsp;·&nbsp; Precio negociable &nbsp;·&nbsp; Venta directa</p>
            </div>
            <div className="mv-ctas">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="mv-btn-gold">
                {Icons.WA}
                Agendar Visita Privada
              </a>
              <a href="#galeria" className="mv-btn-ghost">
                {Icons.Img}
                Ver Galería
              </a>
            </div>
          </div>
        </div>

        <div className="mv-scroll-hint" aria-hidden="true">
          <span>Descubrir</span>
          <div className="mv-scroll-line" />
        </div>
      </section>

      {/* ══ SPECS BAR ═══════════════════════════════════════════════════════ */}
      <section id="propiedad" className="mv-specs">
        <div className="mv-specs-grid">
          {[
            { icon: Icons.House,  val: '500 m²',    lbl: 'Área Construida'   },
            { icon: Icons.Land,   val: '2.000 m²',  lbl: 'Lote Total'        },
            { icon: Icons.Bed,    val: '3 Suites',  lbl: 'Con Baño Privado'  },
            { icon: Icons.Bath,   val: '3 Baños',   lbl: 'Baños Completos'   },
            { icon: Icons.Pool,   val: 'Piscina',   lbl: 'Privada'           },
            { icon: Icons.Shield, val: '24/7',      lbl: 'Seguridad'         },
          ].map((s, i) => (
            <div key={i} className="mv-spec">
              <div className="mv-spec-icon">{s.icon}</div>
              <div className="mv-spec-val">{s.val}</div>
              <div className="mv-spec-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section className="mv-features">
        <div className="mv-features-hd">
          <p className="mv-sh-eyebrow">Diferenciales únicos</p>
          <h2 className="mv-sh-title">
            Por qué esta casa<br />
            no tiene <em>igual</em><br />
            en Malabar
          </h2>
        </div>
        <div className="mv-feat-grid">
          {[
            {
              num: '01',
              name: 'Vista Directa al Lago',
              desc: 'De las poquísimas propiedades en Cerritos Malabar con acceso visual privilegiado al lago. Una rareza en el mercado que incrementa su valor cada año y que difícilmente volverá a estar disponible.',
              label: 'Vista del lago desde la terraza — foto panorámica',
              size: '900×680px',
            },
            {
              num: '02',
              name: 'Diseño Arquitectónico',
              desc: 'Espacios de doble altura, ventanales del piso al techo y una integración perfecta entre el interior y el paisaje natural. Cada rincón ha sido pensado para maximizar la experiencia visual y sensorial.',
              label: 'Interior — sala doble altura y ventanales al jardín',
              size: '900×680px',
            },
            {
              num: '03',
              name: 'Piscina en 2.000 m² Propios',
              desc: '2.000 metros cuadrados que le otorgan privacidad total, jardines amplios y una piscina privada rodeada de naturaleza tropical. El espacio que toda familia de alto perfil merece.',
              label: 'Piscina privada y zona exterior',
              size: '900×680px',
            },
            {
              num: '04',
              name: 'Cerritos Malabar — Eje Cafetero',
              desc: 'La dirección más codiciada de Pereira: conjunto cerrado, vecinos de alto perfil y a solo 15 minutos del aeropuerto Matecaña. Acceso inmediato al Club Campestre y la Ruta del Café UNESCO.',
              label: 'Fachada y entorno del conjunto Malabar',
              size: '900×680px',
            },
          ].map((f, i) => (
            <div key={i} className="mv-feat-card">
              <div className="mv-feat-ph-inner">
                <Placeholder label={f.label} size={f.size} style={{ height: '100%', borderRadius: 0, border: 'none' }} />
              </div>
              <div className="mv-feat-overlay">
                <div className="mv-feat-num">{f.num}</div>
                <div className="mv-feat-name">{f.name}</div>
                <div className="mv-feat-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ GALERÍA ═════════════════════════════════════════════════════════ */}
      <section id="galeria" className="mv-gallery">
        <div className="mv-gallery-hd">
          <p className="mv-sh-eyebrow">Galería</p>
          <h2 className="mv-sh-title">
            Cada espacio,<br />una <em>experiencia</em>
          </h2>
        </div>

        <div className="mv-gallery-vp">
          <div className="mv-gallery-track" ref={trackRef}>
            {GALLERY.map((img, i) => (
              <div key={i} className="mv-gallery-slide">
                <Placeholder label={img.label} size={img.size} style={{ height: '500px', borderRadius: 0 }} />
              </div>
            ))}
          </div>
        </div>

        <div className="mv-gallery-ctrl">
          <button className="mv-gal-btn" onClick={() => goSlide(slide - 1)} disabled={slide === 0} aria-label="Anterior">
            {Icons.ChevL}
          </button>
          <button className="mv-gal-btn" onClick={() => goSlide(slide + 1)} disabled={slide === GALLERY.length - 1} aria-label="Siguiente">
            {Icons.ChevR}
          </button>
          <span className="mv-gal-count">
            {String(slide + 1).padStart(2, '0')}
            <span style={{ color: C.muted, fontSize: '0.8em' }}> / {String(GALLERY.length).padStart(2, '0')}</span>
          </span>
        </div>

        <div className="mv-thumbs">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`mv-thumb${i === slide ? ' is-active' : ''}`}
              onClick={() => goSlide(i)}
              role="button"
              aria-label={img.label}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goSlide(i)}
            >
              <Placeholder label="" size="" style={{ width: '100%', height: '100%', padding: '0.25rem', border: 'none' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ STATS / NÚMEROS ANIMADOS ═════════════════════════════════════════ */}
      <section className="mv-stats" ref={statsRef}>
        <div className="mv-stats-hd">
          <p className="mv-sh-eyebrow">Datos que respaldan la inversión</p>
          <h2 className="mv-sh-title">
            Los números <em>hablan</em>
          </h2>
        </div>
        <div className="mv-stats-grid">
          {[
            { num: `${counts.val}%`,                   lbl: 'Valorización anual\npromedio en Cerritos'         },
            { num: `${counts.min} min`,                 lbl: 'Aeropuerto Internacional\nMatecaña'               },
            { num: `${counts.m2.toLocaleString()} m²`,  lbl: 'Lote privado con\njardines y piscina'            },
            { num: '#1',                                lbl: 'Sector más exclusivo\ndel Eje Cafetero'           },
          ].map((s, i) => (
            <div key={i} className={`mv-stat${statsVisible ? ' is-visible' : ''}`}>
              <div className="mv-stat-num">{s.num}</div>
              <div className="mv-stat-lbl" style={{ whiteSpace: 'pre-line' }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ UBICACIÓN ════════════════════════════════════════════════════════ */}
      <section id="ubicacion" className="mv-location">
        <div className="mv-loc-grid">
          <div>
            <p className="mv-sh-eyebrow">Ubicación privilegiada</p>
            <h2 className="mv-sh-title">
              Cerritos Malabar,<br /><em>Pereira</em>
            </h2>
            <p className="mv-loc-desc">
              Cerritos es el sector campestre más codiciado de Pereira y de todo el Eje Cafetero.
              Malabar es la joya de Cerritos: conjuntos cerrados de alta seguridad, lotes amplios,
              vegetación exuberante y vistas privilegiadas al lago. Una dirección que se pronuncia
              con distinción y que concentra a las familias de mayor poder adquisitivo de la región.
            </p>
            <div className="mv-distances">
              {[
                ['Aeropuerto Internacional Matecaña',  '15 min'],
                ['Club Campestre de Pereira',          '10 min'],
                ['C.C. Parque Arboleda',               '18 min'],
                ['Centro de Pereira',                  '22 min'],
                ['Ruta del Café — Patrimonio UNESCO',  '35 min'],
                ['Armenia / Manizales',                '1h – 1h 15'],
              ].map(([place, time], i) => (
                <div key={i} className="mv-dist-row">
                  <span className="mv-dist-place">{place}</span>
                  <span className="mv-dist-time">{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/*
              REEMPLAZAR: pegar aquí el <iframe> de Google Maps
              1. Abrir Google Maps → buscar "Cerritos Malabar, Pereira"
              2. Compartir → Insertar mapa → Copiar HTML
              3. Cambiar width/height por width="100%" height="460"
              4. Eliminar este bloque mv-map-ph
            */}
            <div className="mv-map-ph">
              {Icons.Pin}
              <p className="mv-map-ph-title">Cerritos Malabar, Pereira</p>
              <p style={{ fontSize: '0.7rem', opacity: 0.7, lineHeight: 1.6 }}>Insertar embed de Google Maps aquí</p>
              <code className="mv-map-ph-code">
                {'<iframe src="https://maps.google.com/..." width="100%" height="460" />'}
              </code>
              <p className="mv-map-ph-hint">Ancho: 100% · Alto: 460px</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ INTERNATIONAL BUYERS ═════════════════════════════════════════════ */}
      <section id="inversion" className="mv-intl">
        <div className="mv-intl-hd">
          <p className="mv-sh-eyebrow">For International Buyers</p>
          <h2 className="mv-intl-title">
            Why Colombia.<br /><em>Why Now.</em>
          </h2>
          <p className="mv-intl-sub">
            Colombia's Eje Cafetero is one of Latin America's most compelling luxury real estate markets.
            Strong fundamentals, UNESCO-recognized natural beauty, and favorable exchange rates make
            this an exceptional window for international investors and diaspora buyers.
          </p>
        </div>
        <div className="mv-intl-grid">
          <div className="mv-intl-card">
            <div className="mv-intl-icon">{Icons.Card}</div>
            <h3 className="mv-intl-card-title">Investor Visa Eligibility</h3>
            <p className="mv-intl-card-text">
              Colombia's Visa M (Investor category) allows foreign nationals who invest a minimum of
              650 SMMLV (~USD $170,000) in real estate to obtain a renewable Colombian visa — a clear
              path to residency. This property qualifies comfortably, opening the door to living in
              one of South America's most vibrant and stable economies.
            </p>
          </div>
          <div className="mv-intl-card">
            <div className="mv-intl-icon">{Icons.Globe}</div>
            <h3 className="mv-intl-card-title">UNESCO Coffee Region</h3>
            <p className="mv-intl-card-text">
              The Coffee Cultural Landscape of Colombia (Paisaje Cultural Cafetero) — surrounding
              Pereira — is a UNESCO World Heritage Site. It draws a growing audience of experiential
              travelers, digital nomads, and investors seeking authentic cultural destinations with
              world-class connectivity: 2 international airports within 90 minutes.
            </p>
          </div>
          <div className="mv-intl-card">
            <div className="mv-intl-icon">{Icons.Dollar}</div>
            <h3 className="mv-intl-card-title">USD Exchange Advantage</h3>
            <p className="mv-intl-card-text">
              With the COP/USD exchange currently favorable for dollar-holders, international buyers
              gain significant purchasing power. At ~$4,100 COP per USD, this property represents
              exceptional value compared to equivalent luxury real estate in Miami, Medellín's
              El Poblado, or Panama City — at a fraction of the price, with 12%+ annual appreciation.
            </p>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════════════════════ */}
      <section className="mv-cta-final">
        <div className="mv-cta-vert-line" aria-hidden="true" />
        <p className="mv-cta-eyebrow">Vista exclusiva al lago · Cerritos Malabar · Precio negociable</p>
        <h2 className="mv-cta-title">
          Agende su<br />
          <em>Visita Privada</em>
        </h2>
        <p className="mv-cta-sub">
          Visitas con cita previa · Propietario directo · Sin intermediarios
        </p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="mv-wa-btn">
          {Icons.WA}
          Contactar por WhatsApp
        </a>
        <p className="mv-wa-note">+57 321 766 4826 &nbsp;·&nbsp; Respuesta inmediata &nbsp;·&nbsp; Mensaje prellenado</p>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer className="mv-footer">
        <div className="mv-footer-top">
          <div>
            <div className="mv-footer-brand">Malabar Vista</div>
            <div className="mv-footer-tagline">Casa Campestre de Lujo · Cerritos Malabar, Pereira</div>
          </div>
          <div className="mv-footer-links">
            <a href={WA} target="_blank" rel="noopener noreferrer">+57 321 766 4826 (WhatsApp)</a>
            <a href="tel:+573217664826">Llamar al propietario</a>
            <span style={{ fontSize: '0.72rem', color: '#8A9890' }}>Conjunto Malabar · Cerritos · Pereira, Risaralda</span>
          </div>
        </div>
        <div className="mv-footer-bottom">
          <p className="mv-footer-legal">
            © {new Date().getFullYear()} · Venta directa por propietario · Todos los derechos reservados
          </p>
          <p className="mv-footer-legal">
            Precio en COP · Sujeto a negociación · Visitas con cita previa
          </p>
        </div>
      </footer>
    </div>
  );
}
