document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  let pageLoaded = false;
  let minimumTimePassed = false;
  const minimumDisplayTime = 2000;

  function hidePreloader() {
    if (pageLoaded && minimumTimePassed) {
      preloader.classList.add("hidden");
    }
  }

  window.addEventListener("load", function () {
    pageLoaded = true;
    hidePreloader();
  });

  setTimeout(function () {
    minimumTimePassed = true;
    hidePreloader();
  }, minimumDisplayTime);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });

      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");

      if (document.body.classList.contains("nav-open")) {
        toggleNav();
      }
    });
  });

  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  function toggleNav() {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
    document.body.classList.toggle("nav-open");
    overlay.classList.toggle("active");
  }

  hamburger.addEventListener("click", toggleNav);
  overlay.addEventListener("click", toggleNav);

  const serviceItems = document.querySelectorAll(
    ".services-container .service-item"
  );
  const showMoreBtn = document.getElementById("showMoreServicesBtn");
  const itemsToShowInitially = 6;

  function initializeServiceItems() {
    if (serviceItems.length > itemsToShowInitially) {
      for (let i = itemsToShowInitially; i < serviceItems.length; i++) {
        serviceItems[i].classList.add("hidden");
      }
      showMoreBtn.style.display = "inline-block";
    } else {
      for (let i = 0; i < serviceItems.length; i++) {
        serviceItems[i].classList.remove("hidden");
      }
      showMoreBtn.style.display = "none";
    }
  }

  initializeServiceItems();

  showMoreBtn.addEventListener("click", function () {
    const isShowingAll = showMoreBtn.textContent === "Show Less Services";

    if (!isShowingAll) {
      let delay = 0;
      for (let i = itemsToShowInitially; i < serviceItems.length; i++) {
        const item = serviceItems[i];
        item.classList.remove("hidden");
        // Re-add animation classes to trigger animation when shown
        item.classList.remove("fade-in-left", "fade-in-right");
        const animationClass = i % 2 === 0 ? "fade-in-right" : "fade-in-left"; // Assuming alternating animations
        item.classList.add(animationClass);
        setTimeout(() => {
          item.classList.add("active");
        }, delay);
        delay += 50; // Staggered delay
      }
      showMoreBtn.textContent = "Show Less Services";
    } else {
      for (let i = serviceItems.length - 1; i >= itemsToShowInitially; i--) {
        const item = serviceItems[i];
        item.classList.remove("active"); // Trigger fade-out (if defined in CSS)
        // Delay hiding the element until animation completes
        setTimeout(() => {
          item.classList.add("hidden");
        }, 500); // Match CSS transition duration if applicable
      }
      showMoreBtn.textContent = "Show More Services";
      // Scroll to top of services section if it's not already visible or near top
      document
        .getElementById("services")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  function reloadPage() {
    location.reload();
  }

  const navbarLogo = document.querySelector(".navbar .logo img");
  if (navbarLogo) {
    navbarLogo.style.cursor = "pointer";
    navbarLogo.addEventListener("click", reloadPage);
  }

  const footerLogo = document.querySelector(".footer .footer-logo img");
  if (footerLogo) {
    footerLogo.style.cursor = "pointer";
    footerLogo.addEventListener("click", reloadPage);
  }
});
