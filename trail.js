// Save the script as 'trail.js'

document.addEventListener('DOMContentLoaded', () => {
  const transitionElement = document.querySelector('.page-transition');
  const hairstyleLinks = document.querySelectorAll('.hairstyle-card a');

  hairstyleLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = link.href;

      transitionElement.classList.add('active');

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 800);
    });
  });

  // Handle back navigation
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      transitionElement.classList.remove('active');
    }
  });
});

