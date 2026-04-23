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
  });
})();
