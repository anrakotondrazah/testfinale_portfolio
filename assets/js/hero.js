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
const RADIUS = 280;

function lerp(a, b, t) { return a + (b - a) * t; }

function drawMask() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (sx < 0) {
    // Avant survol : masque tout (photo non visible)
    revealLayer.style.webkitMaskImage = 'none';
    revealLayer.style.maskImage = 'none';
    return;
  }

  const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, RADIUS);
  grad.addColorStop(0,    'rgba(255,255,255,1)');
  grad.addColorStop(0.45, 'rgba(255,255,255,1)');
  grad.addColorStop(0.65, 'rgba(255,255,255,0.7)');
  grad.addColorStop(0.80, 'rgba(255,255,255,0.3)');
  grad.addColorStop(1,    'rgba(255,255,255,0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(sx, sy, RADIUS, 0, Math.PI * 2);
  ctx.fill();

  const dataURL = canvas.toDataURL();
  revealLayer.style.webkitMaskImage = `url(${dataURL})`;
  revealLayer.style.maskImage        = `url(${dataURL})`;
  revealLayer.style.webkitMaskSize  = '100% 100%';
  revealLayer.style.maskSize         = '100% 100%';
}

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function tick() {
  // Initialisation au premier mouvement de souris
  if (sx < 0 && mx > 0) { sx = mx; sy = my; }
  sx = lerp(sx, mx, 0.09);
  sy = lerp(sy, my, 0.09);
  drawMask();
  requestAnimationFrame(tick);
})();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});