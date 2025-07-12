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

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });

      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");

      if (document.body.classList.contains("nav-open")) {
        toggleNav();
      }

      setTimeout(() => {
        revealOnScroll();
      }, 700);
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

  function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
      let windowHeight = window.innerHeight;
      let revealTop = revealElements[i].getBoundingClientRect().top;
      let revealPoint = 100;

      if (
        revealTop < windowHeight - revealPoint &&
        !revealElements[i].classList.contains("hidden")
      ) {
        revealElements[i].classList.add("active");
      } else if (
        revealElements[i].classList.contains("active") &&
        (revealTop > windowHeight - revealPoint ||
          revealElements[i].classList.contains("hidden"))
      ) {
        revealElements[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  // Initial call to reveal elements already in view on page load
  revealOnScroll();

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

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector(".accordion-icon");

      content.classList.toggle("show");
      header.classList.toggle("active");
      icon.classList.toggle("active");

      if (content.classList.contains("show")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0";
      }
    });
  });

  const serviceItems = document.querySelectorAll(
    ".services-container .service-item"
  );
  const showMoreBtn = document.getElementById("showMoreServicesBtn");
  const itemsToShowInitially = 6;

  function initializeServiceItems() {
    if (serviceItems.length > itemsToShowInitially) {
      for (let i = itemsToShowInitially; i < serviceItems.length; i++) {
        serviceItems[i].classList.add("hidden");
        serviceItems[i].classList.remove("active");
      }
      showMoreBtn.style.display = "inline-block";
    } else {
      for (let i = 0; i < serviceItems.length; i++) {
        serviceItems[i].classList.remove("hidden");
      }
      showMoreBtn.style.display = "none";
    }

    revealOnScroll();
  }

  initializeServiceItems();

  showMoreBtn.addEventListener("click", function () {
    const isShowingAll = showMoreBtn.textContent === "Show Less Services";

    if (!isShowingAll) {
      let delay = 0;
      for (let i = itemsToShowInitially; i < serviceItems.length; i++) {
        serviceItems[i].classList.remove("hidden");

        const animationClass = serviceItems[i].classList.contains(
          "fade-in-left"
        )
          ? "fade-in-left"
          : "fade-in-right";
        serviceItems[i].classList.add(animationClass);
        setTimeout(() => {
          serviceItems[i].classList.add("active");
        }, delay);
        delay += 50;
      }
      showMoreBtn.textContent = "Show Less Services";
    } else {
      for (let i = serviceItems.length - 1; i >= itemsToShowInitially; i--) {
        const item = serviceItems[i];
        item.classList.remove("active");
        setTimeout(() => {
          item.classList.add("hidden");
        }, 500);
      }
      showMoreBtn.textContent = "Show More Services";
      document
        .getElementById("services")
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});
