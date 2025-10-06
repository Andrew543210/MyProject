// Portfolio blur reveal on scroll for mobile
(function() {
  function isMobile() {
    return window.innerWidth <= 768;
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    // Center of viewport
    const viewportCenter = window.innerHeight / 2;
    const elemCenter = rect.top + rect.height / 2;
    // Consider in center if center of element is within 30% of viewport center
    return Math.abs(elemCenter - viewportCenter) < rect.height / 2;
  }

  function revealOnScroll() {
    if (!isMobile()) return;
    document.querySelectorAll('.portfolio-item img').forEach(img => {
      if (isInViewport(img.parentElement)) {
        img.classList.add('reveal');
      } else {
        img.classList.remove('reveal');
      }
    });
  }

  if (isMobile()) {
    // Set initial blur
    document.querySelectorAll('.portfolio-item img').forEach(img => {
      img.classList.remove('reveal');
    });
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);
    revealOnScroll();
  }
})();
