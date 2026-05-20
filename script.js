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

// ----- PROJECT DATA -----
const PROJECTS = [
  {
    badge: "FPGA · Intern",
    tags: "fpga wireless hardware",
    title: "81-tap Folded Systolic FIR Filter",
    desc: "5G NR O-RAN channelizing FIR on PolarFire (MPF050T-1FCSG325E). Symmetric + multi-clock folding: 81 DSP blocks → 5. 300 MHz clock / 30 MSPS. All 161 ModelSim outputs matched MATLAB & hand-calculated golden reference.",
    chips: ["Verilog", "Libero SoC", "Synplify", "ModelSim", "SmartTime"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-ganti/wireless-fpga-microchip",
    img: ""
  },
  {
    badge: "FPGA · Ongoing",
    tags: "fpga hardware",
    title: "Generic FIR IP Block",
    desc: "Fully parametric FIR IP: any tap count, any clock/data-rate ratio, static (.mem) or runtime-reloadable shadow-buffer coefficients. Generic clock-enable gen, write pointer, sample buffer — eliminates all 81-tap hardcoding.",
    chips: ["Verilog", "Libero SoC", "Parametric RTL", "Shadow RAM"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-ganti/wireless-fpga-microchip",
    img: ""
  },
  {
    badge: "VLSI",
    tags: "hardware",
    title: "Static Noise Margin Analysis — SRAM Cells",
    desc: "Characterization of 6T SRAM static noise margin under PVT variations. CMOS circuit analysis and SPICE simulation to determine read/write SNM stability bounds.",
    chips: ["CMOS", "SPICE", "SRAM", "SNM"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-ganti/Analysis-of-Static-Noise-Margin-in-SRAM-cells",
    img: ""
  },
  {
    badge: "AI · Networks",
    tags: "ai",
    title: "MSC Performance Analysis & Traffic Anomaly Detection",
    desc: "ML pipeline for network traffic anomaly detection: feature engineering, multi-class classification, and performance benchmarking across real traffic datasets.",
    chips: ["Python", "Scikit-learn", "Anomaly Detection", "Classification"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-ganti/MSC-Performance-Analysis-and-Traffic-Anomaly-Detection",
    img: ""
  },
  {
    badge: "AI · CRM",
    tags: "ai",
    title: "Lead Conversion & Funnel Prediction System",
    desc: "End-to-end ML system for predicting lead conversion probability and funnel drop-off using logistic regression, decision trees, and ensemble classifiers.",
    chips: ["Python", "Scikit-learn", "Logistic Regression", "Ensemble"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-ganti/Lead_Conversion_And_Funnel_Prediction_System",
    img: ""
  },
  {
    badge: "RVSP",
    tags: "ai",
    title: "Custom Optimizer Using Random Variables",
    desc: "Stochastic optimizer built from scratch with PSD-guided step adaptation and noise-aware gradient updates — grounded in Random Variables & Stochastic Processes theory.",
    chips: ["Python", "PSD", "Stochastic", "Optimization"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-ganti/Custom_Optimizer_Using_Random_Variables",
    img: ""
  },
  {
    badge: "IoT · Hardware",
    tags: "hardware",
    title: "Gas Detection & Alert System",
    desc: "MQ-2 based gas leak detection system with cloud telemetry (HiveMQ), automated fan actuation, and real-time dashboard alerts.",
    chips: ["Raspberry Pi", "MQ-2", "HiveMQ", "IoT"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-ganti/Gas-detection-and-alert-system",
    img: ""
  },
  {
    badge: "AI Agent",
    tags: "ai",
    title: "SpectroAgent",
    desc: "AI-powered agent for automated spectral analysis and signal characterization.",
    chips: ["Python", "AI Agent", "Signal Analysis"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-ganti/SpectroAgent",
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
  // Replace with: window.location.href = 'resume.pdf';
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
