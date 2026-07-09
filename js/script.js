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

// --- Contact form (Web3Forms) -------------------------------------------------
// AJAX-submits to Web3Forms and shows the existing on-page success / error
// message. Degrades gracefully: if JS is unavailable, the form still POSTs
// normally to Web3Forms (which shows its own confirmation page).
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('email-form');
    if (!form || (form.action || '').indexOf('web3forms') === -1) return;

    var wrapper = form.closest('.w-form') || form.parentElement;
    var done = wrapper.querySelector('.w-form-done');
    var fail = wrapper.querySelector('.w-form-fail');
    var btn  = form.querySelector('[type="submit"]');
    var label = btn ? btn.value : null;

    function reset() { if (btn) { btn.value = label; btn.disabled = false; } }
    function showFail() { if (fail) fail.style.display = 'block'; reset(); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (fail) fail.style.display = 'none';
      if (btn) { btn.value = btn.getAttribute('data-wait') || 'Please wait...'; btn.disabled = true; }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (json.success) {
          form.style.display = 'none';
          if (done) done.style.display = 'block';
        } else {
          showFail();
        }
      })
      .catch(showFail);
    });
  });
})();
