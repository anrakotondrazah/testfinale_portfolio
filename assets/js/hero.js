/* hero.js — Lithos Spotlight. Exact copy from working base. */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. HERO SPOTLIGHT (canvas mask, lithos)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const canvas = document.getElementById('hero-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const revealLayer = document.getElementById('hero-reveal');

let mx = -999, my = -999, sx = -999, sy = -999;
const RADIUS = 260;

function lerp(a, b, t) { return a + (b - a) * t; }

function drawMask() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (sx < 0) {
    revealLayer.style.webkitMaskImage = 'none';
    revealLayer.style.maskImage       = 'none';
    return;
  }

  /* ── Zone protégée : spotlight interdit dans le haut 30% (titres/nav) ── */
  const safeTop = canvas.height * 0.30;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, safeTop, canvas.width, canvas.height - safeTop);
  ctx.clip();
  /* ─────────────────────────────────────────────────────────────────────── */

  const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, RADIUS);
  grad.addColorStop(0,    'rgba(255,255,255,1)');
  grad.addColorStop(0.4,  'rgba(255,255,255,1)');
  grad.addColorStop(0.6,  'rgba(255,255,255,0.75)');
  grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
  grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1,    'rgba(255,255,255,0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(sx, sy, RADIUS, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore(); /* ← libère le clip */

  const dataURL = canvas.toDataURL();
  revealLayer.style.webkitMaskImage = `url(${dataURL})`;
  revealLayer.style.maskImage        = `url(${dataURL})`;
  revealLayer.style.webkitMaskSize  = '100% 100%';
  revealLayer.style.maskSize         = '100% 100%';
}

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function tick() {
  if (sx < 0 && mx > 0) { sx = mx; sy = my; }
  sx = lerp(sx, mx, 0.09);
  sy = lerp(sy, my, 0.09);
  drawMask();
  requestAnimationFrame(tick);
})();

window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});
