// ===============================
// TARGET DATE (17 Jan 2026)
// ===============================
const targetDate = new Date("2026-01-17T00:00:00").getTime();

// ===============================
// CONNECT HTML ELEMENTS
// ===============================
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const birthdayLetter = document.getElementById("birthdayLetter");

// ===============================
// CONFETTI SETUP
// ===============================
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ["#f78fb3", "#f3a683", "#f7d794", "#e0569a", "#ffffff"];

let confettiStarted = false;

// ===============================
// CREATE CONFETTI
// ===============================
function createConfetti() {
  for (let i = 0; i < 150; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10
    });
  }
}

// ===============================
// DRAW CONFETTI
// ===============================
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.rect(p.x, p.y, p.size, p.size);
    ctx.fill();
  });

  updateConfetti();
}

// ===============================
// UPDATE CONFETTI MOVEMENT
// ===============================
function updateConfetti() {
  confettiPieces.forEach((p) => {
    p.y += p.speed;
    p.x += Math.sin(p.y * 0.02);

    if (p.y > canvas.height) {
      p.y = -10;
    }
  });
}

// ===============================
// COUNTDOWN LOGIC
// ===============================
setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  // WHEN COUNTDOWN ENDS
  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    birthdayLetter.style.display = "block";

    // Start confetti once
    if (!confettiStarted) {
      confettiStarted = true;
      createConfetti();
      setInterval(drawConfetti, 20);
    }

    return;
  }

  // TIME CALCULATIONS
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // UPDATE UI
  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");

}, 1000);
function goToCakePage() {
  window.location.href = "cake.html";
}
