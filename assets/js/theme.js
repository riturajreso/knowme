(function () {
  'use strict';

  const storageKey = 'knowme-theme';
  const root = document.documentElement;
  const normalize = value => value === 'mithila' ? 'mithila' : 'static';

  function applyTheme(value) {
    const theme = normalize(value);
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach(toggle => {
      toggle.setAttribute('aria-checked', String(theme === 'mithila'));
    });
  }

  let savedTheme;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch {}
  applyTheme(savedTheme);

  document.addEventListener('DOMContentLoaded', () => applyTheme(root.dataset.theme));
  document.addEventListener('click', event => {
    if (!event.target.closest('[data-theme-toggle]')) return;
    applyTheme(root.dataset.theme === 'mithila' ? 'static' : 'mithila');
    try {
      localStorage.setItem(storageKey, root.dataset.theme);
    } catch {}
  });
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      applyTheme(event.newValue);
    }
  });
})();