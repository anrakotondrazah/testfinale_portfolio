/* aria.js — ARIA chat assistant (Groq via /api/chat). Auto-trigger 10s. */

const GREETINGS = {
  welcome: {
    en: "Hey, I'm ARIA — the AI assistant built into Andry's portfolio. Tell me what brings you here today. Are you looking for a developer for a project? A recruiter? Curious about what's built here? Just tell me and I'll adapt instantly.",
    fr: "Hey, je suis ARIA — l'assistante IA intégrée dans le portfolio d'Andry. Dis-moi ce qui t'amène aujourd'hui. Tu cherches un développeur ? Tu es recruteur ? Juste curieux ? Dis-moi et je m'adapte instantanément."
  },
  demo: {
    en: "Hi! I'm ARIA. I'd love to learn about your business so we can show you exactly how a Voice AI Agent could work for you. What type of business do you run?",
    fr: "Bonjour ! Je suis ARIA. J'aimerais en savoir plus sur ton activité pour te montrer concrètement comment un Agent Vocal IA pourrait fonctionner. Quel type d'entreprise as-tu ?"
  },
  project: {
    en: "Hello! I'm here to help scope your project with Andry. What kind of digital solution are you looking to build or improve?",
    fr: "Bonjour ! Je suis là pour explorer ton projet avec Andry. Quel type de solution digitale cherches-tu à créer ou améliorer ?"
  }
};

let _history = [], _mode = 'welcome', _ready = true, _count = 0, _autoShown = false;

function addMsg(text, role) {
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = text.replace(/\n/g, '<br/>');
  const msgs = document.getElementById('aria-messages');
  msgs.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function openAria(mode) {
  _mode = mode || 'welcome';
  _history = []; _ready = true; _count = 0;
  document.getElementById('aria-modal').classList.add('open');
  document.getElementById('aria-messages').innerHTML = '';
  document.getElementById('aria-notify').style.display = 'none';
  const lang = _lang || 'en';
  const greeting = (GREETINGS[_mode] || GREETINGS.welcome)[lang];
  setTimeout(() => {
    addMsg(greeting, 'ai');
    _history.push({ role: 'assistant', content: greeting });
  }, 350);
}

function closeAria() {
  document.getElementById('aria-modal').classList.remove('open');
}

function sendAria() {
  if (!_ready) return;
  const input = document.getElementById('aria-input');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';
  addMsg(text, 'user');
  _history.push({ role: 'user', content: text });
  _count++;
  _ready = false;
  document.getElementById('aria-typing').style.display = 'block';

  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: _history.slice(-12),
      language: (_lang || 'en').toUpperCase(),
      mode: _mode
    })
  })
  .then(r => r.json())
  .then(data => {
    document.getElementById('aria-typing').style.display = 'none';
    const reply = data.message || 'Connection issue. Please contact Andry directly.';
    addMsg(reply, 'ai');
    _history.push({ role: 'assistant', content: reply });
    _ready = true;
    if (_count >= 3) document.getElementById('aria-notify').style.display = 'block';
  })
  .catch(() => {
    document.getElementById('aria-typing').style.display = 'none';
    addMsg('Connection issue. Please reach Andry at anrakotondrazah@gmail.com or WhatsApp +261 34 62 232 89', 'ai');
    _ready = true;
  });
}

function notifyAndry() {
  const summary = _history.filter(m => m.role==='user').map((m,i) => `${i+1}. ${m.content}`).join(' | ');
  const msg = encodeURIComponent(`Hi Andry! A visitor used ARIA (${_mode}):\n\n${summary}\n\nPlease follow up!`);
  window.open(`https://wa.me/261346223289?text=${msg}`, '_blank');
}

document.getElementById('aria-input')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAria(); }
});

/* Auto-trigger hint after 10s */
setTimeout(() => {
  if (_autoShown || document.getElementById('aria-modal').classList.contains('open')) return;
  _autoShown = true;
  const hint = document.getElementById('aria-hint');
  const lang = _lang || 'en';
  if (hint) {
    hint.textContent = lang === 'fr'
      ? "Hey, je suis ARIA — posez n'importe quelle question sur Andry."
      : "Hey, I'm ARIA — ask me anything about Andry's work.";
    hint.classList.add('show');
    setTimeout(() => hint.classList.remove('show'), 5000);
  }
}, 10000);
