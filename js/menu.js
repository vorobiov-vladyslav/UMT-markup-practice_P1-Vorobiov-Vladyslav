(function () {
  "use strict";

  const menu = document.getElementById("mobile-menu");
  if (!menu) return;

  const openTriggers = document.querySelectorAll("[data-menu-open]");
  const closeTriggers = menu.querySelectorAll("[data-menu-close]");
  const body = document.body;

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("is-menu-open", open);
    openTriggers.forEach(function (btn) {
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  openTriggers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setOpen(true);
    });
  });

  closeTriggers.forEach(function (el) {
    el.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setOpen(false);
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && menu.classList.contains("is-open")) {
      setOpen(false);
    }
  });
})();
