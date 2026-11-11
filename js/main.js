/* Warren Johnson Portfolio – shared behaviour (vanilla JS) */
document.addEventListener('DOMContentLoaded', () => {
  /* 1. Hamburger menu: toggles the mobile nav, closes after a link is chosen */
  const burger = document.querySelector('.burger'), menu = document.querySelector('.menu');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.classList.remove('open'); } });

  /* 2. Scroll-triggered fade-in using IntersectionObserver */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.fade').forEach(el => io.observe(el));

  /* 3. Back-to-top button: appears after scrolling 500px; smooth scroll via CSS */
  const top = document.getElementById('top');
  addEventListener('scroll', () => top.classList.toggle('show', scrollY > 500), { passive: true });
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* 4. Lightbox gallery: any image inside .gallery opens full size; arrows + Esc supported */
  const imgs = [...document.querySelectorAll('.gallery img')], lb = document.querySelector('.lightbox');
  if (imgs.length && lb) {
    let i = 0;
    const big = lb.querySelector('img'), cap = lb.querySelector('p');
    const show = n => { i = (n + imgs.length) % imgs.length; big.src = imgs[i].dataset.full || imgs[i].src; big.alt = imgs[i].alt; cap.textContent = imgs[i].alt; };
    imgs.forEach((im, n) => im.addEventListener('click', () => { show(n); lb.classList.add('open'); }));
    const close = () => lb.classList.remove('open');
    lb.querySelector('.lb-close').onclick = close;
    lb.querySelector('.lb-prev').onclick = () => show(i - 1);
    lb.querySelector('.lb-next').onclick = () => show(i + 1);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    addEventListener('keydown', e => { if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  }

  /* 5. Contact form: front-end validation + confirmation (connect to Formspree/Netlify to send real mail) */
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const s = form.querySelector('.status');
    if (!form.checkValidity()) { s.textContent = 'Please fill in your name, a valid email, and a message.'; return; }
    s.textContent = 'Thanks, ' + form.name.value.split(' ')[0] + '! Your message is ready to send once a form service is connected.';
    form.reset();
  });
});
