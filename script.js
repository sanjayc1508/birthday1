// Elements
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const sky = document.getElementById('sky');
const moon = document.getElementById('moon');
const memoryModal = document.getElementById('memoryModal');
const modalBody = document.getElementById('modalBody');
const closeMemory = document.getElementById('closeMemory');
const moonModal = document.getElementById('moonModal');
const closeMoon = document.getElementById('closeMoon');
const toast = document.getElementById('toast');

// Fixed memories
const memories = [
  { image: "assets/mem1.jpeg", caption: "That night sky we watched together 🌌", x: "30%", y: "40%" },
  { image: "assets/mem2.jpeg", caption: "Your smile, brighter than any star ✨", x: "55%", y: "70%" },
  { image: "assets/mem3.jpeg", caption: "The day we got lost and loved it 🚗💫", x: "70%", y: "25%" },
  { image: "assets/mem4.jpeg", caption: "Laughs that echoed beyond galaxies 💫", x: "15%", y: "60%" },
  { image: "assets/mem5.jpeg", caption: "The moonlight that saw our secrets 🌙", x: "82%", y: "55%" },
  { image: "assets/mem6.jpeg", caption: "Your voice under starlit nights 💛", x: "45%", y: "25%" },
  { image: "assets/mem7.jpeg", caption: "Moments frozen in cosmic silence 🌠", x: "65%", y: "50%" },
  { image: "assets/mem8.jpeg", caption: "When time stopped for us ⏳", x: "40%", y: "80%" },
  { image: "assets/mem9.jpeg", caption: "Dreams painted across constellations 🎨", x: "25%", y: "20%" },
  { image: "assets/mem10.jpeg", caption: "Lightyears away, but hearts aligned 💫", x: "78%", y: "30%" },
  { image: "assets/mem11.jpeg", caption: "Where silence spoke everything 💭", x: "10%", y: "45%" },
  { image: "assets/mem12.jpeg", caption: "Stars reflected in your eyes ✨", x: "90%", y: "65%" },
  { image: "assets/mem13.jpeg", caption: "A universe made just for two 💞", x: "50%", y: "55%" },
];

// Starfield Background
let W = innerWidth, H = innerHeight;
canvas.width = W; canvas.height = H;
let particles = [];

function setup() {
  W = innerWidth; H = innerHeight;
  canvas.width = W; canvas.height = H;
  const count = Math.floor((W * H) / 9000);
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.2,
      v: Math.random() * 0.3 + 0.02,
      glow: Math.random() * 0.8 + 0.2
    });
  }
}
setup();
addEventListener('resize', setup);

function draw() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${0.4 * p.glow})`;
    ctx.shadowBlur = 8 * p.glow;
    ctx.shadowColor = 'rgba(255, 255, 150, 0.3)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.v;
    if (p.y > H) { p.y = -10; p.x = Math.random() * W; }
  });
  requestAnimationFrame(draw);
}
draw();

// Render Fixed Memory Stars
function createStar(mem) {
  const star = document.createElement('div');
  star.className = 'memory-star';
  star.style.left = mem.x;
  star.style.top = mem.y;
  star.title = mem.caption;

  // Animate subtle twinkle
  const orbit = 6 + Math.random() * 10;
  const speed = 6 + Math.random() * 8;
  star.animate([
    { transform: 'translateY(0) scale(1)' },
    { transform: `translateY(-${orbit}px) scale(1.3)` },
    { transform: 'translateY(0) scale(1)' }
  ], { duration: speed * 300, iterations: Infinity, easing: 'ease-in-out' });

  star.addEventListener('click', () => { openMemoryModal(mem); });
  sky.appendChild(star);
}

memories.forEach(createStar);

// Modals
function openMemoryModal(mem) {
  modalBody.innerHTML = `
    <h3 style="color:var(--accent); text-align:center;">${mem.caption}</h3>
    <img src="${mem.image}" alt="${mem.caption}" style="
      width:80%; 
      max-width:500px;
      border-radius:16px;
      margin-top:15px;
      box-shadow:0 0 25px rgba(255,255,150,0.3);
      display:block;
      margin-left:auto;
      margin-right:auto;
      transition:transform 0.3s ease;
    " onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
  `;
  memoryModal.style.display = 'flex';
}

closeMemory.onclick = () => memoryModal.style.display = 'none';
memoryModal.onclick = e => { if (e.target === memoryModal) memoryModal.style.display = 'none'; };

moon.onclick = () => { moonModal.style.display = 'flex'; };
closeMoon.onclick = () => moonModal.style.display = 'none';
moonModal.onclick = e => { if (e.target === moonModal) moonModal.style.display = 'none'; };

// Toast
function showToast(msg, time = 2000) {
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', time);
}
showToast("Welcome to Her Galaxy ✨");

window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('birthdayAudio');
  
  // Wait a moment to let the stars load first
  setTimeout(() => {
    audio.play().catch(() => {
      // If browser blocks autoplay, show small toast hint
      showToast("Tap anywhere to hear her tune 🎶");
      document.body.addEventListener('click', () => {
        audio.play();
      }, { once: true });
    });
  }, 1200);
});
