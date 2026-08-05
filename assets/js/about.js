/* about.js — 4-video scroll section. Exact copy from working base. */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. ABOUT — lecture vidéo fluide (play/pause, PAS scrubbing)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const aboutVideos  = [
  document.getElementById('av1'),
  document.getElementById('av2'),
  document.getElementById('av3'),
  document.getElementById('av4'),
];
const aboutPanels  = [
  document.getElementById('ap1'),
  document.getElementById('ap2'),
  document.getElementById('ap3'),
  document.getElementById('ap4'),
];
const aboutDots    = document.querySelectorAll('.about-dot');
const aboutWrapper = document.getElementById('about-wrapper');
let activeStep = 0;

// Préchargement
aboutVideos.forEach(v => v && v.load());

// Démarrer la première vidéo
aboutVideos[0].play().catch(() => {});

function switchStep(step) {
  if (step === activeStep) return;
  activeStep = step;

  aboutVideos.forEach((v, i) => {
    if (!v) return;
    if (i === step) {
      v.classList.add('active');
      v.play().catch(() => {});
    } else {
      v.classList.remove('active');
      v.pause();
    }
  });

  aboutPanels.forEach((p, i) => {
    if (!p) return;
    p.classList.toggle('active', i === step);
  });

  aboutDots.forEach((d, i) => {
    d.classList.toggle('active', i === step);
  });
}

// Scroll → switch de vidéo (pas de seeking, juste play/pause)
window.addEventListener('scroll', () => {
  if (!aboutWrapper) return;
  const rect    = aboutWrapper.getBoundingClientRect();
  const total   = aboutWrapper.offsetHeight - window.innerHeight;
  const scrolled = Math.max(0, -rect.top);
  const progress = Math.min(1, scrolled / total);

  // Chaque vidéo couvre 25% du scroll
  const step = Math.min(3, Math.floor(progress * 4));
  switchStep(step);
}, { passive: true });

// Clic sur les dots
aboutDots.forEach(dot => { 
    dot.addEventListener('click', () => { 
        const step = parseInt(dot.dataset.step); 
        const targetScroll = aboutWrapper.offsetTop + (step / 4) * (aboutWrapper.offsetHeight - window.innerHeight); 
        
        window.scrollTo({ 
            top: targetScroll, 
            behavior: 'smooth' 
        }); 
    });
});
