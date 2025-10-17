// ----- THEME -----
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

// ----- MOBILE NAV -----
const menuBtn = document.getElementById('menuBtn');
menuBtn?.addEventListener('click', () => {
  const links = document.querySelector('.nav .links');
  const showing = links.style.display === 'flex';
  links.style.display = showing ? 'none' : 'flex';
  menuBtn.setAttribute('aria-expanded', String(!showing));
});
document.querySelectorAll('.nav .links a').forEach(a => {
  a.addEventListener('click', () => {
    const links = document.querySelector('.nav .links');
    if (getComputedStyle(document.querySelector('.mobile')).display !== 'none') {
      links.style.display = 'none';
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
  });
});

// ----- PROJECT DATA (EDIT HERE to add projects) -----
const PROJECTS = [
  {
    badge: "Smart Helmet",
    tags: "hardware embedded",
    title: "Smart Helmet for Mining Safety",
    desc: "Gas & impact sensing with STM32 → PC serial; filtering and alert logic.",
    chips: ["SCS","P&C","STM32","Serial"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/yourname/smart-helmet",
    img: "" // optional image URL
  },
  {
    badge: "Silent SOS",
    tags: "hardware embedded ai",
    title: "Silent SOS (ESP32 + GSM/GPS)",
    desc: "Emergency wearable with MQTT/FCM fallback; power-aware firmware.",
    chips: ["ESP32","GSM/GPS","LoRa/MQTT"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/yourname/silent-sos",
    img: ""
  },
  {
    badge: "AECD",
    tags: "hardware ai",
    title: "Analog McCulloch–Pitts Neuron",
    desc: "Op-amp threshold neuron; bias/saturation control and noise analysis.",
    chips: ["Op-amp","SPICE","Bias/Noise"],
    linkText: "Paper ↗",
    linkHref: "https://your-link-to-paper",
    img: ""
  },
  {
    badge: "RVSP",
    tags: "ai",
    title: "Stochastic Optimizer (RVSP)",
    desc: "Custom optimizer with PSD-guided step adaptation; noise-aware updates.",
    chips: ["Python","PSD","Stochastic"],
    linkText: "Repo ↗",
    linkHref: "https://github.com/yourname/stochastic-optimizer",
    img: ""
  },
  {
    badge: "ESD",
    tags: "hardware embedded",
    title: "Gas Leak Detection (Pi + HiveMQ)",
    desc: "MQ-2 + cloud telemetry + fan actuation; dashboard alerts; PCB prototype.",
    chips: ["Raspberry Pi","HiveMQ","PCB"],
    linkText: "Docs ↗",
    linkHref: "https://your-link-to-docs",
    img: ""
  },
  {
    badge: "ROS2",
    tags: "ai embedded",
    title: "Warehouse Explore (ROS2)",
    desc: "Exploration node with path planning; validated in Foxglove.",
    chips: ["ROS2","Python","Nav"],
    linkText: "Repo ↗",
    linkHref: "https://github.com/yourname/warehouse-explore",
    img: ""
  },
  {
    badge: "Protocol",
    tags: "embedded hardware",
    title: "MineNet Protocol",
    desc: "Ultra-light telemetry protocol resilient to noisy RF links.",
    chips: ["LoRa","CRC","FSM"],
    linkText: "Spec ↗",
    linkHref: "https://your-link-to-spec",
    img: ""
  },
  {
    badge: "Vision",
    tags: "ai hardware",
    title: "MicroSense AI",
    desc: "Microplastic detection on Raspberry Pi using classical ML pipeline.",
    chips: ["Raspberry Pi","CV/ML","Python"],
    linkText: "Repo ↗",
    linkHref: "https://github.com/yourname/microsense-ai",
    img: ""
  },
  {
    badge: "P&C",
    tags: "embedded",
    title: "8051 & 8086 Labs",
    desc: "ALP exercises: arrays, timers, interrupts, ADC/DAC interfacing.",
    chips: ["MCU 8051 IDE","Keil","Assembly"],
    linkText: "Code ↗",
    linkHref: "https://github.com/yourname/pc-labs",
    img: ""
  }
];

// ----- RENDER PROJECTS -----
const projectGrid = document.getElementById('projectGrid');
function chipSpan(txt){ return `<span class="chip">${txt}</span>`; }
function projectCard(p){
  const image = p.img ? `<img src="${p.img}" alt="${p.title}">` : "";
  const link = p.linkHref ? `<a class="chip gh" href="${p.linkHref}" target="_blank" rel="noreferrer">${p.linkText||'Link ↗'}</a>` : "";
  return `
    <article class="card project" data-tags="${p.tags}">
      <div class="thumb">
        ${image}
        <span class="chip badge">${p.badge}</span>
        ${link}
      </div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="skill-list">${(p.chips||[]).map(chipSpan).join('')}</div>
    </article>`;
}
function renderProjects(list){ projectGrid.innerHTML = list.map(projectCard).join(''); }
renderProjects(PROJECTS);

// ----- FILTERS -----
const filters = document.getElementById('filters');
function applyFilter(tag){
  document.querySelectorAll('.project').forEach(card=>{
    const tags = card.getAttribute('data-tags') || '';
    card.style.display = (tag==='all' || tags.includes(tag)) ? 'flex' : 'none';
  });
}
filters?.addEventListener('click', (e)=>{
  const btn = e.target.closest('[data-filter]');
  if(!btn) return;
  const tag = btn.getAttribute('data-filter');
  applyFilter(tag);
  document.querySelectorAll('#filters .chip').forEach(c=>{
    c.classList.remove('is-active');
    c.setAttribute('aria-selected','false');
  });
  btn.classList.add('is-active');
  btn.setAttribute('aria-selected','true');
});

// ----- CONTACT FORM (mailto) -----
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(form);
  const name = encodeURIComponent(data.get('name'));
  const email = encodeURIComponent(data.get('email'));
  const msg = encodeURIComponent(data.get('message'));
  const subject = `Portfolio Contact from ${name}`;
  const body = `From: ${name} (%3C${email}%3E)%0A%0A${msg}`;
  window.location.href = `mailto:sukriti@example.com?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email app…';
  setTimeout(()=> status.textContent = '', 3000);
  form.reset();
});

// ----- RESUME LINK -----
document.getElementById('downloadResume')?.addEventListener('click', (e)=>{
  e.preventDefault();
  // Replace with your file:
  // window.location.href = 'resume.pdf';
  alert('Hook up your resume.pdf link here.');
});

// ----- FOOTER YEAR + REVEAL -----
document.getElementById('year').textContent = new Date().getFullYear();
const revealEls = document.querySelectorAll('.card, .project, .k');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.animate(
        [{opacity:0, transform:'translateY(12px)'},{opacity:1, transform:'translateY(0)'}],
        {duration:400, easing:'ease-out', fill:'both'}
      );
      io.unobserve(en.target);
    }
  })
}, {threshold:.12});
revealEls.forEach(el=> io.observe(el));
