// Encapsulates all UI-related logic
window.UI = (function () {

  // Handles mobile navbar toggle
  function initNavbarToggle() {
    const toggle = document.querySelector(".navbar-toggle");
    const links = document.querySelector(".navbar-links");

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        links.classList.toggle("open");
      });
    }
  }

  // Handles theme switching and persistence
  function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    if (!toggleBtn) return;

    function updateTitle() {
      toggleBtn.title = body.classList.contains("light-theme")
        ? "Switch to Dark Mode"
        : "Switch to Light Mode";
    }

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      body.classList.remove("light-theme");
      toggleBtn.style.color = "#f5f5f5";
    } else {
      body.classList.add("light-theme");
      toggleBtn.style.color = "#6298bc";
    }

    updateTitle();

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-theme");

      const isLight = body.classList.contains("light-theme");

      toggleBtn.style.color = isLight ? "#6298bc" : "#f5f5f5";
      localStorage.setItem("theme", isLight ? "light" : "dark");

      updateTitle();
    });
  }

  // Profile image modal
  function initImageModal() {
    const modal = document.getElementById("image-modal");
    const img = document.getElementById("profile-image");
    const modalImg = document.getElementById("enlarged-image");
    const closeBtn = document.getElementById("close-modal");

    if (img && modal && modalImg && closeBtn) {
      img.onclick = () => {
        modal.style.display = "block";
        modalImg.src = img.src;
      };

      closeBtn.onclick = () => {
        modal.style.display = "none";
      };

      modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = "none";
      };
    }
  }

  // Renders gallery and initializes related features
  function initGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid) return;

    const images = [
      { src: 'travel/India/IMG_2337.jpg', country: 'in', title: 'Church Street', caption: 'June 2024 • Bangalore, India' },
        { src: 'travel/India/IMG_3933.jpg', country: 'in', title: 'South Bombay', caption: 'June 2023 • Mumbai, India' },
        { src: 'travel/India/IMG_4057.jpg', country: 'in', title: 'Marine Drive', caption: 'June 2023 • Mumbai, India' },
        { src: 'travel/India/IMG_4460.jpg', country: 'in', title: 'IIT Bombay', caption: 'July 2023 • Mumbai, India' },
        { src: 'travel/India/IMG_9496.jpg', country: 'in', title: 'Patrika Gate', caption: 'December 2023 • Jaipur, India' },
        { src: 'travel/India/IMG_9590.jpg', country: 'in', title: 'Amber Fort', caption: 'December 2023 • Jaipur, India' },
        { src: 'travel/Malaysia/IMG_5017.jpg', country: 'my', title: 'Petronas Twin Tower', caption: 'July 2024 • Kuala Lumpur, Malaysia' },
        { src: 'travel/Malaysia/IMG_5029.jpg', country: 'my', title: 'Pavilion, Bukit Bintang', caption: 'July 2024 • Kuala Lumpur, Malaysia' },
        { src: 'travel/Malaysia/IMG_5567.jpg', country: 'my', title: 'Cenang Beach', caption: 'July 2024 • Langkawi, Malaysia' },
    ];

    galleryGrid.innerHTML = images.map(img => `
      <div class="gallery-item" data-country="${img.country}">
        <img src="${img.src}" alt="${img.title}" />
        <div class="gallery-overlay">
          <div class="gallery-caption">
            <h3>${img.title}</h3>
            <p>${img.caption}</p>
          </div>
        </div>
      </div>
    `).join("");

    initGalleryModal();
    initGalleryFilters();
  }

  // Gallery image modal
  function initGalleryModal() {
    const modal = document.getElementById("gallery-image-modal");
    const modalImg = document.getElementById("gallery-enlarged-image");
    const closeBtn = document.getElementById("gallery-close-modal");

    if (!modal || !modalImg || !closeBtn) return;

    document.querySelectorAll(".gallery-item img").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
      });
    });

    closeBtn.onclick = () => modal.style.display = "none";

    modal.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };
  }

  // Filters gallery items by country
  function initGalleryFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".gallery-item");

    if (!buttons.length) return;

    function getCountryFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get("country") || "all";
    }

    function applyFilter(country) {
      items.forEach(item => {
        const match =
          country === "all" ||
          item.getAttribute("data-country") === country;

        item.style.display = match ? "" : "none";
      });
    }

    function updateURL(country) {
      const params = new URLSearchParams();
      if (country !== "all") params.set("country", country);

      window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
    }

    const initial = getCountryFromURL();
    applyFilter(initial);

    buttons.forEach(btn => {
      if (btn.dataset.country === initial) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const country = btn.dataset.country;
        applyFilter(country);
        updateURL(country);
      });
    });
  }

  // Filters articles by selected tags
  function initArticleFilters() {
    const buttons = document.querySelectorAll(".filter-button");
    const articles = document.querySelectorAll(".article-item");

    if (!buttons.length) return;

    const activeFilters = new Set();

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        if (activeFilters.has(filter)) {
          activeFilters.delete(filter);
          button.classList.remove("active");
        } else {
          activeFilters.add(filter);
          button.classList.add("active");
        }

        articles.forEach(article => {
          const tags = article.dataset.tags?.split(" ") || [];

          const visible =
            activeFilters.size === 0 ||
            [...activeFilters].some(f => tags.includes(f));

          article.style.display = visible ? "" : "none";
        });
      });
    });
  }

  // Initializes page-specific features
  function initPage() {
    initImageModal();
    initGallery();
    initArticleFilters();
  }

  return {
    initNavbarToggle,
    initThemeToggle,
    initPage
  };

})();

// Entry point for page-level features
document.addEventListener("DOMContentLoaded", () => {
  UI.initPage();
});