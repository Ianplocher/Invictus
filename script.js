// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Mobile hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    hamburger.classList.toggle('hamburger-active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-overlay-active', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-open');
      hamburger.classList.remove('hamburger-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-overlay-active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('nav-open')) {
      navLinks.classList.remove('nav-open');
      hamburger.classList.remove('hamburger-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-overlay-active');
    }
  });
}

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

// Add fade-in class to animatable elements (check existence first)
const animatableSelectors = [
  '.section-label',
  '.content-heading',
  '.content-text',
  '.stats-row',
  '.feature-card',
  '.reg-card',
  '.signup-form',
  '.value-card',
  '.event-card',
  '.expect-item',
  '.faq-item',
  '.contact-info-item',
  '.step-item',
  '.social-links-large',
  '.calendar-placeholder',
  '.schedule-table-wrapper'
];

document.querySelectorAll(animatableSelectors.join(', ')).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Form submission via Formspree (check for form existence)
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
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
}
