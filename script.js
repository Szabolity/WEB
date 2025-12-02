// MOBILE NAV TOGGLE
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });
}


// LIGHT / DARK MODE TOGGLE
const modeToggleBtn = document.querySelector(".mode-toggle");
const body = document.body;

function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-theme");
    if (modeToggleBtn) {
      modeToggleBtn.classList.add("is-dark"); // for your icon swap in CSS if you want
    }
  } else {
    body.classList.remove("dark-theme");
    if (modeToggleBtn) {
      modeToggleBtn.classList.remove("is-dark");
    }
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("salamangka-theme");
applyTheme(savedTheme || "light");

// Toggle when clicking button
if (modeToggleBtn) {
  modeToggleBtn.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-theme");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("salamangka-theme", newTheme);
  });
}

// ===========================
// TESTIMONIAL SLIDER (simplified)
// ===========================
const testimonialCard = document.querySelector(".testimonial-card");

if (testimonialCard) {
  const contentEl = testimonialCard.querySelector(".testimonial-content");
  const quoteEl = testimonialCard.querySelector(".testimonial-quote");
  const authorEl = testimonialCard.querySelector(".testimonial-author");
  const metaEl = testimonialCard.querySelector(".testimonial-meta");
  const prevBtn = testimonialCard.querySelector(".testimonial-prev");
  const nextBtn = testimonialCard.querySelector(".testimonial-next");

  const testimonials = [
    {
      quote:
        '“Salamangka felt like a hidden sanctuary. <span class="highlight">The staff went out of their way to remember our names and preferences</span>, and every evening felt like a private celebration by the sea.”',
      author: "– Mia L., Manila",
      meta: "Stayed with us in March 2024",
    },
    {
      quote:
        '“From the moment we stepped onto the jetty, <span class="highlight">everything felt effortless</span>. Our snorkeling trips, sunset sails, and dinners were all arranged before we even thought to ask.”',
      author: "– Daniel & Aria, Singapore",
      meta: "Stayed with us in June 2024",
    },
    {
      quote:
        '“We woke up to gentle waves, spent our days exploring the reef, and ended each night under a sky full of stars. <span class="highlight">It was the reset our family truly needed</span>.”',
      author: "– The Ramirez Family",
      meta: "Stayed with us in December 2023",
    },
  ];

  let currentIndex = 0;
  let sliderTimer = null;
  let isAnimating = false;

  function renderTestimonial(index) {
    const t = testimonials[index];
    quoteEl.innerHTML = t.quote;
    authorEl.textContent = t.author;
    metaEl.textContent = t.meta;
  }

  function animateTo(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    // Step 1: fade/slide OUT
    contentEl.style.opacity = "0";
    contentEl.style.transform = "translateX(-20px)";

    setTimeout(() => {
      const total = testimonials.length;
      currentIndex = (newIndex + total) % total;

      // Step 2: instantly move to the right, update text
      renderTestimonial(currentIndex);
      contentEl.style.transform = "translateX(20px)";

      // Step 3: in the next frame, slide IN to center and fade in
      requestAnimationFrame(() => {
        contentEl.style.opacity = "1";
        contentEl.style.transform = "translateX(0)";
        setTimeout(() => {
          isAnimating = false;
        }, 350);
      });
    }, 200);
  }

  function goNext() {
    animateTo(currentIndex + 1);
  }

  function goPrev() {
    animateTo(currentIndex - 1);
  }

  function startAuto() {
    stopAuto();
    sliderTimer = setInterval(goNext, 3000); // every 3 seconds
  }

  function stopAuto() {
    if (sliderTimer) {
      clearInterval(sliderTimer);
      sliderTimer = null;
    }
  }

  // Initial state
  renderTestimonial(currentIndex);
  contentEl.style.opacity = "1";
  contentEl.style.transform = "translateX(0)";
  startAuto();

  // Button events
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goPrev();
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goNext();
      startAuto();
    });
  }

  // Pause on hover (desktop)
  testimonialCard.addEventListener("mouseenter", stopAuto);
  testimonialCard.addEventListener("mouseleave", startAuto);
}

