(function () {
  'use strict';

  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');
  if (toggle && mobileNav) {
    const icon = toggle.querySelector('img');
    const menuIcon = icon.getAttribute('src');
    function setMenu(open) {
      mobileNav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      icon.setAttribute('src', open ? menuIcon.replace('menu.svg', 'x.svg') : menuIcon);
    }
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.site-nav')) setMenu(false);
    });
    window.matchMedia('(min-width: 851px)').addEventListener('change', () => setMenu(false));
  }

  const current = window.location.pathname.includes('/knowledge-base/')
    ? 'knowledge-base.html'
    : window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    if (new URL(link.href).pathname.split('/').pop() === current) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const search = document.getElementById('post-search');
  const topic = document.getElementById('post-topic');
  if (search && topic) {
    const articles = Array.from(document.querySelectorAll('.card-grid article'));
    function filterArticles() {
      const query = search.value.trim().toLowerCase();
      let count = 0;
      articles.forEach(article => {
        const matchesTopic = topic.value === 'all' || article.querySelector('.post-card__tag').textContent.trim() === topic.value;
        article.hidden = !matchesTopic || !article.textContent.toLowerCase().includes(query);
        if (!article.hidden) count += 1;
      });
      document.getElementById('post-count').textContent = count + (count === 1 ? ' article' : ' articles');
      document.getElementById('no-posts').hidden = count !== 0;
    }
    search.addEventListener('input', filterArticles);
    topic.addEventListener('change', filterArticles);
  }

  const form = document.getElementById('contact-form');
  if (form) {
    const success = document.getElementById('contact-success');
    const reset = document.getElementById('contact-reset');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = form.elements.namedItem('name').value.trim();
      const email = form.elements.namedItem('email').value.trim();
      const message = form.elements.namedItem('message').value.trim();
      if (!name || !email || !message || !form.reportValidity()) return;
      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:riturajreso@gmail.com?subject=' + subject + '&body=' + body;
      form.hidden = true;
      success.hidden = false;
      reset.focus();
    });
    reset.addEventListener('click', () => {
      success.hidden = true;
      form.hidden = false;
      form.elements.namedItem('name').focus();
    });
  }

  const copy = document.getElementById('copy-email');
  if (copy) {
    copy.addEventListener('click', async () => {
      const status = document.getElementById('copy-status');
      try {
        await navigator.clipboard.writeText('riturajreso@gmail.com');
        status.textContent = 'Email address copied.';
      } catch {
        status.textContent = 'Copy unavailable. Use the email link above.';
      }
    });
  }

  const progress = document.querySelector('.reading-progress');
  if (progress) {
    let scheduled = false;
    function updateProgress() {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 1;
      progress.style.transform = 'scaleX(' + fraction + ')';
      scheduled = false;
    }
    function scheduleProgress() {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(updateProgress);
      }
    }
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress);
    window.addEventListener('load', scheduleProgress);
    updateProgress();
  }
})();