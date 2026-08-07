/* hero.js — Lithos Spotlight */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO SPOTLIGHT (canvas mask, lithos)
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

  /* ── 1. Dessine le spotlight normalement ── */
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

  /* ── 2. Fondu progressif vers le haut (pas de coupure sèche) ──
     destination-in : multiplie l'alpha existant par le nouveau
     → spotlight s'estompe doucement dans la zone titre           */
  const fadeFrom = canvas.height * 0.05;  /* totalement caché au-dessus (nav) */
  const fadeTo   = canvas.height * 0.36;  /* totalement visible en-dessous    */

  const fadeGrad = ctx.createLinearGradient(0, fadeFrom, 0, fadeTo);
  fadeGrad.addColorStop(0, 'rgba(0,0,0,0)'); /* transparent → spotlight invisible */
  fadeGrad.addColorStop(1, 'rgba(0,0,0,1)'); /* opaque     → spotlight plein      */

  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = fadeGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'source-over'; /* reset obligatoire */

  /* ── 3. Applique le masque sur le reveal layer ── */
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
