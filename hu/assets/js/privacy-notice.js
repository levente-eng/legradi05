(() => {
  const container = document.querySelector('.simple-page .container.narrow');
  if (!container) return;

  const path = window.location.pathname;
  const lang = /(^|\/)hu(\/|$)/.test(path) ? 'hu' : /(^|\/)en(\/|$)/.test(path) ? 'en' : 'de';

  const notices = window.LEGRADI_PRIVACY_NOTICES || null;
  if (notices && notices[lang]) container.innerHTML = notices[lang];
})();
