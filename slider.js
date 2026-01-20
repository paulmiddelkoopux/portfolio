// Before/After Image Comparison Slider
document.querySelectorAll('.before-after-slider').forEach(slider => {
    const sliderLine = slider.querySelector('.slider-line');
    const afterImage = slider.querySelector('.after-image');
    const isHorizontal = slider.classList.contains('before-after-slider-horizontal');
    let isDragging = false;
    
    function updateSliderPosition(coord) {
      const rect = slider.getBoundingClientRect();
      let percentage;
      
      if (isHorizontal) {
        const offsetY = coord - rect.top;
        percentage = Math.max(0, Math.min(100, (offsetY / rect.height) * 100));
        sliderLine.style.top = percentage + '%';
        afterImage.style.clipPath = `inset(${percentage}% 0 0 0)`;
      } else {
        const offsetX = coord - rect.left;
        percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
        sliderLine.style.left = percentage + '%';
        afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
      }
      
      sliderLine.setAttribute('aria-valuenow', Math.round(percentage));
    }
    
    // Mouse events
    sliderLine.addEventListener('mousedown', () => {
      isDragging = true;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updateSliderPosition(isHorizontal ? e.clientY : e.clientX);
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Touch events
    sliderLine.addEventListener('touchstart', (e) => {
      isDragging = true;
      e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        updateSliderPosition(isHorizontal ? e.touches[0].clientY : e.touches[0].clientX);
        e.preventDefault();
      }
    }, { passive: false });
    
    document.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Keyboard accessibility (arrow keys move 5% per press)
    sliderLine.addEventListener('keydown', (e) => {
      const currentValue = parseInt(sliderLine.getAttribute('aria-valuenow'));
      let newValue;
      
      if (isHorizontal) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          newValue = Math.max(0, currentValue - 5);
          sliderLine.style.top = newValue + '%';
          afterImage.style.clipPath = `inset(${newValue}% 0 0 0)`;
          sliderLine.setAttribute('aria-valuenow', newValue);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          newValue = Math.min(100, currentValue + 5);
          sliderLine.style.top = newValue + '%';
          afterImage.style.clipPath = `inset(${newValue}% 0 0 0)`;
          sliderLine.setAttribute('aria-valuenow', newValue);
        }
      } else {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          newValue = Math.max(0, currentValue - 5);
          sliderLine.style.left = newValue + '%';
          afterImage.style.clipPath = `inset(0 0 0 ${newValue}%)`;
          sliderLine.setAttribute('aria-valuenow', newValue);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          newValue = Math.min(100, currentValue + 5);
          sliderLine.style.left = newValue + '%';
          afterImage.style.clipPath = `inset(0 0 0 ${newValue}%)`;
          sliderLine.setAttribute('aria-valuenow', newValue);
        }
      }
    });
    
    // Click anywhere on slider to jump to that position
    slider.addEventListener('click', (e) => {
      if (!e.target.closest('.slider-line')) {
        updateSliderPosition(isHorizontal ? e.clientY : e.clientX);
      }
    });
  });
