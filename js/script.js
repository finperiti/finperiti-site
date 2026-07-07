// Minimal replacement for Webflow's navigation JS.
// The only interactive behaviour on the site is the mobile hamburger menu.
// This toggles the same CSS states the original stylesheet already defines
// (`.w--open` on the button and the `data-nav-menu-open` attribute on the menu),
// so the open/closed appearance matches the live site exactly — no extra CSS needed.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.menu-button');
    var menu = document.querySelector('.nav-menu-wrapper');
    if (!button || !menu) return;

    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.setAttribute('aria-label', 'Menu');
    button.setAttribute('aria-expanded', 'false');

    function toggle() {
      var open = button.classList.toggle('w--open');
      if (open) {
        menu.setAttribute('data-nav-menu-open', '');
      } else {
        menu.removeAttribute('data-nav-menu-open');
      }
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    button.addEventListener('click', toggle);
    button.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });

    // Close the menu after tapping a link (mobile).
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        button.classList.remove('w--open');
        menu.removeAttribute('data-nav-menu-open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  });
})();
