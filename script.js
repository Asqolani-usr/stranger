// ----------------------------------------------------
// CONFIGURATION & GLOBAL SETTINGS
// ----------------------------------------------------
const CONFIG = {
  crushUsername: "@wanhass_",
  whatsappNumber: "6282283944641", // Replace with your WhatsApp number (include country code, e.g. 62...)
  whatsappText: "Hai Asqolani! Aku udah lihat website-nya... 💖" // Auto-filled WA message
};

const messages = [
  "Hai Kak Safira, mungkin ini terasa tiba-tiba, tapi ada sesuatu yang ingin aku sampaikan... <3",
  "Kita memang belum pernah ketemu langsung, dan mungkin cuma sempat sekali menyapa lewat balas story.",
  "Jujur, awalnya aku sempat ragu dan minder buat nyapa kamu lagi, apalagi melihat postinganmu ramai oleh cowok-cowok keren. 🫣",
  "Tapi setelah akunmu beberapa kali lewat di beranda, aku sadar... kalau aku sebenarnya suka sama kamu.",
  "Aku suka melihat senyummu, pembawaanmu yang ramah, dan bagaimana kamu selalu terlihat menyenangkan.",
  "Lewat web kecil ini, aku cuma ingin memberanikan diri untuk jujur tentang perasaanku. Semoga ini tidak mengganggumu ya... 😊",
  "Oh iya, maaf ya sebelumnya kalau aku lancang menggunakan foto-fotomu di sini tanpa izin terlebih dahulu. Semoga kamu tidak keberatan ya... 🙏"
];

const photos = [
  { src: "foto/1.jpg", caption: "awal mula nemu postingan kamu di beranda, langsung kagum sama senyummu 😊" },
  { src: "foto/2.jpg", caption: "kamu selalu terlihat positif dan ramah di setiap postingan ✨" },
  { src: "foto/3.jpg", caption: "foto ini salah satu yang menurutku paling berkesan 💫" },
  { src: "foto/4.jpg", caption: "meskipun cuma melihat lewat layar, ekspresimu selalu menular ☀️" },
  { src: "foto/5.jpg", caption: "kamu punya pembawaan yang tenang dan menyenangkan 🌸" },
  { src: "foto/6.jpg", caption: "selalu suka cara kamu berekspresi di depan kamera 🌎" },
  { src: "foto/7.jpg", caption: "tiap kali kontenmu lewat di beranda, selalu berhasil bikin mood naik 🍀" },
  { src: "foto/8.jpg", caption: "gaya berpakaianmu di foto ini kelihatan anggun sekali 🎀" },
  { src: "foto/9.jpg", caption: "pasti banyak yang mengagumi kamu, dan aku salah satunya 🫣" },
  { src: "foto/10.jpg", caption: "terima kasih ya sudah selalu membagikan konten-konten yang baik 💘" },
  { src: "foto/11.jpg", caption: "semoga kamu selalu sehat dan bahagia dalam setiap aktivitasmu ✨" },
  { src: "foto/12.jpg", caption: "selamat menjelajahi banyak tempat seru dan baru lainnya! 🍀", objectPosition: "center 80%" },
  { src: "foto/13.jpg", caption: "selalu pertahankan senyum manis dan keceriaanmu ini ya 💭" },
  { src: "foto/14.jpg", caption: "apapun kesibukanmu sekarang, semoga selalu diberi kelancaran 💌" },
  { src: "foto/15.jpg", caption: "terima kasih banyak sudah meluangkan waktu melihat sampai akhir ya 💖" }
];

const escapeMessages = [
  "Yakin? 🥺",
  "Gak boleh! 😜",
  "Pliss klik Mau 💖",
  "Coba lagi wkwk",
  "Eits gak bisa 🏃‍♂️",
  "Dipikir-pikir dulu... 🤔",
  "Tega banget sih 😭",
  "Gak boleh nolak! 😎"
];

