// Portfolio modal carousel logic.
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const modalEl = document.getElementById('portfolioModal');
    const modalTitleEl = document.getElementById('portfolioModalTitle');
    const carouselEl = document.getElementById('portfolioProjectCarousel');
    const carouselInnerEl = document.getElementById('portfolioProjectCarouselInner');

    if (!modalEl || !modalTitleEl || !carouselEl || !carouselInnerEl || !window.bootstrap) {
      return;
    }

    const modal = new bootstrap.Modal(modalEl);
    let carousel = null;
    let mobileRevealObserver = null;

    function setupMobilePortfolioReveal() {
      const items = document.querySelectorAll('.portfolio-item');
      if (!items.length) {
        return;
      }

      const isMobileViewport = window.matchMedia('(max-width: 991.98px)').matches;
      if (!isMobileViewport) {
        if (mobileRevealObserver) {
          mobileRevealObserver.disconnect();
          mobileRevealObserver = null;
        }
        items.forEach(function(item) {
          item.classList.remove('is-visible');
        });
        return;
      }

      if (!('IntersectionObserver' in window)) {
        items.forEach(function(item) {
          item.classList.add('is-visible');
        });
        return;
      }

      if (mobileRevealObserver) {
        mobileRevealObserver.disconnect();
      }

      mobileRevealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, {
        threshold: 0.45,
        rootMargin: '0px 0px -10% 0px'
      });

      items.forEach(function(item) {
        mobileRevealObserver.observe(item);
      });
    }

    function buildSlides(images) {
      return images
        .map(function(src, idx) {
          return '<div class="carousel-item' + (idx === 0 ? ' active' : '') + '">' +
            '<img class="d-block w-100" src="' + src + '" alt="Project image ' + (idx + 1) + '">' +
          '</div>';
        })
        .join('');
    }

    document.querySelectorAll('.portfolio-item[data-images]').forEach(function(card) {
      card.addEventListener('click', function(event) {
        event.preventDefault();

        const title = card.getAttribute('data-title') || 'Project';
        const images = (card.getAttribute('data-images') || '')
          .split(',')
          .map(function(item) { return item.trim(); })
          .filter(Boolean);

        if (!images.length) {
          return;
        }

        modalTitleEl.textContent = title;
        carouselInnerEl.innerHTML = buildSlides(images);

        if (carousel) {
          carousel.dispose();
        }

        carousel = new bootstrap.Carousel(carouselEl, {
          interval: false,
          wrap: true,
          touch: true
        });

        modal.show();
      });
    });

    setupMobilePortfolioReveal();
    window.addEventListener('resize', setupMobilePortfolioReveal);
  });
})();
