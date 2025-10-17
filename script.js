document.addEventListener('DOMContentLoaded', () => {
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

  // wire theme buttons
  document.querySelectorAll('#themeToggle,#themeToggleSm').forEach(btn =>
    btn.addEventListener('click', toggleTheme)
  );

  // Mobile menu (safe null checks)
  const menuBtn = document.getElementById('menuBtn');
  menuBtn?.addEventListener('click', () => {
    const links = document.querySelector('.nav .links');
    if (!links) return;
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

  // Contact form (mailto handoff) — handle missing fields safely
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nameVal = data.get('name') ?? '';
    const emailVal = data.get('email') ?? '';
    const msgVal = data.get('message') ?? '';
    const subject = encodeURIComponent(`Portfolio Contact from ${String(nameVal)}`);
    const body = encodeURIComponent(`From: ${String(nameVal)} <${String(emailVal)}>\n\n${String(msgVal)}`);
    window.location.href = `mailto:sukriti@example.com?subject=${subject}&body=${body}`;
    if (status) {
      status.textContent = 'Opening your email app…';
      setTimeout(() => (status.textContent = ''), 3000);
    }
    form.reset();
  });

  // Resume download (placeholder)
  document.getElementById('downloadResume')?.addEventListener('click', (e) => {
    e.preventDefault();
    // Replace with: window.location.href = 'resume.pdf';
    alert('Hook up your resume.pdf link here.');
  });

  // Footer year (safe)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Reveal-on-scroll animations
  const revealEls = document.querySelectorAll('.card, .project, .k');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.animate(
          [
            { opacity: 0, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 400, easing: 'ease-out', fill: 'both' }
        );
        observer.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
});
