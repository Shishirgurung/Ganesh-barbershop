const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots');
    const progress = document.querySelector('.progress');

    let currentIndex = 0;
    let isAnimating = false;
    let autoPlayInterval;
    const autoPlayDelay = 3000;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    function updateDots() {
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function startProgressBar() {
      progress.style.width = '0';
      setTimeout(() => {
        progress.style.width = '100%';
      }, 50);
    }

    function resetProgressBar() {
      progress.style.width = '0';
      progress.style.transition = 'none';
      setTimeout(() => {
        progress.style.transition = 'width 3s linear';
      }, 50);
    }

    function goToSlide(index) {
      if (!isAnimating) {
        isAnimating = true;
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
        resetProgressBar();
        startProgressBar();
        resetAutoPlay();
        
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      }
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(currentIndex);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Pause autoplay on hover
    slider.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
      progress.style.animationPlayState = 'paused';
    });

    slider.addEventListener('mouseleave', () => {
      resetAutoPlay();
      progress.style.animationPlayState = 'running';
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });

    // Start autoplay and progress bar
    startProgressBar();
    resetAutoPlay();