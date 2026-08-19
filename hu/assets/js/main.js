(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const backToTop = document.querySelector('[data-back-to-top]');

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 24);
    backToTop?.classList.toggle('is-visible', y > 600);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      menu?.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      closeLightbox();
    }
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Scroll reveal
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  // Reference filters
  const filterButtons = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('.filter-gallery [data-category], .project-grid [data-category]');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(b => b.classList.toggle('is-active', b === button));
    filterItems.forEach(item => item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter));
  }));

  // Lightbox
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('p');
  const closeButton = lightbox?.querySelector('.lightbox-close');
  const lightboxPrev = lightbox?.querySelector('[data-lightbox-prev]');
  const lightboxNext = lightbox?.querySelector('[data-lightbox-next]');
  let activeProjectImages = [];
  let activeProjectIndex = 0;
  let activeProjectTitle = '';
  let activeProjectTitleGetter = null;
  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = caption || (document.documentElement.lang === 'en' ? 'Enlarged reference photo' : document.documentElement.lang === 'de' ? 'Vergrößertes Referenzfoto' : 'Nagyított referenciafotó');
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton?.focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lightboxImage) lightboxImage.src = '';
    activeProjectImages = [];
    activeProjectIndex = 0;
    activeProjectTitle = '';
    activeProjectTitleGetter = null;
    if (lightboxPrev) lightboxPrev.hidden = true;
    if (lightboxNext) lightboxNext.hidden = true;
  }
  function showLightboxProjectImage() {
    if (!activeProjectImages.length || !lightboxImage) return;
    const src = activeProjectImages[activeProjectIndex];
    lightboxImage.src = src;
    const currentTitle = activeProjectTitleGetter ? activeProjectTitleGetter() : activeProjectTitle;
    const imageWord = document.documentElement.lang === 'en' ? 'image' : document.documentElement.lang === 'de' ? 'Bild' : 'kép';
    lightboxImage.alt = `${currentTitle} — ${activeProjectIndex + 1}. ${imageWord}`;
    if (lightboxCaption) lightboxCaption.textContent = `${currentTitle} — ${activeProjectIndex + 1} / ${activeProjectImages.length}`;
  }
  document.querySelectorAll('[data-lightbox-src]').forEach(btn => btn.addEventListener('click', () => {
    activeProjectImages = [];
    if (lightboxPrev) lightboxPrev.hidden = true;
    if (lightboxNext) lightboxNext.hidden = true;
    openLightbox(btn.dataset.lightboxSrc, btn.dataset.lightboxCaption);
  }));
  closeButton?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  // Reference project carousels. 00-main.webp is the Drive folder's "fő kép".
  document.querySelectorAll('[data-project]').forEach(project => {
    const manifestEl = project.querySelector('.project-images');
    let images = [];
    try { images = JSON.parse(manifestEl?.textContent || '[]'); } catch (_) { images = []; }
    if (!images.length) return;
    const image = project.querySelector('[data-project-image]');
    const counter = project.querySelector('[data-project-counter]');
    const prev = project.querySelector('[data-project-prev]');
    const next = project.querySelector('[data-project-next]');
    const open = project.querySelector('[data-project-open]');
    const getTitle = () => project.querySelector('h3')?.textContent.trim() || (document.documentElement.lang === 'en' ? 'Reference' : document.documentElement.lang === 'de' ? 'Referenz' : 'Referencia');
    let index = 0;
    const render = () => {
      if (image) {
        image.src = images[index];
        image.alt = `${getTitle()} — ${index + 1}. ${document.documentElement.lang === 'en' ? 'image' : document.documentElement.lang === 'de' ? 'Bild' : 'kép'}`;
      }
      if (counter) counter.textContent = `${index + 1} / ${images.length}`;
    };
    const move = delta => {
      index = (index + delta + images.length) % images.length;
      render();
    };
    prev?.addEventListener('click', event => { event.stopPropagation(); move(-1); });
    next?.addEventListener('click', event => { event.stopPropagation(); move(1); });
    if (images.length <= 1) {
      if (prev) prev.hidden = true;
      if (next) next.hidden = true;
      if (counter) counter.hidden = true;
    }
    open?.addEventListener('click', () => {
      activeProjectImages = images;
      activeProjectIndex = index;
      activeProjectTitle = getTitle();
      activeProjectTitleGetter = getTitle;
      openLightbox(images[index], `${getTitle()} — ${index + 1} / ${images.length}`);
      if (lightboxPrev) lightboxPrev.hidden = images.length <= 1;
      if (lightboxNext) lightboxNext.hidden = images.length <= 1;
    });
    render();
  });
  window.addEventListener('legradi:languagechange', () => {
    document.querySelectorAll('[data-project]').forEach(project => {
      const image = project.querySelector('[data-project-image]');
      const counter = project.querySelector('[data-project-counter]');
      if (image && counter) {
        const parts = counter.textContent.split('/');
        const current = Number(parts[0]?.trim()) || 1;
        const title = project.querySelector('h3')?.textContent.trim() || '';
        image.alt = `${title} — ${current}. ${document.documentElement.lang === 'en' ? 'image' : document.documentElement.lang === 'de' ? 'Bild' : 'kép'}`;
      }
    });
    if (lightbox && !lightbox.hidden && activeProjectImages.length) showLightboxProjectImage();
  });
  lightboxPrev?.addEventListener('click', event => {
    event.stopPropagation();
    if (activeProjectImages.length <= 1) return;
    activeProjectIndex = (activeProjectIndex - 1 + activeProjectImages.length) % activeProjectImages.length;
    showLightboxProjectImage();
  });
  lightboxNext?.addEventListener('click', event => {
    event.stopPropagation();
    if (activeProjectImages.length <= 1) return;
    activeProjectIndex = (activeProjectIndex + 1) % activeProjectImages.length;
    showLightboxProjectImage();
  });
  document.addEventListener('keydown', event => {
    if (!lightbox || lightbox.hidden || activeProjectImages.length <= 1) return;
    if (event.key === 'ArrowLeft') {
      activeProjectIndex = (activeProjectIndex - 1 + activeProjectImages.length) % activeProjectImages.length;
      showLightboxProjectImage();
    }
    if (event.key === 'ArrowRight') {
      activeProjectIndex = (activeProjectIndex + 1) % activeProjectImages.length;
      showLightboxProjectImage();
    }
  });

  // Contact form: prepares a mailto, no hidden data transmission in the static prototype.
  const contactForm = document.querySelector('[data-contact-form]');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const destination = contactForm.dataset.email;
    const lang = document.documentElement.lang || 'hu';
    const subjectPrefix = lang === 'en' ? 'Website enquiry' : lang === 'de' ? 'Website-Anfrage' : 'Weboldali megkeresés';
    const translatedType = window.LEGRADI_I18N?.t(data.get('type') || '') || data.get('type') || '';
    const subject = encodeURIComponent(`${subjectPrefix} – ${translatedType || (lang === 'en' ? 'project' : lang === 'de' ? 'Projekt' : 'projekt')}`);
    const body = encodeURIComponent([
      `${lang === 'en' ? 'Name / company' : lang === 'de' ? 'Name / Firma' : 'Név / cégnév'}: ${data.get('name') || ''}`,
      `E-mail: ${data.get('email') || ''}`,
      `${lang === 'en' ? 'Phone' : lang === 'de' ? 'Telefon' : 'Telefon'}: ${data.get('phone') || ''}`,
      `${lang === 'en' ? 'Project type' : lang === 'de' ? 'Projektart' : 'Projekt típusa'}: ${translatedType}`,
      '',
      lang === 'en' ? 'Project description:' : lang === 'de' ? 'Projektbeschreibung:' : 'Projekt leírása:',
      data.get('message') || ''
    ].join('\n'));
    const status = contactForm.querySelector('.form-status');
    if (status) status.textContent = lang === 'en' ? 'Opening your email client with the prepared message.' : lang === 'de' ? 'Ihr E-Mail-Programm wird mit der vorbereiteten Nachricht geöffnet.' : 'Megnyitjuk a levelezőprogramot az előkészített üzenettel.';
    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  });

  // Demo newsletter forms
  document.querySelectorAll('[data-demo-form]').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button');
    const original = button.textContent;
    button.textContent = document.documentElement.lang === 'en' ? 'Saved' : document.documentElement.lang === 'de' ? 'Gespeichert' : 'Rögzítve';
    button.disabled = true;
    setTimeout(() => { button.textContent = original; button.disabled = false; form.reset(); }, 1800);
  }));

  // Minimal cookie notice
  const banner = document.querySelector('[data-cookie-banner]');
  const accepted = localStorage.getItem('legradi-cookie-notice');
  if (banner && !accepted) banner.hidden = false;
  banner?.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
    localStorage.setItem('legradi-cookie-notice', 'accepted');
    banner.hidden = true;
  });
})();
