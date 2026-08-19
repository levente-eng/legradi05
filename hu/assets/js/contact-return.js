(() => {
  const form = document.querySelector('.contact-form[action^="https://formsubmit.co/"]');
  if (!form) return;

  let next = form.querySelector('input[name="_next"]');
  if (!next) {
    next = document.createElement('input');
    next.type = 'hidden';
    next.name = '_next';
    form.appendChild(next);
  }

  const cleanUrl = `${window.location.origin}${window.location.pathname}`;
  next.value = `${cleanUrl}?sent=1`;

  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') !== '1') return;

  const status = form.querySelector('.form-status');
  if (status) status.textContent = 'Köszönjük. Az üzenetet sikeresen elküldtük.';
  form.reset();
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState({}, document.title, `${window.location.pathname}#contact-form`);
})();
