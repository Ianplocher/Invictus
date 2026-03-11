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
  '.section-label, .content-heading, .content-text, .stats-row, .feature-card, .reg-card, .signup-form'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Form submission via Formspree
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-submit');
  const originalText = btn.textContent;
  btn.textContent = 'SENDING...';
  btn.style.pointerEvents = 'none';

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      btn.textContent = 'THANK YOU!';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.pointerEvents = '';
      }, 3000);
    } else {
      btn.textContent = 'ERROR — TRY AGAIN';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.pointerEvents = '';
      }, 3000);
    }
  }).catch(() => {
    btn.textContent = 'ERROR — TRY AGAIN';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.pointerEvents = '';
    }, 3000);
  });
});
