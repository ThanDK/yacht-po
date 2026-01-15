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
      counter.textContent = `${yacht.currentIndex + 1} / ${
        yacht.images.length
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

// ========== INITIALIZE ==========
document.addEventListener("DOMContentLoaded", () => {
  initGallery("merry", "merry-gallery");
  initGallery("camarat", "camarat-gallery");
  initSmoothScroll();
  initKeyboardNav();
  initMobileMenu();

  console.log("FLIPS Yacht Investment initialized");
});
