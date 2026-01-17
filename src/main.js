/**
 * FLIPS Yacht Investment - Main JavaScript
 * Handles gallery navigation, tab switching, and smooth scrolling
 */

// ========== YACHT IMAGE DATA ==========
const yachtData = {
  merry: {
    images: [
      "/images/merry/สำเนาของ merry fisher 1095 fly no2.png",
      "/images/merry/สำเนาของ merry fisher 1095 fly no4.png",
      "/images/merry/สำเนาของ merry fisher 1095 fly no6.png",
      "/images/merry/สำเนาของ merry fisher 1095 fly no8.png",
      "/images/merry/สำเนาของ merry fisher 1095 fly no9.png",
      "/images/merry/merryfisher bedroom.png",
      "/images/merry/สำเนาของ merry fisher 1095 fly no5.png",
      "/images/merry/สำเนาของ merry fisher 1095 fly no12.png",
    ],
    currentIndex: 0,
  },
  camarat: {
    images: [
      "/images/camarat/77ac1c1dc7b378bb076cf0b4c253b68f.jpg",
      "/images/camarat/3d1419f0f1dc55bcf446c7060a1e68f7.jpg",
      "/images/camarat/641c207101657dee364371efd7ab78db.jpg",
      "/images/camarat/8766d168768a4b3bad3938ae6fa5a81a.jpg",
      "/images/camarat/962db5ee9590527c95f3be29a961d9c2.jpg",
      "/images/camarat/c96173b83d8365ae5b6595c7493b499c.jpg",
      "/images/camarat/33ae4bd98ca6991d7ab2632876e1ab87.jpg",
      "/images/camarat/95ebe9151fa9e66bed139fb91da7c1b3.jpg",
      "/images/camarat/bab15785f906f7eca38a7e2a395378fa.jpg",
      "/images/camarat/cc17b76dcd540dd0d8287370a2a69b99.jpg",
    ],
    currentIndex: 0,
  },
};

// ========== GALLERY FUNCTIONS ==========
function initGallery(yachtKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const yacht = yachtData[yachtKey];
  const featured = container.querySelector(".featured-img");
  const counter = container.querySelector(".img-counter");
  const thumbs = container.querySelectorAll(".thumb-btn");
  const prevBtn = container.querySelector(".nav-prev");
  const nextBtn = container.querySelector(".nav-next");
  const tabs = container.querySelectorAll(".gallery-tab");

  function updateGallery() {
    // Update featured image with fade
    if (featured) {
      featured.style.opacity = "0";
      setTimeout(() => {
        featured.src = yacht.images[yacht.currentIndex];
        featured.style.opacity = "1";
      }, 150);
    }

    // Update counter
    if (counter) {
      counter.textContent = `${yacht.currentIndex + 1} / ${yacht.images.length
        }`;
    }

    // Update thumbnail highlights
    thumbs.forEach((thumb, i) => {
      if (i === yacht.currentIndex) {
        thumb.classList.add("ring-2", "ring-ocean-500", "ring-offset-2");
        thumb.classList.remove("opacity-60");
      } else {
        thumb.classList.remove("ring-2", "ring-ocean-500", "ring-offset-2");
        thumb.classList.add("opacity-60");
      }
    });
  }

  // Navigation
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      yacht.currentIndex =
        (yacht.currentIndex - 1 + yacht.images.length) % yacht.images.length;
      updateGallery();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      yacht.currentIndex = (yacht.currentIndex + 1) % yacht.images.length;
      updateGallery();
    });
  }

  // Thumbnail clicks
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      yacht.currentIndex = i;
      updateGallery();
    });
  });

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active", "bg-navy-700", "text-white");
        t.classList.add("bg-gray-100", "text-gray-600");
      });
      tab.classList.add("active", "bg-navy-700", "text-white");
      tab.classList.remove("bg-gray-100", "text-gray-600");
    });
  });

  return { updateGallery };
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ========== KEYBOARD NAVIGATION ==========
function initKeyboardNav() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      yachtData.merry.currentIndex =
        (yachtData.merry.currentIndex + 1) % yachtData.merry.images.length;
      yachtData.camarat.currentIndex =
        (yachtData.camarat.currentIndex + 1) % yachtData.camarat.images.length;
      // Trigger update for visible gallery
      document.querySelectorAll(".featured-img").forEach((img) => {
        img.dispatchEvent(new Event("update"));
      });
    } else if (e.key === "ArrowLeft") {
      yachtData.merry.currentIndex =
        (yachtData.merry.currentIndex - 1 + yachtData.merry.images.length) %
        yachtData.merry.images.length;
      yachtData.camarat.currentIndex =
        (yachtData.camarat.currentIndex - 1 + yachtData.camarat.images.length) %
        yachtData.camarat.images.length;
    }
  });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !menu) return;

  // Toggle menu
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Close on link click
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });

  // Close on click outside
  document.addEventListener("click", (e) => {
    if (
      !menu.contains(e.target) &&
      !btn.contains(e.target) &&
      !menu.classList.contains("hidden")
    ) {
      menu.classList.add("hidden");
    }
  });
}

