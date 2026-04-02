// Putkisto & Pojat - Toiminnallisuudet

document.addEventListener('DOMContentLoaded', function () {

  // ---- Sujuva vieritys navigointiin ----
  document.querySelectorAll('nav a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var offset = document.querySelector('nav').offsetHeight;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- Fade-in animaatio ----
  var fadeElements = document.querySelectorAll('.fade-in');

  function checkFade() {
    fadeElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkFade);
  checkFade();

  // ---- Yhteydenottolomake ----
  var form = document.getElementById('contact-form');
  var formMsg = document.getElementById('form-msg');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#nimi').value.trim();
      var email = form.querySelector('#sahkoposti').value.trim();
      var phone = form.querySelector('#puhelin').value.trim();
      var service = form.querySelector('#palvelu').value;
      var message = form.querySelector('#viesti').value.trim();

      if (!name || !email || !message) {
        formMsg.textContent = 'Tarkista, etta kaikki pakolliset kentat on taytetty.';
        formMsg.className = 'form-msg';
        formMsg.style.display = 'block';
        formMsg.style.color = '#c62828';
        return;
      }

      // Simuloidaan lahettamista
      form.querySelector('.btn-submit').textContent = 'Lahetetaan...';
      form.querySelector('.btn-submit').disabled = true;

      setTimeout(function () {
        formMsg.textContent = 'Kiitos yhteydenotostasi, ' + name + '! Palaamme asiaan mahdollisimman pian.';
        formMsg.className = 'form-msg success';
        form.reset();
        form.querySelector('.btn-submit').textContent = 'Laheta viesti';
        form.querySelector('.btn-submit').disabled = false;
      }, 1200);
    });
  }

  // ---- Aktiivinen navigointilinkki ----
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a[href^="#"]');

  function updateActiveNav() {
    var scrollPos = window.pageYOffset + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  // ---- Vuosiluku footeriin ----
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
