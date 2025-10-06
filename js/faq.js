// FAQ accordion logic
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        // Закриваємо всі інші
        document.querySelectorAll('.faq-item').forEach(function(other) {
          if (other !== item) other.classList.remove('active');
        });
        // Тогл для поточного
        item.classList.toggle('active');
      });
      // Додаємо підтримку клавіатури
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
  });
})();
