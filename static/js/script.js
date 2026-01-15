// static/js/script.js

(() => {
  const THEME_KEY = "collabsphere-theme";

  // Apply saved theme
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem(THEME_KEY) || "dark"
  );

  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu.show").forEach((m) => {
      m.classList.remove("show");
    });
  }

  document.addEventListener("click", (e) => {
    // ---------------- THEME ----------------
    const themeBtn = e.target.closest(".theme-toggle");
    if (themeBtn) {
      e.preventDefault();
      const current =
        document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
      console.log("Theme changed to:", next);
      return;
    }

    // --------------- DROPDOWN ---------------
    const dropdownBtn = e.target.closest(".dropdown-button");
    if (dropdownBtn) {
      e.preventDefault();
      e.stopPropagation();

      // ✅ Find the closest dropdown-menu in the same "area"
      // 1) Try a wrapper if you have one (recommended)
      let wrapper = dropdownBtn.closest(".dropdown") || dropdownBtn.parentElement;

      // 2) Look for menu inside wrapper
      let menu = wrapper ? wrapper.querySelector(".dropdown-menu") : null;

      // 3) If still not found, try next sibling (common pattern)
      if (!menu) {
        const next = dropdownBtn.nextElementSibling;
        if (next && next.classList.contains("dropdown-menu")) menu = next;
      }

      // 4) Last resort: toggle the first dropdown-menu (only if exactly one exists)
      if (!menu) {
        const allMenus = document.querySelectorAll(".dropdown-menu");
        if (allMenus.length === 1) menu = allMenus[0];
      }

      if (!menu) {
        console.warn("Dropdown menu not found for this button.");
        return;
      }

      // close other menus and toggle this one
      document.querySelectorAll(".dropdown-menu.show").forEach((m) => {
        if (m !== menu) m.classList.remove("show");
      });

      menu.classList.toggle("show");
      return;
    }

    // Click inside menu -> don't close
    if (e.target.closest(".dropdown-menu")) return;

    // Outside click -> close
    closeAllDropdowns();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });
})();
