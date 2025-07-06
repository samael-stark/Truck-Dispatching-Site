document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });

      // Update active link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  // Sticky Navbar on scroll
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // Adjust this value to when you want the sticky effect to kick in
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
      let windowHeight = window.innerHeight;
      let revealTop = revealElements[i].getBoundingClientRect().top;
      let revealPoint = 100; // Element reveals when 100px from bottom of viewport

      if (revealTop < windowHeight - revealPoint) {
        revealElements[i].classList.add("active");
      } else {
        revealElements[i].classList.remove("active"); // Optional: remove if element scrolls out of view
      }
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run on page load to reveal elements already in view
});
