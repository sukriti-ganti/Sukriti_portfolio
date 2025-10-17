// Theme toggle
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
} else if (!prefersDark) {
  document.documentElement.setAttribute('data-theme', 'light');
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  [...document.querySelectorAll('#themeToggle,#themeToggleSm')]
    .forEach(b => b.textContent = next === 'dark' ? '☾' : '☀');
}
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('themeToggleSm')?.addEventListener('click', toggleTheme);

// Mobile menu (simple show/hide of links)
const menuBtn = document.getElementById('menuBtn');
menuBtn?.addEventListener('click', () => {
  const links = document.querySelector('.nav .links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
});

// Project filters
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tag = btn.getAttribute('data-filter');
    document.querySelectorAll('.project').forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const show = tag === 'all' || tags.includes(tag);
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

// Contact form (mailto handoff)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = encodeURIComponent(data.get('name'));
  const email = encodeURIComponent(data.get('email'));
  const msg = encodeURIComponent(data.get('message'));
  const subject = `Portfolio Contact from ${name}`;
  const body = `From: ${name} (%3C${email}%3E)\n\n${msg}`;
  window.location.href = `mailto:sukriti@example.com?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email app…';
  setTimeout(() => (status.textContent = ''), 3000);
  form.reset();
});

// Resume download (placeholder)
document.getElementById('downloadResume')?.addEventListener('click', (e) => {
  e.preventDefault();
  // Replace with: window.location.href = 'resume.pdf';
  alert('Hook up your resume.pdf link here.');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple reveal-on-scroll animations
const revealEls = document.querySelectorAll('.card, .project, .k');
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.animate(
        [
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 400, easing: 'ease-out', fill: 'both' }
      );
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => io.observe(el));
// Theme toggle
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
} else if (!prefersDark) {
  document.documentElement.setAttribute('data-theme', 'light');
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  [...document.querySelectorAll('#themeToggle,#themeToggleSm')]
    .forEach(b => b.textContent = next === 'dark' ? '☾' : '☀');
}
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('themeToggleSm')?.addEventListener('click', toggleTheme);

// Mobile menu (simple show/hide of links)
const menuBtn = document.getElementById('menuBtn');
menuBtn?.addEventListener('click', () => {
  const links = document.querySelector('.nav .links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
});

// Project filters
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tag = btn.getAttribute('data-filter');
    document.querySelectorAll('.project').forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const show = tag === 'all' || tags.includes(tag);
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

// Contact form (mailto handoff)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = encodeURIComponent(data.get('name'));
  const email = encodeURIComponent(data.get('email'));
  const msg = encodeURIComponent(data.get('message'));
  const subject = `Portfolio Contact from ${name}`;
  const body = `From: ${name} (%3C${email}%3E)\n\n${msg}`;
  window.location.href = `mailto:sukriti@example.com?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email app…';
  setTimeout(() => (status.textContent = ''), 3000);
  form.reset();
});

// Resume download (placeholder)
document.getElementById('downloadResume')?.addEventListener('click', (e) => {
  e.preventDefault();
  // Replace with: window.location.href = 'resume.pdf';
  alert('Hook up your resume.pdf link here.');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple reveal-on-scroll animations
const revealEls = document.querySelectorAll('.card, .project, .k');
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.animate(
        [
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 400, easing: 'ease-out', fill: 'both' }
      );
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el) => io.observe(el));
