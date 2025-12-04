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
        '“Aurelia felt like a hidden sanctuary. <span class="highlight">The staff went out of their way to remember our names and preferences</span>, and every evening felt like a private celebration by the sea.”',
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

// ===========================
// FAQ ACCORDION
// ===========================
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length) {
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // close any other open items (optional, for "one at a time")
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
        }
      });

      // toggle this one
      if (!isOpen) {
        item.classList.add("is-open");
      } else {
        item.classList.remove("is-open");
      }
    });
  });
}

// ===========================
// CONTACT FORM SUBMISSION
// ===========================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: contactForm.querySelector('[name="name"]').value,
      email: contactForm.querySelector('[name="email"]').value,
      subject: contactForm.querySelector('[name="subject"]').value || "",
      message: contactForm.querySelector('[name="message"]').value || "",
    };

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formMessage.style.display = "none";

    try {
      const response = await fetch("https://lyframes.8700900.xyz/salamangka/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        formMessage.textContent = "Thank you! Your message has been sent successfully. We'll get back to you soon.";
        formMessage.style.color = "#171737ff";
        formMessage.style.display = "block";
        contactForm.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      formMessage.textContent = "Sorry, there was an error sending your message. Please try again later.";
      formMessage.style.color = "#dc3545";
      formMessage.style.display = "block";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// ===========================
// Room carousels (auto + manual)
// ===========================
(function () {
  const carousels = document.querySelectorAll('.room-carousel');
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.room-carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.room-carousel-nav.prev');
    const nextBtn = carousel.querySelector('.room-carousel-nav.next');

    let index = 0;
    let intervalId = null;

    function goToSlide(newIndex) {
      index = (newIndex + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function startAuto() {
      if (intervalId) return;
      intervalId = setInterval(() => {
        goToSlide(index + 1);
      }, 3000); // 3 seconds
    }

    function stopAuto() {
      if (!intervalId) return;
      clearInterval(intervalId);
      intervalId = null;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAuto();
        goToSlide(index - 1);
        startAuto();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAuto();
        goToSlide(index + 1);
        startAuto();
      });
    }

    // Pause on hover (desktop)
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    // Kick things off
    goToSlide(0);
    startAuto();
  });
})();

// ===========================
// GALLERY LIGHTBOX
// ===========================

document.addEventListener('DOMContentLoaded', function () {
  const images = Array.from(
    document.querySelectorAll('.gallery-masonry .gallery-tile img')
  );
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || images.length === 0) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
  }

  images.forEach((img, index) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(index));
  });

  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard support: ESC, arrows
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
});
