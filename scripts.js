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
  
  
 // Open Popup Function
window.openPopup = function(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.classList.add('active');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Trigger reflow to enable animation
    void popup.offsetWidth;
    popup.querySelector('.popup-content').classList.add('fade-in');
  }
};

// Close Popup Function
window.closePopup = function() {
  const popups = document.querySelectorAll('.character-popup.active');
  popups.forEach(popup => {
    // Remove the 'active' class
    popup.classList.remove('active');
    document.body.style.overflow = '';

    // Add the fade-out animation class
    const content = popup.querySelector('.popup-content');
    if (content) {
      content.classList.remove('fade-in'); // Remove fade-in if it exists
      content.classList.add('fade-out'); // Add fade-out animation
    }

    // Wait for the fade-out animation to complete before hiding the popup
    setTimeout(() => {
      popup.style.display = 'none';
      if (content) content.classList.remove('fade-out'); // Clean up fade-out class
    }, 500); // Match the duration of the fade-out animation (0.5s)
  });
};

function openPopup({ bg, stand, name, actor, story }) {
  document.getElementById('characterPopup').style.display = 'flex';
  document.getElementById('popupBg').style.backgroundImage = `url('${bg}')`;
  document.getElementById('popupStand').src = stand;
  document.getElementById('popupName').textContent = name;
  document.getElementById('popupActor').textContent = actor;
  document.getElementById('popupStory').textContent = story;
}

function closePopup() {
  document.querySelectorAll('.character-popup').forEach(popup => {
    popup.style.display = 'none';
  });
}

window.openPopup = openPopup;
window.closePopup = closePopup;

document.querySelectorAll('.character-thumbnails img').forEach(img => {
  img.addEventListener('click', function () {
    document.querySelectorAll('.character-thumbnails img').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});




  // Screenshots lightbox logic
  const screenshots = document.querySelectorAll(".story-gallery img, .screenshots img, .battle-images img, .glide__slide img, .city-images img");
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

//Trailer Section
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('trailer-video', {
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  let hasInteracted = false;
  const videoContainer = document.getElementById('video-container');

  window.addEventListener('scroll', () => {
    if (!hasInteracted) {
      hasInteracted = true;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoContainer.style.opacity = '1';
            event.target.unMute();
            event.target.playVideo();
          } else {
            event.target.pauseVideo();
          }
        });
      }, {
        threshold: 0.6
      });

      observer.observe(document.getElementById('trailer-video'));
    }
  }, { once: true });
}

// Load YouTube Iframe API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);


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