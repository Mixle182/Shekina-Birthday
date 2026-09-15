// ============================================================
// SHEKINA'S BIRTHDAY SURPRISE
// Everything works without a backend or database.
// ============================================================

const screens = [...document.querySelectorAll(".screen")];
const progressBar = document.getElementById("progressBar");
const backBtn = document.getElementById("backBtn");
const stars = document.getElementById("stars");

let current = 0;

// -------------------- STAR FIELD --------------------
for (let i = 0; i < 115; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.setProperty("--duration", `${1.5 + Math.random() * 4}s`);
  star.style.setProperty("--float-duration", `${5 + Math.random() * 8}s`);
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.opacity = `${0.25 + Math.random() * 0.75}`;
  star.style.transform = `scale(${0.5 + Math.random() * 1.2})`;
  stars.appendChild(star);
}

// -------------------- NAVIGATION --------------------
function showScreen(index, direction = 1) {
  if (index < 0 || index >= screens.length || index === current) return;

  const oldScreen = screens[current];
  oldScreen.classList.remove("active");
  oldScreen.classList.add("leaving");

  setTimeout(() => oldScreen.classList.remove("leaving"), 360);

  current = index;
  screens[current].classList.add("active");

  progressBar.style.width = `${((current + 1) / screens.length) * 100}%`;
  backBtn.style.visibility = current === 0 ? "hidden" : "visible";

  // Keep the new screen at the top.
  screens[current].scrollTop = 0;

  if (current === 1) launchConfetti();
}

document.querySelectorAll(".next-btn").forEach(button => {
  button.addEventListener("click", () => {
    const target = screens.findIndex(s => s.id === button.dataset.next);
    showScreen(target);
  });
});

backBtn.addEventListener("click", () => showScreen(current - 1));

document.getElementById("restartBtn").addEventListener("click", () => {
  screens[current].classList.remove("active");
  current = 0;
  screens[0].classList.add("active");
  progressBar.style.width = "12.5%";
  backBtn.style.visibility = "hidden";
  window.scrollTo(0, 0);
});

// -------------------- BIRTHDAY GIFT --------------------
const birthdayGift = document.getElementById("birthdayGift");
const giftHint = document.getElementById("giftHint");
const giftMessage = document.getElementById("giftMessage");
const birthdayContinue = document.querySelector('#birthday .next-btn');

birthdayGift.addEventListener("click", () => {
  if (birthdayGift.classList.contains("open")) return;

  birthdayGift.classList.add("open");
  giftHint.textContent = "A little sparkle just for you ✨";
  giftMessage.textContent = "May this new chapter be filled with beautiful moments, answered prayers, and reasons to smile.";
  birthdayContinue.classList.remove("hidden");
  launchConfetti();
});

// -------------------- FINAL GIFT --------------------
const finalGift = document.getElementById("finalGift");
const surpriseMessage = document.getElementById("surpriseMessage");

finalGift.addEventListener("click", () => {
  finalGift.classList.add("open");
  surpriseMessage.classList.add("show");
  launchConfetti();
});

// -------------------- CONFETTI --------------------
function launchConfetti() {
  const layer = document.getElementById("confetti");
  if (!layer) return;

  const symbols = ["✦", "✧", "•", "♡", "◆", "✺"];
  const pieces = 58;

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 240;
    const startX = 50 + (Math.random() * 16 - 8);
    const startY = 18 + Math.random() * 18;

    piece.style.left = `${startX}%`;
    piece.style.top = `${startY}%`;
    piece.style.color = ["#d8b0ff", "#9e7aff", "#f0caff", "#8fb6ff", "#ffffff", "#bca2ff"][Math.floor(Math.random() * 6)];
    piece.style.fontSize = `${8 + Math.random() * 11}px`;
    piece.style.animationDelay = `${Math.random() * .25}s`;
    piece.style.animationDuration = `${1.9 + Math.random() * 2.2}s`;

    // Each piece starts near the center and spreads outward before falling.
    piece.animate([
      {
        transform: "translate3d(0, 0, 0) rotate(0deg) scale(.5)",
        opacity: 0
      },
      {
        transform: `translate3d(${Math.cos(angle) * distance * .55}px, ${Math.sin(angle) * distance * .38}px, 0) rotate(${180 + Math.random() * 180}deg) scale(1)`,
        opacity: 1,
        offset: .22
      },
      {
        transform: `translate3d(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 360 + Math.random() * 260}px, 0) rotate(${540 + Math.random() * 500}deg) scale(.8)`,
        opacity: 0
      }
    ], {
      duration: 2100 + Math.random() * 1500,
      easing: "cubic-bezier(.15,.7,.25,1)",
      delay: Math.random() * 180,
      fill: "forwards"
    });

    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 4300);
  }
}

