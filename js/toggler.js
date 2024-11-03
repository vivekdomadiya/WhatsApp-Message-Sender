const button = document.getElementById("theme-toggle");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");

function calculateSettingAsThemeString() {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingLight.matches) {
    return "light";
  }

  return "dark";
}

function updateTheme(theme) {
  document.querySelector("html").setAttribute("data-bs-theme", theme);

  const newIcon = theme === "dark" ? "sun" : "moon";
  button.setAttribute("class", `bi bi-${newIcon}-fill`);
}

let currentThemeSetting = calculateSettingAsThemeString();

updateTheme(currentThemeSetting);

button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateTheme(newTheme);

  currentThemeSetting = newTheme;
});
