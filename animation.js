// Add to your existing JavaScript or create a new file
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
  
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in');
    animatedElements.forEach(element => observer.observe(element));
  });