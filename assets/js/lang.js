/* lang.js — EN/FR toggle. Reads data-en / data-fr on every element. */

let _lang = 'en';

function setLang(lang) {
  _lang = lang;
  document.querySelectorAll('[data-en],[data-fr]').forEach(el => {
    const txt = el.getAttribute('data-' + lang);
    if (txt !== null) el.innerHTML = txt;
  });
  const btnEn = document.getElementById('btn-en');
  const btnFr = document.getElementById('btn-fr');
  if (btnEn) { btnEn.className = lang==='en' ? 'lang-active' : 'lang-inactive'; }
  if (btnFr) { btnFr.className = lang==='fr' ? 'lang-active' : 'lang-inactive'; }
  document.documentElement.lang = lang;
  const inp = document.getElementById('aria-input');
  if (inp) inp.placeholder = lang==='fr' ? 'Écrivez votre message...' : 'Type your message...';
}

/* Re-apply to a single container (called on about panel switch) */
function applyLangToEl(el) {
  if (!el) return;
  el.querySelectorAll('[data-en],[data-fr]').forEach(child => {
    const txt = child.getAttribute('data-' + _lang);
    if (txt !== null) child.innerHTML = txt;
  });
}

window.addEventListener('load', () => setLang('en'));