// App State Variables
let currentMessageIndex = 0;
let isAudioPlaying = false;
let typewriterTimeout = null;

// DOM Elements
const audio = document.getElementById("audio");
const musicBtn = document.getElementById("musicBtn");
const visualizer = document.getElementById("visualizer");
const envelope = document.querySelector(".envelope");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const popupCard = document.getElementById("popupCard");
const popupText = document.getElementById("popupText");
const questionPage = document.getElementById("questionPage");
const galleryPage = document.getElementById("galleryPage");
const noBtn = document.getElementById("noBtn");
const polaroidStack = document.getElementById("polaroidStack");

// ----------------------------------------------------
// 1. CANVAS MOUSE HEART-TRAIL
// ----------------------------------------------------
const canvas = document.getElementById("trailCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 12 + 6;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * -1.5 - 0.5; // Drift upwards
    this.color = `hsl(${Math.random() * 30 + 340}, 100%, ${Math.random() * 20 + 70}%)`; // Pinkish hues
    this.opacity = 1;
    this.fade = Math.random() * 0.015 + 0.008;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.02 - 0.01;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= this.fade;
    this.rotation += this.rotationSpeed;
  }

  draw() {
    if (this.opacity <= 0) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    
    // Draw heart path
    ctx.beginPath();
    const s = this.size;
    ctx.moveTo(0, -s / 4);
    ctx.bezierCurveTo(s / 2, -s, s, -s / 3, 0, s * 0.8);
    ctx.bezierCurveTo(-s, -s / 3, -s / 2, -s, 0, -s / 4);
    ctx.fill();
    ctx.restore();
  }
}

// Track mouse/touch for trail
function addTrailParticles(e) {
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);
  if (x && y) {
    // Add multiple particles for richness
    for (let index = 0; index < 2; index++) {
      particles.push(new Particle(x, y));
    }
  }
}
window.addEventListener("mousemove", addTrailParticles);
window.addEventListener("touchmove", addTrailParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < particles.length; index++) {
    particles[index].update();
    particles[index].draw();
  }
  // Filter out faded particles
  particles = particles.filter(p => p.opacity > 0);
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ----------------------------------------------------
// 2. DYNAMIC FLOATING BACKGROUND DECOR
// ----------------------------------------------------
const bgDecor = document.getElementById("bgDecor");
const decorEmojis = ["🌸", "🎈", "🦋", "✨", "💗", "🌷"];

function spawnDecor() {
  const item = document.createElement("div");
  item.className = "decor-item";
  item.innerText = decorEmojis[Math.floor(Math.random() * decorEmojis.length)];
  
  // Random configurations
  const size = Math.random() * 25 + 15;
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = Math.random() * 12 + 10;
  
  item.style.fontSize = `${size}px`;
  item.style.left = `${left}%`;
  item.style.animation = `floatUp ${duration}s linear infinite`;
  item.style.animationDelay = `-${delay}s`;
  
  bgDecor.appendChild(item);
  
  // Limit total background elements for memory efficiency
  if (bgDecor.children.length > 25) {
    bgDecor.removeChild(bgDecor.firstChild);
  }
}

// Spawn initial background particles
for (let index = 0; index < 15; index++) {
  spawnDecor();
}
setInterval(spawnDecor, 4000);

// ----------------------------------------------------
// 3. MUSIC MANAGEMENT
// ----------------------------------------------------
function playMusic() {
  audio.play().then(() => {
    isAudioPlaying = true;
    musicBtn.classList.remove("paused");
  }).catch(e => {
    console.log("Autoplay blocked, waiting for interaction");
  });
}

function toggleMusic() {
  if (isAudioPlaying) {
    audio.pause();
    isAudioPlaying = false;
    musicBtn.classList.add("paused");
  } else {
    audio.play();
    isAudioPlaying = true;
    musicBtn.classList.remove("paused");
  }
}

