// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll-triggered fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to animatable elements
document.querySelectorAll(
  '.section-label, .content-heading, .content-text, .stats-row, .feature-card, .signup-form'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Form submission (placeholder)
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  const originalText = btn.textContent;
  btn.textContent = 'THANK YOU!';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.pointerEvents = '';
    e.target.reset();
  }, 3000);
});