// ========== SCROLL STATUS BAR ==========
function initStatusBar() {
  const dots = document.querySelectorAll(".status-dot");
  const sections = [
    { id: "top", element: document.body },
    { id: "fleet", element: document.querySelector("#fleet") },
    { id: "merry", element: document.querySelector("#merry") },
    { id: "camarat", element: document.querySelector("#camarat") },
    { id: "investment", element: document.querySelector("#investment") },
  ];

  // Click handler
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const target = sections[index];
      if (target && target.element) {
        // Special case for top
        if (target.id === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          target.element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Scroll handler
  function updateActiveDot() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    let activeIndex = 0;
    sections.forEach((section, index) => {
      if (section.element && section.element.offsetTop <= scrollPosition) {
        activeIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
        dot.classList.remove("bg-white/20"); // In case we use transparency
      } else {
        dot.classList.remove("active");
        // dot.classList.add('bg-white/20');
      }
    });
  }

  window.addEventListener("scroll", updateActiveDot, { passive: true });
  updateActiveDot(); // Initial check
}
// ========== FULLSCREEN LIGHTBOX ==========
let currentLightboxYacht = null;

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox) return;

  function openLightbox(yachtKey) {
    currentLightboxYacht = yachtKey;
    const yacht = yachtData[yachtKey];
    lightboxImg.src = yacht.images[yacht.currentIndex];
    lightboxCounter.textContent = `${yacht.currentIndex + 1} / ${yacht.images.length}`;
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
    currentLightboxYacht = null;
  }

  function navigateLightbox(direction) {
    if (!currentLightboxYacht) return;
    const yacht = yachtData[currentLightboxYacht];
    if (direction === "next") {
      yacht.currentIndex = (yacht.currentIndex + 1) % yacht.images.length;
    } else {
      yacht.currentIndex = (yacht.currentIndex - 1 + yacht.images.length) % yacht.images.length;
    }
    lightboxImg.src = yacht.images[yacht.currentIndex];
    lightboxCounter.textContent = `${yacht.currentIndex + 1} / ${yacht.images.length}`;
  }

  // Click on featured images to open lightbox
  document.querySelectorAll(".featured-img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      // Determine which yacht gallery this belongs to
      const container = img.closest("[id$='-gallery']");
      if (container) {
        const yachtKey = container.id.replace("-gallery", "");
        openLightbox(yachtKey);
      }
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigation
  prevBtn.addEventListener("click", () => navigateLightbox("prev"));
  nextBtn.addEventListener("click", () => navigateLightbox("next"));

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navigateLightbox("next");
    if (e.key === "ArrowLeft") navigateLightbox("prev");
  });
}

// ========== FORCE VIDEO AUTOPLAY ==========
function forceVideoPlay() {
  const heroVideo = document.getElementById("hero-video");
  const mobileVideo = document.querySelector("video:not(#hero-video)");

  function attemptPlay(video) {
    if (!video) return;

    // Ensure video is muted (required for autoplay)
    video.muted = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked - wait for user interaction
        document.addEventListener("click", () => video.play(), { once: true });
        document.addEventListener("touchstart", () => video.play(), { once: true });
        document.addEventListener("scroll", () => video.play(), { once: true });
      });
    }
  }

  // Try multiple events to ensure video plays
  function setupVideoPlay(video) {
    if (!video) return;

    // Play immediately if ready
    attemptPlay(video);

    // Play when video data is ready
    video.addEventListener("loadeddata", () => attemptPlay(video));
    video.addEventListener("canplaythrough", () => attemptPlay(video));

    // Resume when tab becomes visible again
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && video.paused) {
        attemptPlay(video);
      }
    });
  }

  setupVideoPlay(heroVideo);
  setupVideoPlay(mobileVideo);
}

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
  initGallery("merry", "merry-gallery");
  initGallery("camarat", "camarat-gallery");
  initSmoothScroll();
  initKeyboardNav();
  initMobileMenu();
  initStatusBar();
  initLightbox();
  forceVideoPlay();
});
