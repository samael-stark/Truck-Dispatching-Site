document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     PRELOADER
  ========================= */

  const preloader = document.getElementById("preloader");

  let pageLoaded = false;
  let minimumTimePassed = false;

  const minimumDisplayTime = 1200;

  function hidePreloader() {
    if (pageLoaded && minimumTimePassed) {
      preloader.classList.add("hidden");
    }
  }

  window.addEventListener("load", () => {
    pageLoaded = true;
    hidePreloader();
  });

  setTimeout(() => {
    minimumTimePassed = true;
    hidePreloader();
  }, minimumDisplayTime);

  /* =========================
     HEADER SCROLL EFFECT
  ========================= */

  const header = document.querySelector(".header");

  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll);

  /* =========================
     MOBILE NAVIGATION
  ========================= */

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  document.body.appendChild(overlay);

  function openNav() {
    hamburger.classList.add("open");
    navLinks.classList.add("open");
    overlay.classList.add("active");
    document.body.classList.add("nav-open");
  }

  function closeNav() {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-open");
  }

  function toggleNav() {
    if (navLinks.classList.contains("open")) {
      closeNav();
    } else {
      openNav();
    }
  }

  hamburger.addEventListener("click", toggleNav);
  overlay.addEventListener("click", closeNav);

  /* =========================
     SMOOTH SCROLL
  ========================= */

  const navItems = document.querySelectorAll('a[href^="#"]');

  navItems.forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);

      if (!targetSection) return;

      e.preventDefault();

      const headerHeight = header.offsetHeight;

      const targetPosition =
        targetSection.offsetTop - headerHeight + 2;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      closeNav();

    });

  });

  /* =========================
     ACTIVE NAVIGATION
  ========================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinkItems = document.querySelectorAll(".nav-link");

  function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }

    });

    navLinkItems.forEach((link) => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") === `#${currentSection}`
      ) {
        link.classList.add("active");
      }

    });

  }

  window.addEventListener("scroll", updateActiveNav);

  /* =========================
     REVEAL ANIMATION
  ========================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }

      });

    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =========================
     SERVICES SHOW MORE
  ========================= */

  const serviceItems = document.querySelectorAll(
    ".services-container .service-item"
  );

  const showMoreBtn = document.getElementById(
    "showMoreServicesBtn"
  );

  const initialItemsDesktop = 6;
  const initialItemsMobile = 4;

  let isExpanded = false;

  function getInitialItemsCount() {
    return window.innerWidth <= 768
      ? initialItemsMobile
      : initialItemsDesktop;
  }

  function initializeServices() {

    const visibleCount = getInitialItemsCount();

    if (serviceItems.length <= visibleCount) {

      showMoreBtn.style.display = "none";

      serviceItems.forEach((item) => {
        item.classList.remove("hidden");
      });

      return;
    }

    serviceItems.forEach((item, index) => {

      if (index >= visibleCount) {
        item.classList.add("hidden");
      } else {
        item.classList.remove("hidden");
      }

    });

    showMoreBtn.style.display = "inline-flex";
    showMoreBtn.textContent = "Show More Services";

    isExpanded = false;

  }

  initializeServices();

  showMoreBtn.addEventListener("click", () => {

    const visibleCount = getInitialItemsCount();

    if (!isExpanded) {

      serviceItems.forEach((item) => {
        item.classList.remove("hidden");
      });

      showMoreBtn.textContent = "Show Less Services";

      isExpanded = true;

    } else {

      serviceItems.forEach((item, index) => {

        if (index >= visibleCount) {
          item.classList.add("hidden");
        }

      });

      showMoreBtn.textContent = "Show More Services";

      isExpanded = false;

      const servicesSection =
        document.getElementById("services");

      const offset =
        servicesSection.offsetTop - header.offsetHeight;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });

    }

  });

  window.addEventListener("resize", () => {

    if (!isExpanded) {
      initializeServices();
    }

    if (window.innerWidth > 768) {
      closeNav();
    }

  });

  /* =========================
     LOGO RELOAD
  ========================= */

  const logoImages = document.querySelectorAll(
    ".logo img, .footer-logo img"
  );

  logoImages.forEach((logo) => {

    logo.style.cursor = "pointer";

    logo.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    });

  });

});
