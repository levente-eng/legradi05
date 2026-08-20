(() => {
  const MEASUREMENT_ID = 'G-7V2Y9V4YWS';
  const CONSENT_KEY = 'legradi-analytics-consent-v1';
  const path = window.location.pathname;
  const githubProject = window.location.hostname.endsWith('github.io') ? '/legradi05' : '';
  const lang = /(^|\/)hu(\/|$)/.test(path) ? 'hu' : /(^|\/)en(\/|$)/.test(path) ? 'en' : 'de';

  const copy = {
    hu: {
      text: 'Az oldal a működéshez szükséges helyi tárolást használ. Hozzájárulás esetén a Google Analytics összesített használati statisztikákat mér.',
      accept: 'Analytics engedélyezése',
      reject: 'Csak szükséges',
      privacy: 'Adatkezelési tájékoztató',
      settings: 'Cookie-beállítások',
      dialog: 'Adatvédelmi beállítások',
      analyticsTitle: '10. Google Analytics és hozzájárulás',
      analyticsText: 'A weboldal a Google Analytics 4 szolgáltatást kizárólag a látogató előzetes hozzájárulása után tölti be. Szolgáltató: Google Ireland Limited. Az adatkezelés jogalapja a GDPR 6. cikk (1) bekezdés a) pontja szerinti hozzájárulás; célja a weboldal használatának összesített elemzése és a szolgáltatás fejlesztése. Hozzájárulás után a GA4 analitikai sütiket, például _ga sütit helyezhet el. A weboldal nem küldi el a kapcsolatfelvételi űrlap tartalmát a Google Analyticsnek. A hozzájárulás elutasítható, illetve a Cookie-beállítások hivatkozással később bármikor módosítható. Mérési azonosító: G-7V2Y9V4YWS. A hozzájárulás állapotát a böngésző helyi tárhelye rögzíti.'
    },
    en: {
      text: 'This site uses local storage required for operation. With your consent, Google Analytics measures aggregated usage statistics.',
      accept: 'Allow analytics',
      reject: 'Necessary only',
      privacy: 'Privacy notice',
      settings: 'Cookie settings',
      dialog: 'Privacy settings',
      analyticsTitle: '10. Google Analytics and consent',
      analyticsText: 'The website loads Google Analytics 4 only after the visitor has given prior consent. Provider: Google Ireland Limited. Processing is based on consent under Article 6(1)(a) GDPR and is used for aggregated analysis of website usage and service improvement. After consent, GA4 may set analytics cookies such as _ga. The website does not send contact-form content to Google Analytics. Consent can be refused and can later be changed at any time using the Cookie settings link. Measurement ID: G-7V2Y9V4YWS. The consent status is stored in the browser\'s local storage.'
    },
    de: {
      text: 'Diese Website verwendet für den Betrieb erforderlichen lokalen Speicher. Mit Ihrer Einwilligung misst Google Analytics zusammengefasste Nutzungsstatistiken.',
      accept: 'Analytics erlauben',
      reject: 'Nur erforderliche',
      privacy: 'Datenschutzerklärung',
      settings: 'Cookie-Einstellungen',
      dialog: 'Datenschutzeinstellungen',
      analyticsTitle: '10. Google Analytics und Einwilligung',
      analyticsText: 'Die Website lädt Google Analytics 4 ausschließlich nach vorheriger Einwilligung des Besuchers. Anbieter: Google Ireland Limited. Rechtsgrundlage ist die Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO; Zweck ist die zusammengefasste Analyse der Websitenutzung und die Verbesserung des Angebots. Nach der Einwilligung kann GA4 Analyse-Cookies wie _ga setzen. Inhalte des Kontaktformulars werden nicht an Google Analytics übermittelt. Die Einwilligung kann abgelehnt und später über den Link Cookie-Einstellungen jederzeit geändert werden. Mess-ID: G-7V2Y9V4YWS. Der Einwilligungsstatus wird im lokalen Speicher des Browsers gespeichert.'
    }
  }[lang];

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  let analyticsLoaded = false;

  const getConsent = () => {
    try { return localStorage.getItem(CONSENT_KEY); } catch (_) { return null; }
  };

  const setConsent = value => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
      localStorage.setItem('legradi-cookie-notice', 'accepted');
    } catch (_) {}
  };

  const loadAnalytics = () => {
    if (analyticsLoaded || document.querySelector(`script[data-legradi-ga4="${MEASUREMENT_ID}"]`)) return;
    analyticsLoaded = true;
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    const ga = document.createElement('script');
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    ga.dataset.legradiGa4 = MEASUREMENT_ID;
    ga.onload = () => {
      window.gtag('js', new Date());
      window.gtag('config', MEASUREMENT_ID, {
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    };
    document.head.appendChild(ga);
  };

  const clearAnalyticsCookies = () => {
    const names = document.cookie.split(';').map(item => item.trim().split('=')[0]).filter(name => /^_ga|^_gid|^_gat/.test(name));
    const domains = ['', window.location.hostname, `.${window.location.hostname}`];
    names.forEach(name => domains.forEach(domain => {
      const domainPart = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
    }));
  };

  const denyAnalytics = () => {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  };

  const ensureStyles = () => {
    if (document.getElementById('legradi-analytics-consent-style')) return;
    const style = document.createElement('style');
    style.id = 'legradi-analytics-consent-style';
    style.textContent = `
      .cookie-banner .cookie-actions{display:flex;align-items:center;gap:.65rem;flex-wrap:wrap;flex-shrink:0}
      .cookie-banner .cookie-actions .button{white-space:nowrap}
      .cookie-banner .cookie-privacy{font-size:.78rem;color:#d8d8da;text-decoration:underline}
      .cookie-settings-link{background:none;border:0;padding:0;color:inherit;text-decoration:underline;cursor:pointer;font:inherit}
      @media (max-width:700px){.cookie-banner .cookie-actions{display:grid;grid-template-columns:1fr;align-items:stretch}.cookie-banner .cookie-actions .button{width:100%}}
    `;
    document.head.appendChild(style);
  };

  const privacyHref = () => {
    if (lang === 'hu') return path.includes('/hu/') ? 'adatkezeles.html' : `${githubProject}/hu/adatkezeles.html`;
    if (lang === 'en') return path.includes('/en/') ? 'adatkezeles.html' : `${githubProject}/en/adatkezeles.html`;
    return path === `${githubProject}/` || path === '/' ? 'adatkezeles.html' : `${githubProject}/adatkezeles.html`;
  };

  const setupBanner = () => {
    const banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;
    ensureStyles();
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', copy.dialog);
    banner.innerHTML = `
      <p>${copy.text} <a class="cookie-privacy" href="${privacyHref()}">${copy.privacy}</a></p>
      <div class="cookie-actions">
        <button class="button button-small button-red" data-analytics-accept type="button">${copy.accept}</button>
        <button class="button button-small button-ghost" data-analytics-reject type="button">${copy.reject}</button>
      </div>
    `;

    const hide = () => { banner.hidden = true; };
    banner.querySelector('[data-analytics-accept]')?.addEventListener('click', () => {
      setConsent('granted');
      loadAnalytics();
      hide();
    });
    banner.querySelector('[data-analytics-reject]')?.addEventListener('click', () => {
      const hadAnalytics = analyticsLoaded || Boolean(document.querySelector(`script[data-legradi-ga4="${MEASUREMENT_ID}"]`));
      setConsent('denied');
      denyAnalytics();
      clearAnalyticsCookies();
      hide();
      if (hadAnalytics) window.location.reload();
    });

    const consent = getConsent();
    if (consent === 'granted') {
      hide();
      loadAnalytics();
    } else if (consent === 'denied') {
      hide();
      denyAnalytics();
    } else {
      banner.hidden = false;
    }

    const legalArea = document.querySelector('.footer-bottom span:last-child');
    if (legalArea && !legalArea.querySelector('[data-cookie-settings]')) {
      legalArea.append(document.createTextNode(' · '));
      const settings = document.createElement('button');
      settings.type = 'button';
      settings.className = 'cookie-settings-link';
      settings.dataset.cookieSettings = '';
      settings.textContent = copy.settings;
      settings.addEventListener('click', () => { banner.hidden = false; });
      legalArea.appendChild(settings);
    }
  };

  const appendPrivacyNotice = () => {
    const container = document.querySelector('.simple-page .container.narrow');
    if (!container || !/adatkezeles\.html$/.test(path)) return;
    if (container.querySelector('[data-ga4-privacy-section]')) return;
    const section = document.createElement('section');
    section.dataset.ga4PrivacySection = '';
    section.innerHTML = `<h2>${copy.analyticsTitle}</h2><p>${copy.analyticsText}</p>`;
    const effective = container.querySelector('p:last-child small')?.closest('p');
    if (effective) container.insertBefore(section, effective);
    else container.appendChild(section);
  };

  const setupEventTracking = () => {
    document.addEventListener('click', event => {
      if (getConsent() !== 'granted' || !(event.target instanceof Element)) return;
      const tracked = event.target.closest('[data-track], a[href^="mailto:"], a[href^="tel:"]');
      if (!tracked) return;
      if (tracked.dataset.track) {
        const token = String(tracked.dataset.track).toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 35);
        if (token) window.gtag('event', `site_${token}`, { event_category: 'engagement' });
        return;
      }
      const href = tracked.getAttribute('href') || '';
      window.gtag('event', href.startsWith('mailto:') ? 'email_click' : 'phone_click', { event_category: 'contact' });
    });
  };

  const init = () => {
    setupBanner();
    appendPrivacyNotice();
    setupEventTracking();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
