// Анімований лічильник для Counters Section
(function() {
  function animateCounter(el, target, duration = 1600) {
    let start = 0;
    let startTime = null;
    target = +target;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (target === 99) {
          el.textContent = '99%';
        } else if (target === 30) {
          el.textContent = '30+';
        } else {
          el.textContent = target;
        }
      }
    }
    requestAnimationFrame(step);
  }
  document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    let animated = false;
    function isCountersInView() {
      const section = document.querySelector('.counters-section');
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }
    function triggerCounters() {
      if (!animated && isCountersInView()) {
        counters.forEach(el => {
          animateCounter(el, el.getAttribute('data-target'));
        });
        animated = true;
      }
    }
    window.addEventListener('scroll', triggerCounters);
    triggerCounters();
  });
})();
