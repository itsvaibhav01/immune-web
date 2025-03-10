window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;
var interp_images = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

$(document).ready(function() {
  // Toggle navbar burger
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Preload interpolation images
  preloadInterpolationImages();
  $('#interpolation-slider').on('input', function() {
    setInterpolationImage(this.value);
  });
  setInterpolationImage(0);
  $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

  // Removed Bulma Carousel initialization as we are using our custom slideshow.
  bulmaSlider.attach();
});

/* ------------------------------------
   Custom Video Carousel Functionality
------------------------------------ */
document.addEventListener("DOMContentLoaded", function(){
  const slides = document.querySelectorAll('.slide');
  const arrowLeft = document.querySelector('.arrow.left');
  const arrowRight = document.querySelector('.arrow.right');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  function showSlide(index) {
    if(index < 0) index = slides.length - 1;
    if(index >= slides.length) index = 0;
    currentIndex = index;

    // Hide all slides and reset videos
    slides.forEach(slide => {
      slide.classList.remove('active');
      const vid = slide.querySelector('video');
      vid.pause();
      vid.currentTime = 0;
    });

    // Show selected slide and play its video
    slides[currentIndex].classList.add('active');
    slides[currentIndex].querySelector('video').play();

    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  // Navigation arrows
  arrowLeft.addEventListener('click', () => showSlide(currentIndex - 1));
  arrowRight.addEventListener('click', () => showSlide(currentIndex + 1));

  // Dot indicator click events
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // Initialize slideshow
  showSlide(currentIndex);
});
