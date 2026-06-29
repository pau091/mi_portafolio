/* =========================================================
   PORTAFOLIO - JS principal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveLink();
  initTerminalTyping();
  initScrollReveal();
  initBackToTop();
  initContactForm();
  initYear();
});

/* ---------- Menú móvil ---------- */
function initNavToggle() {
  const toggle = document.querySelector('.nav__toggle');
  const list = document.querySelector('.nav__list');
  if (!toggle || !list) return;

  toggle.addEventListener('click', () => {
    const isOpen = list.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  list.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      list.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Resaltar link activo según sección visible ---------- */
function initActiveLink() {
  const links = document.querySelectorAll('.nav__list a');
  const sections = document.querySelectorAll('main section[id]');
  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Efecto de tipeo en la terminal del hero ---------- */
function initTerminalTyping() {
  const body = document.querySelector('[data-terminal-body]');
  if (!body) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { prompt: 'visitante@portafolio:~$', text: 'whoami' },
    { output: true, text: body.dataset.name || 'Desarrollador/a Junior' },
    { prompt: 'visitante@portafolio:~$', text: 'cat sobre-mi.txt' },
    { output: true, text: body.dataset.tagline || 'Aprendiendo y construyendo cosas nuevas cada día.' },
    { prompt: 'visitante@portafolio:~$', text: 'ls skills/' },
    { output: true, text: body.dataset.skills || 'python  javascript  git  sql  backend  frontend' },
    { prompt: 'visitante@portafolio:~$', text: '_' },
  ];

  if (reduceMotion) {
    body.innerHTML = lines
      .map((line) => renderStaticLine(line))
      .join('');
    return;
  }

  body.innerHTML = '';
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) return;
    const line = lines[lineIndex];
    const div = document.createElement('div');
    div.className = 'terminal__line';

    if (line.prompt) {
      const promptSpan = document.createElement('span');
      promptSpan.className = 'terminal__prompt';
      promptSpan.textContent = line.prompt;
      div.appendChild(promptSpan);
    }

    const textSpan = document.createElement('span');
    if (line.output) textSpan.className = 'terminal__output';
    div.appendChild(textSpan);
    body.appendChild(div);

    const fullText = line.text;
    let charIndex = 0;
    const speed = line.output ? 10 : 38;

    const interval = setInterval(() => {
      textSpan.textContent = fullText.slice(0, charIndex + 1);
      charIndex += 1;
      if (charIndex >= fullText.length) {
        clearInterval(interval);
        lineIndex += 1;
        setTimeout(typeLine, line.output ? 260 : 420);
      }
    }, speed);
  }

  typeLine();
}

function renderStaticLine(line) {
  if (line.prompt) {
    return `<div class="terminal__line"><span class="terminal__prompt">${line.prompt}</span><span>${line.text}</span></div>`;
  }
  return `<div class="terminal__line"><span class="terminal__output">${line.text}</span></div>`;
}

/* ---------- Animación al hacer scroll ---------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Botón volver arriba ---------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 480);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Formulario de contacto (demo, sin backend) ---------- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Mensaje enviado ✓';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 2400);
  });
}

/* ---------- Año dinámico en footer ---------- */
function initYear() {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- MI PROYECCION ---------- */

// Animación de aparición suave para la sección de Proyección
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".proyeccion-card");
    
    const observerOptions = {
        root: null,
        threshold: 0.15, // Se activa cuando el 15% de la tarjeta es visible en pantalla
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Deja de observar una vez se ejecuta la animación
            }
        });
    }, observerOptions);

    cards.forEach((card, index) => {
        // Estado inicial controlado por JS para que aparezcan en cascada al bajar
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s, border-color 0.3s ease, box-shadow 0.3s ease`;
        
        observer.observe(card);
    });
});