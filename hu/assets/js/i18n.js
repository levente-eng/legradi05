(() => {
  const path = window.location.pathname;
  const lang = /(^|\/)hu(\/|$)/.test(path) ? 'hu' : /(^|\/)en(\/|$)/.test(path) ? 'en' : 'de';
  try { localStorage.setItem('legradi-language', lang); } catch (_) {}

  const current = document.currentScript?.src || '';
  const coreUrl = current.replace(/i18n\.js(?:\?.*)?$/, 'i18n-core.js');
  if (coreUrl) {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', coreUrl, false);
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 400) (0, eval)(xhr.responseText);
    } catch (error) {
      console.error('LEGRADI language loader:', error);
    }
  }

  const file = path.split('/').filter(Boolean).pop() || 'index.html';
  const pageFile = file.endsWith('.html') ? file : 'index.html';
  const isHome = pageFile === 'index.html';
  const githubProject = window.location.hostname.endsWith('github.io') ? '/legradi05' : '';

  const localPathFor = target => {
    const prefix = target === 'de' ? '' : `/${target}`;
    return `${githubProject}${prefix}${isHome ? '/' : `/${pageFile}`}`.replace(/\/+/g, '/');
  };
  const canonicalFor = target => {
    const prefix = target === 'de' ? '' : `/${target}`;
    return `https://legradi.at${prefix}${isHome ? '/' : `/${pageFile}`}`;
  };

  const canonical = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }));
  canonical.href = canonicalFor(lang);

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
  [['de','de'],['hu','hu'],['en','en'],['x-default','de']].forEach(([hreflang, target]) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = canonicalFor(target);
    document.head.appendChild(link);
  });

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = canonicalFor(lang);
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    const marker = ogImage.content.indexOf('/assets/');
    if (marker !== -1) ogImage.content = `https://legradi.at${ogImage.content.slice(marker)}`;
  }

  document.querySelectorAll('[data-lang-option]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const target = button.dataset.langOption;
      if (!['hu','en','de'].includes(target) || target === lang) return;
      window.location.href = localPathFor(target);
    }, true);
  });
})();