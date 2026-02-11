/* ============================================
   CRUSADERS GYM — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ----- DOM Ready ----- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initGalleryLightbox();
    initContactForm();
  }

  /* ============================================
     NAVBAR — scroll effect
     ============================================ */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================
     MOBILE MENU
     ============================================ */
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
  const isOpen = !menu.classList.contains('open');  // Check current state before toggle

  menu.classList.toggle('open');
  toggle.classList.toggle('active');
  toggle.setAttribute('aria-expanded', isOpen);

  // Use class instead of inline style for body lock (better for CSS overrides)
  document.body.classList.toggle('menu-open', isOpen);
});

    // Close on link click
    menu.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* ============================================
     GALLERY LIGHTBOX
     ============================================ */
  function initGalleryLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    if (!items.length || !lightbox) return;

    const lbImg = lightbox.querySelector('.lightbox-img');
    const btnClose = lightbox.querySelector('.lightbox-close');
    const btnPrev = lightbox.querySelector('.lightbox-prev');
    const btnNext = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    const images = Array.from(items).map((item) => {
      const img = item.querySelector('img');
      return img ? img.getAttribute('data-full') || img.src : '';
    });

    function openLightbox(index) {
      currentIndex = index;
      lbImg.src = images[currentIndex];
      lbImg.alt = 'Gallery image ' + (currentIndex + 1);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      currentIndex = (currentIndex + dir + images.length) % images.length;
      lbImg.src = images[currentIndex];
      lbImg.alt = 'Gallery image ' + (currentIndex + 1);
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') openLightbox(i);
      });
    });

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnPrev) btnPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    if (btnNext) btnNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  /* ============================================
     CONTACT FORM — validation + Netlify
     ============================================ */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const msgEl = document.getElementById('formMessage');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot check
      const honey = form.querySelector('[name="website"]');
      if (honey && honey.value) return;

      // Validate
      let isValid = true;
      const required = form.querySelectorAll('[required]');

      required.forEach((field) => {
        const group = field.closest('.form-group');
        const errorEl = group ? group.querySelector('.form-error') : null;

        // Reset
        if (group) group.classList.remove('invalid');

        if (!field.value.trim()) {
          isValid = false;
          if (group) group.classList.add('invalid');
          if (errorEl) errorEl.textContent = 'This field is required';
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          isValid = false;
          if (group) group.classList.add('invalid');
          if (errorEl) errorEl.textContent = 'Please enter a valid email address';
        }
      });

      if (!isValid) {
        showMessage('error', 'Please correct the highlighted fields.');
        return;
      }

      // Submit to Netlify via fetch
      const formData = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })
        .then((response) => {
          if (response.ok) {
            showMessage('success', 'Thank you! Your message has been sent. We\'ll get back to you shortly.');
            form.reset();
          } else {
            showMessage('error', 'Something went wrong. Please try again or call us directly.');
          }
        })
        .catch(() => {
          showMessage('error', 'Network error. Please check your connection and try again.');
        });
    });

    // Real-time validation on blur
    form.querySelectorAll('[required]').forEach((field) => {
      field.addEventListener('blur', function () {
        const group = this.closest('.form-group');
        if (!group) return;
        if (this.value.trim()) {
          group.classList.remove('invalid');
        }
      });
    });

    function showMessage(type, text) {
      if (!msgEl) return;
      msgEl.className = 'form-message ' + type;
      msgEl.textContent = text;
      msgEl.style.display = 'block';
      msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      if (type === 'success') {
        setTimeout(() => { msgEl.style.display = 'none'; }, 6000);
      }
    }
  }
})();
