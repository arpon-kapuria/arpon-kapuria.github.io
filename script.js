
// smoothens scrolling to sections:
// document.querySelectorAll('a').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// Get the modal
var modal = document.getElementById('image-modal');

// Get the image and insert it inside the modal
var img = document.getElementById('profile-image');
var modalImg = document.getElementById('enlarged-image');
img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
}

// Get the <span> element that closes the modal
var span = document.getElementById('close-modal');

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
