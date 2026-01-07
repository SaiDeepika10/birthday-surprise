document.addEventListener("DOMContentLoaded", () => {

  const birthday = new Date("January 6, 2026 21:20:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const celebrateBtn = document.getElementById("celebrateBtn");
  const messageText = document.getElementById("messageText");
  const midnightMsg = document.getElementById("midnightMsg");

  /* ================= CONFETTI ================= */
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confetti = [];
  let confettiStarted = false;

  function startConfetti() {
    if (confettiStarted) return;
    confettiStarted = true;

    for (let i = 0; i < 180; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 3 + 2,
        color: ["#ffcad4", "#f4acb7", "#e5989b", "#ffffff"][
          Math.floor(Math.random() * 4)
        ]
      });
    }
    requestAnimationFrame(drawConfetti);
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
      c.y += c.speed;
      if (c.y > canvas.height) c.y = -10;
    });
    requestAnimationFrame(drawConfetti);
  }

  /* ================= COUNTDOWN ================= */
  function updateCountdown() {
    const now = Date.now();
    const diff = birthday - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      messageText.style.display = "none";
      midnightMsg.style.display = "block";
      midnightMsg.className = "message msg-midnight";

      startConfetti();
      return;
    }

    daysEl.textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
    hoursEl.textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutesEl.textContent = Math.floor((diff / (1000 * 60)) % 60);
    secondsEl.textContent = Math.floor((diff / 1000) % 60);
  }

  /* ================= BUTTON LOGIC ================= */
  celebrateBtn.addEventListener("click", () => {
    const now = Date.now();
    const diff = birthday - now;

    messageText.style.display = "block";

    if (diff <= 0) {
      window.location.href = "cake.html";
      return;
    }

    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);

    messageText.className = "message";

    if (daysLeft > 7) {
      messageText.textContent = "Too earlyyy 😌 patience, love 💕";
      messageText.classList.add("msg-early");
    } else if (daysLeft > 1) {
      messageText.textContent = `Almost there 💖 Just ${daysLeft} days to go`;
      messageText.classList.add("msg-excited");
    } else if (daysLeft === 1) {
      messageText.textContent = "Tomorrow 👀✨ get ready, love 💕";
      messageText.classList.add("msg-anticipate");
    } else {
      messageText.textContent = `Soooo close ⏰ Just ${hoursLeft} hours left 💗`;
      messageText.classList.add("msg-tense");
    }
  });

  /* ================= RUN ================= */
  updateCountdown();
  setInterval(updateCountdown, 1000);

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

});