// -------------------- BACKGROUND MUSIC --------------------
const audio = document.getElementById("birthdayAudio");
const MUSIC_FILE = "audio/Romantic%20Happy%20Birthday%20%28Arranged%20by%20Miranda%20Wong%29%20Piano%20Cover.mp3";

audio.src = MUSIC_FILE;
audio.loop = true;
audio.volume = 0.45;
audio.load();

async function startBackgroundMusic() {
  try {
    await audio.play();
    document.removeEventListener("pointerdown", startBackgroundMusic);
    document.removeEventListener("click", startBackgroundMusic);
    document.removeEventListener("touchstart", startBackgroundMusic);
    document.removeEventListener("keydown", startBackgroundMusic);
  } catch (error) {
    // The browser may require a later user interaction before allowing audio.
  }
}

document.addEventListener("pointerdown", startBackgroundMusic);
document.addEventListener("click", startBackgroundMusic);
document.addEventListener("touchstart", startBackgroundMusic, { passive: true });
document.addEventListener("keydown", startBackgroundMusic);

// -------------------- SIMPLE SWIPE SUPPORT --------------------
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener("touchend", e => {
  const x = e.changedTouches[0].screenX;
  const y = e.changedTouches[0].screenY;
  const dx = x - touchStartX;
  const dy = y - touchStartY;

  // Only treat a strong horizontal gesture as navigation.
  if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.3) {
    if (dx < 0) showScreen(current + 1);
    else showScreen(current - 1);
  }
}, { passive: true });

// Initial state
backBtn.style.visibility = "hidden";
progressBar.style.width = `${100 / screens.length}%`;


// -------------------- RANDOM SHOOTING STARS --------------------
const shootingContainer = document.body;

function createRandomShootingStar() {
  const star = document.createElement("span");
  star.className = "shooting-star random-shooter";

  const fromLeft = Math.random() > .5;
  star.style.top = `${8 + Math.random() * 55}%`;
  star.style.left = fromLeft ? `${12 + Math.random() * 70}%` : `${75 + Math.random() * 12}%`;
  star.style.transform = fromLeft ? "rotate(-35deg)" : "rotate(215deg)";

  shootingContainer.appendChild(star);

  const travelX = fromLeft ? -190 : 190;
  const travelY = 120 + Math.random() * 100;

  star.animate([
    { opacity: 0, transform: `${fromLeft ? "rotate(-35deg)" : "rotate(215deg)"} translate(0,0) scaleX(.4)` },
    { opacity: 1, offset: .08 },
    { opacity: 1, offset: .15 },
    { opacity: 0, transform: `${fromLeft ? "rotate(-35deg)" : "rotate(215deg)"} translate(${travelX}px, ${travelY}px) scaleX(1)` }
  ], {
    duration: 900 + Math.random() * 800,
    easing: "cubic-bezier(.2,.7,.3,1)"
  });

  setTimeout(() => star.remove(), 1900);
}

function scheduleShootingStar() {
  createRandomShootingStar();
  setTimeout(scheduleShootingStar, 4500 + Math.random() * 7500);
}

setTimeout(scheduleShootingStar, 2500);
