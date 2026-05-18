/* =========================================================
   sstaroo.github.io — main.js
   - Active nav highlight on scroll
   - Scroll progress bar + percentage
   - Typing effect in footer
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Scroll Progress ---------- */
  const scrollBar  = document.getElementById('scroll-bar');
  const scrollText = document.getElementById('scroll-progress-text');

  function updateScrollProgress() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

    if (scrollBar)  scrollBar.style.width = pct + '%';
    if (scrollText) scrollText.textContent = pct + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  /* ---------- Active Nav on Scroll ---------- */
  const sections  = Array.from(document.querySelectorAll('section.section'));
  const navLinks  = Array.from(document.querySelectorAll('.nav-link'));
  const topbarH   = 36;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === '#' + id;
          link.classList.toggle('active', isActive);
        });
      });
    },
    {
      rootMargin: `-${topbarH + 10}px 0px -60% 0px`,
      threshold: 0,
    }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Typing Effect in Footer ---------- */
  const typedEl  = document.getElementById('typed-cmd');
  const commands = [
    'cat about.md',
    'git log --oneline',
    'python -m neural_net --train',
    'ssh martin@uchile.cl',
    'grep -r "ciberseguridad" .',
    'make && ./run',
  ];

  let cmdIndex  = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused   = false;

  function type() {
    if (!typedEl) return;

    const current = commands[cmdIndex];

    if (isPaused) {
      isPaused = false;
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }

    if (!isDeleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(type, 80);
        return;
      }
      setTimeout(type, 70);
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        cmdIndex = (cmdIndex + 1) % commands.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 35);
    }
  }

  // Start after a short delay so the page renders first
  setTimeout(type, 1800);

  /* ---------- Smooth reveal on load ---------- */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // If DOMContentLoaded already fired (script at bottom)
  if (document.readyState !== 'loading') {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  }

})();
