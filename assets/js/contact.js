/* contact.js — Contact video, section reveals, nav active, marquee duplicate */

/* Contact video — IntersectionObserver */
const contactSection = document.getElementById('contact');
const contactVid     = document.getElementById('contact-vid');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { contactVid.classList.add('visible'); contactVid.play().catch(()=>{}); }
    else                  { contactVid.classList.remove('visible'); contactVid.pause(); }
  });
}, { threshold: 0.1 }).observe(contactSection);

/* Section reveals */
document.querySelectorAll('.section-reveal').forEach(el => {
  new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
    { threshold: 0.12 }
  ).observe(el);
});

/* Nav active link */
const navLinks    = document.querySelectorAll('.nav-pill a');
const navSections = ['hero','about-wrapper','services','projects','contact']
  .map(id => document.getElementById(id));
window.addEventListener('scroll', () => {
  const mid = window.scrollY + window.innerHeight / 2;
  let cur = 0;
  navSections.forEach((s,i) => { if (s && s.offsetTop <= mid) cur = i; });
  navLinks.forEach((a,i) => a.classList.toggle('active', i === cur));
}, { passive: true });

/* Marquee — duplicate cards for infinite loop */
const track = document.querySelector('.marquee-track');
if (track) track.innerHTML += track.innerHTML;
