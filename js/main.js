/* =========================================================
   sstaroo.github.io — main.js
   - Scroll progress bar + percentage
   - Active nav highlight on scroll
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Scroll Progress ---------- */
  const scrollBar  = document.getElementById('scroll-bar');
  const scrollText = document.getElementById('scroll-progress-text');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

    if (scrollBar)  scrollBar.style.width = pct + '%';
    if (scrollText) scrollText.textContent = pct + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------- Active Nav on Scroll ---------- */
  const sections = Array.from(document.querySelectorAll('section.section'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    },
    { rootMargin: '-50px 0px -60% 0px', threshold: 0 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

})();

