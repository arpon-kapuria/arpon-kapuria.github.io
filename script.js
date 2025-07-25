document.addEventListener('DOMContentLoaded', function() {
    // Modal logic for bio image (index.html)
    var modal = document.getElementById('image-modal');
    var img = document.getElementById('profile-image');
    var modalImg = document.getElementById('enlarged-image');
    var span = document.getElementById('close-modal');
    if (img && modal && modalImg && span) {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    // --- Dynamic Gallery Generation ---
    const galleryImages = [
        // Bangladesh 
        // { src: 'travel/Bangladesh/IMG_3874.jpg', country: 'bd', title: 'Marine Drive', caption: 'October 2024 • Kushtia, Bangladesh' },
        // India
        { src: 'travel/India/IMG_2337.jpg', country: 'in', title: 'Church Street', caption: 'June 2024 • Bangalore, India' },
        { src: 'travel/India/IMG_3933.jpg', country: 'in', title: 'South Bombay', caption: 'June 2023 • Mumbai, India' },
        { src: 'travel/India/IMG_4057.jpg', country: 'in', title: 'Marine Drive', caption: 'June 2023 • Mumbai, India' },
        { src: 'travel/India/IMG_4460.jpg', country: 'in', title: 'IIT Bombay', caption: 'July 2023 • Mumbai, India' },
        { src: 'travel/India/IMG_9496.jpg', country: 'in', title: 'Patrika Gate', caption: 'December 2023 • Jaipur, India' },
        { src: 'travel/India/IMG_9590.jpg', country: 'in', title: 'Amber Fort', caption: 'December 2023 • Jaipur, India' },
        // Malaysia
        { src: 'travel/Malaysia/IMG_5017.jpg', country: 'my', title: 'Petronas Twin Tower', caption: 'July 2024 • Kuala Lumpur, Malaysia' },
        { src: 'travel/Malaysia/IMG_5029.jpg', country: 'my', title: 'Pavilion, Bukit Bintang', caption: 'July 2024 • Kuala Lumpur, Malaysia' },
        { src: 'travel/Malaysia/IMG_5567.jpg', country: 'my', title: 'Cenang Beach', caption: 'July 2024 • Langkawi, Malaysia' },
        // { src: 'travel/Malaysia/IMG_5582.jpg', country: 'my', title: 'Langkawi Seasports', caption: 'July 2024 • Langkawi, Malaysia' },
    ];
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = galleryImages.map(img => `
          <div class="gallery-item" data-country="${img.country}">
            <img src="${img.src}" alt="${img.title}" />
            <div class="gallery-overlay">
              <div class="gallery-caption">
                <h3>${img.title}</h3>
                <p>${img.caption}</p>
              </div>
            </div>
          </div>
        `).join('');
    }

    // Modal logic for gallery images (gallery.html)
    var galleryModal = document.getElementById('gallery-image-modal');
    var galleryModalImg = document.getElementById('gallery-enlarged-image');
    var galleryClose = document.getElementById('gallery-close-modal');
    if (galleryModal && galleryModalImg && galleryClose) {
        document.querySelectorAll('.gallery-item img').forEach(function(galleryImg) {
            galleryImg.addEventListener('click', function() {
                galleryModal.style.display = "block";
                galleryModalImg.src = this.src;
            });
        });
        galleryClose.onclick = function() {
            galleryModal.style.display = "none";
        }
        // Optional: close modal when clicking outside image
        galleryModal.onclick = function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = "none";
            }
        }
    }

    // Gallery filter logic
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const country = this.getAttribute('data-country');
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (country === 'all' || item.getAttribute('data-country') === country) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Responsive Navbar Toggle for Mobile
    (function() {
      var toggle = document.querySelector('.navbar-toggle');
      var links = document.querySelector('.navbar-links');
      if (toggle && links) {
        toggle.addEventListener('click', function() {
          links.classList.toggle('open');
        });
      }
    })();
});