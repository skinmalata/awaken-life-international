document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  navToggle.addEventListener('click', function () {
    var open = navToggle.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  var giveForm = document.getElementById('giveForm');
  if (giveForm) {
    giveForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('giveNote');
      var select = giveForm.querySelector('select');
      if (!select.value) {
        note.textContent = 'Please select an offering type above.';
        return;
      }
      note.textContent = 'Thank you! Kindly reach out to the church office for our official giving account details.';
      giveForm.reset();
    });
  }

  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  if (contactForm && formNote) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formNote.textContent = 'Thank you for reaching out! We will get back to you soon. You may also reach us on WhatsApp.';
      contactForm.reset();
    });
  }

  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('.lightbox img');
    var lbClose = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('[data-lightbox]').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        if (img) {
          lbImg.src = img.currentSrc || img.src;
          lbImg.alt = item.querySelector('figcaption') ? item.querySelector('figcaption').textContent : '';
          lightbox.classList.add('is-open');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }
});