/*/loading animation
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader-wrapper').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.loader-wrapper').style.opacity = 'none';
    }, 500);
  }, 2000);
});*/
// Wait for the DOM to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {

  // --- HEADER SCROLL EFFECT ---
  // Adds a background to the header when the user scrolls down
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { // Add class after 50px of scrolling
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  // Selects all navigation links pointing to an ID on the page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent the default instant jump

      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      // Scrolls smoothly to the target element, with a 100px offset for the fixed header
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });

  // --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ---
  // This will add a class to elements when they enter the viewport
  const achievementCards = document.querySelectorAll('.achievement-card');

  const achievementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // If the element is intersecting (visible), add the 'in-view' class
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  // Tell the observer to watch each achievement card
  achievementCards.forEach(card => {
    achievementObserver.observe(card);
  });

});


// --- LOADING ANIMATION ---
// This runs after all content (including images) has loaded
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) {
    // Wait 2 seconds before starting the fade-out
    setTimeout(() => {
      loader.style.opacity = '0';
      // After the fade-out transition, hide the element completely
      // Note: Changed 'opacity = 'none'' to 'display = 'none'' for correct behavior
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 2000);
  }
});