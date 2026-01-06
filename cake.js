const blowBtn = document.getElementById("blowBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const flame = document.getElementById("flame");
const fullBanner = document.getElementById("fullBanner");
const birthdaySound = document.getElementById("birthdaySound");

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ["#f78fb3", "#f3a683", "#f7d794", "#e0569a", "#ffffff"];
let confettiStarted = false;

// Show blow button after delay
setTimeout(() => {
  blowBtn.style.display = "inline-block";
}, 3000);

// Create confetti
function createConfetti() {
  for (let i = 0; i < 180; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

// Draw confetti
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    p.y += p.speed;

    if (p.y > canvas.height) {
      p.y = -10;
    }
  });
}

// Blow candle action
function blowCandle() {
  flame.style.display = "none";
  blowBtn.style.display = "none";

  // Show banner
  fullBanner.style.display = "flex";

  // Play sound
  birthdaySound.play();

  // Start confetti
  if (!confettiStarted) {
    confettiStarted = true;
    createConfetti();
    setInterval(drawConfetti, 20);
  }

  // Show surprise button
  setTimeout(() => {
    surpriseBtn.style.display = "inline-block";
  }, 1800);
}

// Go to dark page
function goNext() {
  window.location.href = "letter.html";
}
