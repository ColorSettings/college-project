document.addEventListener('DOMContentLoaded', () => {
  console.log('Custom JS loaded');

  // Initialize AOS animations
  AOS.init({ duration: 800, once: true });

  // Toggle mobile nav
  window.toggleMenu = function () {
    document.getElementById('nav-links').classList.toggle('active');
  };

  // Smooth scroll for anchor links
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const yOffset = -60;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

        console.log('Anchor clicked:', anchor);
        window.scrollTo({ top: y, behavior: 'smooth' });
        document.getElementById('nav-links')?.classList.remove('active');
      } else {
        console.warn('Target not found for anchor:', anchor);
      }
    }
  });
  // Story Section
  AOS.init({
    duration: 800,
    once: true
  });
  
  
  // Character popups (Coming Soon & Playable)
  const cards = document.querySelectorAll('.character-card');
  const popupOverlay = document.createElement('div');
  popupOverlay.className = 'popup-overlay';
  document.body.appendChild(popupOverlay);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const info = card.querySelector('.character-info');
      const name = card.querySelector('h3')?.innerText || "Coming Soon";

      popupOverlay.innerHTML = `
        <div class="popup fade-in">
          <button class="popup-close">&times;</button>
          <div class="popup-left"></div>
          <div class="popup-middle"></div>
          <div class="popup-right">
            <h3>${name}</h3>
            <p>${info ? info.innerHTML : "More information will be revealed soon."}</p>
          </div>
        </div>
      `;
      popupOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      popupOverlay.querySelector('.popup-close').addEventListener('click', () => {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => popupOverlay.innerHTML = '', 400);
      });
    });
  });

  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => popupOverlay.innerHTML = '', 400);
    }
  });

  // Screenshots lightbox logic
  const screenshots = document.querySelectorAll(".story-gallery img, .screenshots img",);
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-lightbox");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  
  let currentIndex = 0;
  
  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = screenshots[currentIndex].getAttribute("data-full") || screenshots[currentIndex].src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
  
  function showNext() {
    currentIndex = (currentIndex + 1) % screenshots.length;
    openLightbox(currentIndex);
  }
  
  function showPrev() {
    currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    openLightbox(currentIndex);
  }
  
  screenshots.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });
  
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeLightbox();
  });
});


//Battle Carousel
document.addEventListener('DOMContentLoaded', () => {
  new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    gap: 0,
    animationDuration: 600,
    autoplay: 3000, // Set to 3000 for auto-slide
    hoverpause: true
  }).mount();
});

// Youtube Video Autoplay on Scroll
  const video = document.getElementById('trailer-video');
  const soundToggle = document.getElementById('sound-toggle');
  let isMuted = false;

  // Attempt to play with sound
  video.muted = false;
  video.volume = 1;

  const tryAutoplay = () => {
    video.play().catch(() => {
      // Autoplay with sound failed — fallback to muted
      video.muted = true;
      video.play();
      isMuted = true;
      soundToggle.textContent = '🔇';
    });
  };

  // Intersection observer to play/pause on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tryAutoplay();
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(video);

  // Toggle mute/unmute
  soundToggle.addEventListener('click', () => {
    if (video.muted || isMuted) {
      // Fade in volume
      video.muted = false;
      video.volume = 0;
      isMuted = false;
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          video.volume = Math.min(vol, 1);
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
      soundToggle.textContent = '🔊';
    } else {
      video.muted = true;
      isMuted = true;
      soundToggle.textContent = '🔇';
    }
  });

  //Image Duplications
  window.addEventListener("DOMContentLoaded", () => {
    const scrollerRow = document.getElementById("scrollerRow");

    // Clone all children (images)
    const images = Array.from(scrollerRow.children);
    images.forEach((img) => {
      const clone = img.cloneNode(true);
      scrollerRow.appendChild(clone);
    });
  });
