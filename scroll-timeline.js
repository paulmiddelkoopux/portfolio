document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.project li');

  if (items.length === 0) {
    return;
  }

  let ticking = false;

  const updateStates = () => {
    const viewportCenter = window.innerHeight / 2;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();

      // When the top of the item is above the vertical center of the viewport,
      // consider it "scrolled past".
      if (rect.top < viewportCenter) {
        item.classList.add('scrolled-past');
      } else {
        item.classList.remove('scrolled-past');
      }
    });

    ticking = false;
  };

  const onScrollOrResize = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateStates);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);

  // Initial state in case the page loads scrolled down.
  updateStates();
});

