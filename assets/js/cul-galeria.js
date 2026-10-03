/* Galería inmersiva de actividades (cursos.html · #culStage):
   gira sola, con puntos, flechas, teclado y deslizamiento táctil. */
(function () {
  var st = document.getElementById('culStage'), dots = document.getElementById('culDots');
  if (!st || !dots) return;
  var slides = [].slice.call(st.querySelectorAll('.cul-slide')), cur = 0, timer = null, x0 = null;

  slides.forEach(function (sl, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Actividad ' + (i + 1));
    if (i === 0) b.className = 'on';
    b.addEventListener('click', function () { go(i); restart(); });
    dots.appendChild(b);
  });

  function go(i) {
    i = (i + slides.length) % slides.length;
    slides[cur].classList.remove('on');
    dots.children[cur].classList.remove('on');
    cur = i;
    slides[cur].classList.add('on');
    dots.children[cur].classList.add('on');
  }

  function restart() {
    clearInterval(timer);
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(function () { go(cur + 1); }, 7500);
  }

  st.querySelector('.cul-prev').addEventListener('click', function () { go(cur - 1); restart(); });
  st.querySelector('.cul-next').addEventListener('click', function () { go(cur + 1); restart(); });
  st.addEventListener('mouseenter', function () { clearInterval(timer); });
  st.addEventListener('mouseleave', restart);
  st.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { go(cur + 1); restart(); }
    if (e.key === 'ArrowLeft') { go(cur - 1); restart(); }
  });
  st.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  st.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) { go(cur + (dx < 0 ? 1 : -1)); restart(); }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) restart(); else clearInterval(timer);
    }, { threshold: 0.25 }).observe(st);
  } else {
    restart();
  }
})();
