(() => {
  const path = window.location.pathname;
  const lang = /(^|\/)hu(\/|$)/.test(path) ? 'hu' : /(^|\/)en(\/|$)/.test(path) ? 'en' : 'de';
  try { localStorage.setItem('legradi-language', lang); } catch (_) {}

  const current = document.currentScript?.src || '';

  // Keep every visible LEGRADI brand mark crisp by using the SVG asset.
  document.querySelectorAll('img[src*="logo-light.png"]').forEach(img => {
    const source = img.getAttribute('src') || '';
    img.setAttribute('src', source.replace('logo-light.png', 'logo-light.svg'));
  });

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

  const localeMap = { de: 'de_AT', hu: 'hu_HU', en: 'en_GB' };
  const ogLocale = document.querySelector('meta[property="og:locale"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { property: 'og:locale' }));
  ogLocale.content = localeMap[lang];
  document.querySelectorAll('meta[property="og:locale:alternate"]').forEach(el => el.remove());
  Object.entries(localeMap).filter(([code]) => code !== lang).forEach(([, locale]) => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', 'og:locale:alternate');
    meta.content = locale;
    document.head.appendChild(meta);
  });

  const schemaId = 'legradi-organization-schema';
  let schema = document.getElementById(schemaId);
  if (!schema) {
    schema = document.createElement('script');
    schema.id = schemaId;
    schema.type = 'application/ld+json';
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LEGRADI',
    legalName: 'Légrádi Kft.',
    url: 'https://legradi.at/',
    logo: 'https://legradi.at/assets/images/logo-light.svg',
    email: 'office@legradis.com',
    telephone: '+36 70 779 0790',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Batthyány tér 5.',
      postalCode: '9022',
      addressLocality: 'Győr',
      addressCountry: 'HU'
    },
    areaServed: [
      { '@type': 'Country', name: 'Hungary' },
      { '@type': 'Country', name: 'Austria' }
    ]
  });

  document.querySelectorAll('[data-lang-option]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const target = button.dataset.langOption;
      if (!['hu','en','de'].includes(target) || target === lang) return;
      window.location.href = localPathFor(target);
    }, true);
  });

  if (isHome) {
    const hero = document.querySelector('.hero-home');
    if (hero && !hero.querySelector('.hero-brand-mark')) {
      const scriptPath = new URL(current, window.location.href).pathname;
      const assetsPrefix = scriptPath.replace(/assets\/js\/i18n\.js(?:.*)?$/, 'assets/');
      const logo = document.createElement('img');
      logo.className = 'hero-brand-mark';
      logo.src = assetsPrefix + 'images/logo-light.svg';
      logo.alt = 'LEGRADI';
      logo.decoding = 'async';
      hero.appendChild(logo);

      if (!document.getElementById('hero-brand-mark-style')) {
        const style = document.createElement('style');
        style.id = 'hero-brand-mark-style';
        style.textContent = `
          .hero-home .hero-brand-mark{
            position:absolute;
            z-index:3;
            left:clamp(28px,7vw,110px);
            top:50%;
            transform:translateY(-50%);
            width:clamp(220px,26vw,470px);
            height:auto;
            max-width:42vw;
            object-fit:contain;
            filter:drop-shadow(0 4px 18px rgba(0,0,0,.28));
            pointer-events:none;
            user-select:none;
          }
          @media (max-width:700px){
            .hero-home .hero-brand-mark{
              left:50%;
              top:44%;
              transform:translate(-50%,-50%);
              width:min(72vw,330px);
              max-width:72vw;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }

  if (pageFile === 'kapcsolat.html') {
    const contactScript = document.createElement('script');
    contactScript.src = current.replace(/i18n\.js(?:\?.*)?$/, 'contact-return.js?v=20260819-fix1');
    document.body.appendChild(contactScript);
  }
})();