// Start playing music on the first general interaction
document.body.addEventListener("click", function initMusic() {
  if (!isAudioPlaying) {
    playMusic();
  }
  document.body.removeEventListener("click", initMusic);
});

// ----------------------------------------------------
// 4. STAGE 1: OPEN ENVELOPE
// ----------------------------------------------------
function openEnvelope() {
  if (envelope.classList.contains("open")) return;
  
  envelope.classList.add("open");
  playMusic();
  
  // Confetti burst on opening
  burstConfetti(envelopeWrapper, 25);
  
  // Transition to popup typewriter card
  setTimeout(() => {
    envelopeWrapper.style.opacity = "0";
    setTimeout(() => {
      envelopeWrapper.classList.remove("active");
      popupCard.classList.add("active");
      startTypewriter();
    }, 600);
  }, 1800);
}

// ----------------------------------------------------
// 5. STAGE 2: TYPEWRITER POPUPS
// ----------------------------------------------------
function startTypewriter() {
  const text = messages[currentMessageIndex];
  typewriter(popupText, text, 40);
}

function typewriter(element, text, speed) {
  element.innerHTML = "";
  let index = 0;
  
  if (typewriterTimeout) clearTimeout(typewriterTimeout);
  
  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      typewriterTimeout = setTimeout(type, speed);
    }
  }
  type();
}

function nextPopup() {
  currentMessageIndex++;
  if (currentMessageIndex < messages.length) {
    startTypewriter();
  } else {
    // Fade out popup card and go to question card
    popupCard.classList.remove("active");
    setTimeout(() => {
      questionPage.classList.add("active");
    }, 400);
  }
}

// ----------------------------------------------------
// 6. STAGE 3: SMART RUNAWAY BUTTON & EXPLOSION
// ----------------------------------------------------
let escapeCount = 0;

function moveNoBtn() {
  // Proximity evasion: Teleport button to random coordinates inside viewport
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  
  // Set padding boundaries
  const pad = 60;
  const maxX = window.innerWidth - btnWidth - pad;
  const maxY = window.innerHeight - btnHeight - pad;
  
  const newX = Math.random() * (maxX - pad) + pad;
  const newY = Math.random() * (maxY - pad) + pad;
  
  // Temporarily set absolute positioning if not set
  noBtn.style.position = "fixed";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  noBtn.style.margin = "0";
  
  // Rotate button dynamically
  const randomRot = Math.random() * 20 - 10;
  noBtn.style.transform = `rotate(${randomRot}deg) scale(0.95)`;
  
  // Update button text to funny message
  noBtn.innerText = escapeMessages[escapeCount % escapeMessages.length];
  escapeCount++;
}


function goToGallery() {
  // Burst particles around Yes Button
  const yesBtn = document.getElementById("yesBtn");
  burstConfetti(yesBtn, 40);
  
  // Wait short delay to enjoy particles, then swap screen
  setTimeout(() => {
    questionPage.classList.remove("active");
    setTimeout(() => {
      galleryPage.classList.add("active");
      initPolaroidStack();
    }, 400);
  }, 600);
}

// ----------------------------------------------------
// 7. STAGE 4: TINDER-STYLE POLAROID SWIPER
// ----------------------------------------------------
let activeCard = null;
let cardList = [];

function initPolaroidStack() {
  polaroidStack.innerHTML = "";
  cardList = [];
  
  // Inject cards in reverse order so photos[0] ends up on top
  for (let idx = photos.length - 1; idx >= 0; idx--) {
    const photo = photos[idx];
    const card = document.createElement("div");
    card.className = "polaroid";
    
    // Slight random initial rotation
    const rotation = Math.random() * 8 - 4;
    card.style.transform = `rotate(${rotation}deg)`;
    card.dataset.rotation = rotation;
    
    card.innerHTML = `
      <img src="${photo.src}" alt="Crush Memory" draggable="false" style="${photo.objectPosition ? `object-position: ${photo.objectPosition};` : ''}">
      <div class="polaroid-caption">${photo.caption}</div>
    `;
    
    polaroidStack.appendChild(card);
    cardList.push(card);
    
    // Bind Dragging / Pointer Physics
    setupDragEvents(card);
  }
  
  updateActiveCard();
}

