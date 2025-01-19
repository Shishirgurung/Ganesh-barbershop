document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons
    feather.replace();
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
  
    // Fade-in animation for hero content
    const heroContent = document.querySelectorAll('.hero-content > *');
    heroContent.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('show');
        }, 200 * (index + 1));
    });
  
    // Fade-in animation for cards and section titles
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
  
    animatedElements.forEach(element => {
        observer.observe(element);
    });
  });