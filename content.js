// DarkerNews — Removes inline bgcolor/background-color that HN hardcodes,
// so our CSS overrides can take effect.

(function () {
  "use strict";

  function cleanup() {
    document.querySelectorAll("[bgcolor]").forEach((el) => {
      el.removeAttribute("bgcolor");
    });
    document.querySelectorAll("[style]").forEach((el) => {
      if (el.style.backgroundColor) {
        el.style.removeProperty("background-color");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanup);
  } else {
    cleanup();
  }

  // Re-clean if HN dynamically adds content (e.g. "More" pagination)
  document.addEventListener("DOMContentLoaded", () => {
    new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes.length) {
          cleanup();
          return;
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  });
})();
