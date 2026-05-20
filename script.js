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
    tags: "fpga hardware",
    title: "Systolic FIR Filter Architecture",
    desc: "Systolic array FIR implementation on PolarFire FPGA — fanout-independent fmax scaling, DSP block utilization, timing closure in Libero SoC / SmartTime.",
    chips: ["Verilog", "Libero SoC", "Synplify", "SmartTime"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "FPGA · DSP",
    tags: "fpga wireless hardware",
    title: "Polyphase Decimating FIR (DDC)",
    desc: "Polyphase decomposition-based DDC building block; Python bit-true reference model validated against RTL via AXI4-Stream testbench in ModelSim.",
    chips: ["Verilog", "Python", "AXI4-Stream", "ModelSim"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "Wireless · 5G",
    tags: "wireless ai",
    title: "Wireless Channel Simulator",
    desc: "Rayleigh/Rician fading, path loss models (Free Space, log-distance), and multipath delay spread — built in Python/MATLAB for Sem 4 Wireless Comms (Rappaport).",
    chips: ["Python", "MATLAB", "Rappaport", "OFDM"],
    linkText: "Repo ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "Smart Helmet",
    tags: "hardware embedded",
    title: "Smart Helmet for Mining Safety",
    desc: "Gas & impact sensing with STM32 → PC serial telemetry; sensor filtering and alert logic. EPICS lead project.",
    chips: ["STM32", "Serial", "C", "Sensors"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "Digital Comms",
    tags: "wireless ai",
    title: "Digital Communication Systems Simulator",
    desc: "PCM quantization noise, matched filter detection, BER curves for ASK/PSK/FSK/QAM, eye diagrams, and Huffman coding — Sem 4 DC course (Lathi & Ding).",
    chips: ["Python", "MATLAB", "BER", "QAM"],
    linkText: "Repo ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "VLSI",
    tags: "hardware fpga",
    title: "CMOS VLSI Design Labs",
    desc: "CMOS inverter static/dynamic characterization, NAND/NOR stick diagrams, SRAM cell layout, setup/hold timing analysis — Sem 4 VLSI (Weste & Harris).",
    chips: ["CMOS", "LTspice", "Layout", "SRAM"],
    linkText: "Repo ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "Silent SOS",
    tags: "hardware embedded",
    title: "Silent SOS (ESP32 + GSM/GPS)",
    desc: "Emergency wearable with MQTT/FCM fallback; power-aware firmware for field deployment.",
    chips: ["ESP32", "GSM/GPS", "LoRa/MQTT"],
    linkText: "GitHub ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "ML/AI",
    tags: "ai",
    title: "MLPP Lab Projects",
    desc: "End-to-end ML pipeline: logistic regression, SVM, k-NN, Decision Tree, Random Forest, ANN/CNN on MNIST/CIFAR-10, RNN/LSTM for time-series — Sem 4 (Keras, Scikit-learn).",
    chips: ["Python", "Keras", "Scikit-learn", "CNN"],
    linkText: "Repo ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "Vision",
    tags: "ai hardware",
    title: "MicroSense AI",
    desc: "Microplastic detection on Raspberry Pi using classical ML pipeline.",
    chips: ["Raspberry Pi", "CV/ML", "Python"],
    linkText: "Repo ↗",
    linkHref: "https://github.com/sukriti-g",
    img: ""
  },
  {
    badge: "Protocol",
    tags: "wireless hardware",
    title: "MineNet Protocol",
    desc: "Ultra-light telemetry protocol resilient to noisy RF links.",
    chips: ["LoRa", "CRC", "FSM"],
    linkText: "Spec ↗",
    linkHref: "https://github.com/sukriti-g",
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
