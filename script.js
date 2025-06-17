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
});