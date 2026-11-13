// ================================================================
//   KONFIGURASI LINK — EDIT DI SINI!
// ================================================================
//  icon : emoji atau karakter unicode (hemat ruang, no image)
// ================================================================

const LINKS = [
  {
    title: "Ruang Public",
    desc: "Grup utama semua member. Ngobrol & share meme.",
    url: "https://chat.whatsapp.com/EfnUKyY6mVbL5OWGj3By3H",
    icon: "🌐",
    color: "#22d3ee",
    badge: "public",
  },
  {
    title: "Info Premium",
    desc: "Paket premium clan, benefit eksklusif & akses khusus.",
    url: "https://chat.whatsapp.com/HyeFJcxGc8I61KJ3xKVDJs",
    icon: "👑",
    color: "#ffd700",
    badge: "premium",
  },
  {
    title: "BT Like & Prem",
    desc: "BT like & transaksi premium. Cepat, aman, terpercaya.",
    url: "https://chat.whatsapp.com/BP5Gybzd3EU8UGa1YFExii",
    icon: "⚡",
    color: "#ff2d95",
    badge: "bt",
  },
  {
    title: "List Bukti Kick",
    desc: "Transparansi clan — daftar member kena kick.",
    url: "https://chat.whatsapp.com/FIrED7rJdyQBt4mFzqHGWD",
    icon: "📋",
    color: "#22c55e",
    badge: "bukti",
  },
  {
    title: "Group Petinggi",
    desc: "Khusus Admiral ke atas. Koordinasi internal clan.",
    url: "https://chat.whatsapp.com/H2ZFQfefBdnAVokwNDXwRt",
    icon: "🛡️",
    color: "#a855f7",
    badge: "vip",
    locked: true,
  },
];

// ================================================================
//   RENDER LINKS
// ================================================================
const container = document.getElementById("links");

const BADGE_LABEL = {
  public:  "PUBLIC",
  premium: "PREMIUM",
  bt:      "BT LIKE",
  bukti:   "BUKTI",
  vip:     "VIP ONLY",
};

LINKS.forEach((link, i) => {
  const a = document.createElement("a");
  a.className = "link-card" + (link.locked ? " locked" : "");
  a.href = link.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.style.animationDelay = `${i * 0.08 + 0.25}s`;
  a.style.setProperty("--icon-color", link.color);

  const badgeHtml = link.badge
    ? `<span class="link-badge badge-${link.badge}">${BADGE_LABEL[link.badge] || link.badge}</span>`
    : "";

  const lockHtml = link.locked ? `<span class="lock-icon">🔒</span>` : "";

  a.innerHTML = `
    <div class="link-icon">${link.icon}</div>
    <div class="link-content">
      <div class="link-title">
        <span>${link.title}</span>
        ${badgeHtml}
        ${lockHtml}
      </div>
      <div class="link-desc">${link.desc}</div>
    </div>
    <div class="link-arrow">➤</div>
  `;

  container.appendChild(a);
});

// ================================================================
//   YEAR
// ================================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ================================================================
//   TOAST
// ================================================================
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ================================================================
//   SHARE
// ================================================================
document.getElementById("shareBtn").addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "Gabung Clan WIBU KERAS sekarang! ⚔️🌸",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast("Berhasil dibagikan ✅");
    } catch (err) {
      if (err.name !== "AbortError") showToast("Gagal membagikan ❌");
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Link disalin 📋");
  } catch {
    showToast("Gagal menyalin ❌");
  }
});

// ================================================================
//   PARTIKEL SAKURA
// ================================================================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W, H, particles = [];
const COLORS = ["#a855f7", "#ff2d95", "#22d3ee", "#ffd700", "#ffb7c5"];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = Math.random() * 0.6 + 0.2;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.6 + 0.2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > H + 10 || this.x < -10 || this.x > W + 10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
}

function initParticles() {
  const count = Math.min(60, Math.floor(window.innerWidth / 16));
  particles = Array.from({ length: count }, () => new Particle());
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  initParticles();
});

resize();
initParticles();
animate();