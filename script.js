(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const rail = document.getElementById('railnav');
  const counter = document.getElementById('pageCounter');
  const total = slides.length;

  slides.forEach((slide, i) => {
    const dot = document.createElement('div');
    dot.className = 'rail-dot';
    dot.dataset.index = i;
    const tip = document.createElement('span');
    tip.className = 'tip';
    tip.textContent = (slide.dataset.label || '').toUpperCase();
    dot.appendChild(tip);
    dot.addEventListener('click', () => {
      slide.scrollIntoView({ behavior: 'smooth' });
    });
    rail.appendChild(dot);
  });

  const dots = Array.from(rail.querySelectorAll('.rail-dot'));

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = slides.indexOf(entry.target);
        dots.forEach((d) => d.classList.remove('active'));
        dots[idx].classList.add('active');
        counter.textContent = pad(idx + 1) + ' / ' + pad(total);
      }
    });
  }, { threshold: 0.5 });

  slides.forEach((s) => observer.observe(s));
})();