function updateActiveCard() {
  if (cardList.length > 0) {
    activeCard = cardList[cardList.length - 1];
  } else {
    activeCard = null;
    // Finished swiping all photos -> reset the stack automatically so they can see them again!
    setTimeout(() => {
      initPolaroidStack();
      // Celebratory explosion on completing the album!
      burstConfetti(galleryPage, 35);
    }, 600);
  }
}

// Drag physics using pointer events
function setupDragEvents(card) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let dragX = 0;
  let dragY = 0;
  const initialRotation = parseFloat(card.dataset.rotation);
  
  card.addEventListener("pointerdown", (e) => {
    if (card !== activeCard) return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    card.style.transition = "none";
    card.setPointerCapture(e.pointerId);
  });
  
  card.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    
    dragX = e.clientX - startX;
    dragY = e.clientY - startY;
    
    // Rotate as we pull sideways
    const rotate = initialRotation + (dragX * 0.1);
    card.style.transform = `translate(${dragX}px, ${dragY}px) rotate(${rotate}deg)`;
  });
  
  card.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    card.releasePointerCapture(e.pointerId);
    
    const swipeThreshold = 100;
    
    if (dragX > swipeThreshold) {
      // Swipe Right
      swipeCard("right");
    } else if (dragX < -swipeThreshold) {
      // Swipe Left
      swipeCard("left");
    } else {
      // Reset back to original stacked position
      card.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      card.style.transform = `rotate(${initialRotation}deg)`;
    }
    dragX = 0;
    dragY = 0;
  });
  
  card.addEventListener("pointercancel", () => {
    isDragging = false;
    card.style.transition = "transform 0.4s ease";
    card.style.transform = `rotate(${initialRotation}deg)`;
    dragX = 0;
    dragY = 0;
  });
}

function swipeCard(direction) {
  if (!activeCard) return;
  
  const currentCard = activeCard;
  
  if (direction === "right") {
    currentCard.classList.add("swiping-right");
    burstConfetti(currentCard, 15);
  } else {
    currentCard.classList.add("swiping-left");
  }
  
  // Remove card from tracking list
  cardList.pop();
  
  // Wait for animation to finish, then delete from DOM
  setTimeout(() => {
    currentCard.remove();
  }, 600);
  
  updateActiveCard();
}

// Wrapper calls for button triggers
function swipeLeft() {
  swipeCard("left");
}

function swipeRight() {
  swipeCard("right");
}

// ----------------------------------------------------
// 8. DECORATIVE PARTICLE EXPLOSION (CONFETTI / HEARTS)
// ----------------------------------------------------
function burstConfetti(targetElement, count = 20) {
  const rect = targetElement.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  
  const emojis = ["💖", "💗", "✨", "🌸", "⭐", "🌷", "🎈"];
  
  for (let index = 0; index < count; index++) {
    const el = document.createElement("div");
    el.className = "click-particle";
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Exploding physics values passed as CSS custom variables
    const angle = Math.random() * Math.PI * 2;
    const force = Math.random() * 120 + 80;
    const dx = Math.cos(angle) * force;
    const dy = Math.sin(angle) * force - 30; // Tendancy to float up
    const rotation = Math.random() * 360;
    
    el.style.left = `${originX}px`;
    el.style.top = `${originY}px`;
    el.style.setProperty("--dx", `${dx}px`);
    el.style.setProperty("--dy", `${dy}px`);
    el.style.setProperty("--rot", `${rotation}deg`);
    
    document.body.appendChild(el);
    
    // Remove element from DOM after transition finishes
    setTimeout(() => {
      el.remove();
    }, 1000);
  }
}
