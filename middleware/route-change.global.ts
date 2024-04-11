export default defineNuxtRouteMiddleware((to) => {
  onNuxtReady(() => {
    const { path, hash } = to;
    document.querySelectorAll(`.nav__list a`).forEach((el) => {
      const href = el.getAttribute("href");
      if (href === path || href === `${path}${hash}`) {
        el.classList.add("nav__link--active");
      } else {
        el.classList.remove("nav__link--active");
      }
    });
    if (hash?.length > 1) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const header = document.querySelector("header.header");
          if (document.scrollingElement && header) {
            document.scrollingElement.scrollTop -= header.clientHeight + 16;
          }
        });
      }
    }
  });
});
