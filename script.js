const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeIndicator = document.querySelector(".theme-indicator");
const themeColor = document.querySelector('meta[name="theme-color"]');
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let hasManualThemeChoice = false;

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeLabel.textContent = isDark ? "Tema gelap" : "Tema terang";
  themeToggle.setAttribute("aria-label", `Ganti ke tema ${isDark ? "terang" : "gelap"}`);
  themeIndicator.style.backgroundColor = isDark ? "#65a0ff" : "#1769f5";
  themeColor.content = isDark ? "#0c1220" : "#f5f7fb";
}

applyTheme(systemTheme.matches ? "dark" : "light");
systemTheme.addEventListener("change", (event) => {
  if (!hasManualThemeChoice) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

themeToggle.addEventListener("click", () => {
  hasManualThemeChoice = true;
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

function setMenuOpen(isOpen) {
  siteNav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

siteNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});
