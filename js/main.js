document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. Theme Toggle (Dark/Light Mode)
  // =========================================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector("i");
  const htmlElement = document.documentElement;

  // Check Local Storage
  const currentTheme = localStorage.getItem("theme") || "light";
  htmlElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    const newTheme =
      htmlElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }

  // =========================================
  // 2. Navigation (Mobile & Sticky)
  // =========================================
  const header = document.getElementById("header");
  const toggleMenuBtn = document.querySelector(".toggle-menu");
  const navLinks = document.querySelector(".nav-links");

  // Sticky Header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // Mobile Menu Toggle
  toggleMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    header.classList.toggle("open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      e.target !== toggleMenuBtn &&
      e.target !== navLinks &&
      !navLinks.contains(e.target)
    ) {
      header.classList.remove("open");
    }
  });

  // =========================================
  // 3. Smooth Scroll & Active Link
  // =========================================
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((a) => {
      a.classList.remove("active");
      if (a.dataset.section === current) {
        a.classList.add("active");
      }
    });
  });

  // =========================================
  // 4. Portfolio Filtering
  // =========================================
  const filterBtns = document.querySelectorAll(".shuffle li");
  const portfolioItems = document.querySelectorAll(".imgs-container .box");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active to current
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.classList.remove("hidden");
          item.classList.add("animate-in");
        } else {
          item.classList.add("hidden");
          item.classList.remove("animate-in");
        }
      });
    });
  });

  // =========================================
  // 5. Stats Counter & Skills Animation
  // =========================================
  const statsSection = document.querySelector(".stats");
  const numbers = document.querySelectorAll(".stats .number");
  const skillsSection = document.querySelector(".our-skills");
  const progressSpans = document.querySelectorAll(".prog span");
  let startedStats = false;
  let startedSkills = false;

  window.addEventListener("scroll", () => {
    // Stats
    if (statsSection && window.scrollY >= statsSection.offsetTop - 500) {
      if (!startedStats) {
        numbers.forEach((num) => startCount(num));
      }
      startedStats = true;
    }

    // Skills
    if (skillsSection && window.scrollY >= skillsSection.offsetTop - 500) {
      if (!startedSkills) {
        progressSpans.forEach((span) => {
          span.style.width = span.dataset.progress;
        });
      }
      startedSkills = true;
    }
  });

  function startCount(el) {
    const goal = el.dataset.target;
    let count = setInterval(() => {
      el.textContent++;
      if (el.textContent == goal) {
        clearInterval(count);
      }
    }, 2000 / goal);
  }

  // =========================================
  // 6. Scroll Reveal Animations
  // =========================================
  const revealElements = document.querySelectorAll(
    ".fade-up, .fade-left, .fade-right",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // =========================================
  // 7. Scroll To Top Button
  // =========================================
  const scrollToTopBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      scrollToTopBtn.classList.add("show");
      scrollToTopBtn.style.display = "flex"; // Ensure flex for centering
    } else {
      scrollToTopBtn.classList.remove("show");
      setTimeout(() => {
        if (!scrollToTopBtn.classList.contains("show"))
          scrollToTopBtn.style.display = "none";
      }, 300);
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // =========================================
  // 8. Testimonials Sliders
  // =========================================
  const bullets = document.querySelectorAll(".testimonials .bullets li");
  const testimonials = document.querySelectorAll(".testimonials .content");

  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
      // Remove active class from all bullets
      bullets.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked bullet
      bullet.classList.add("active");

      // Hide all testimonials
      testimonials.forEach((t) => {
        t.classList.remove("active");
        t.classList.add("hidden");
      });

      // Show target testimonial
      // Assuming 1-to-1 mapping or modulo if fewer testimonials than bullets
      const targetIndex = index % testimonials.length;
      testimonials[targetIndex].classList.remove("hidden");
      testimonials[targetIndex].classList.add("active");
    });
  });
});
