import { ref, onMounted } from "vue";

export function useTheme() {
  const isDark = ref<boolean | null>(null);

  const applyTheme = (dark: boolean) => {
    isDark.value = dark;

    if (dark) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    const checkbox = document.getElementById("theme-toggle");

    if (checkbox instanceof HTMLInputElement) {
      checkbox.checked = !dark;
    }
  };

  const toggleTheme = () => {
    const dark = !isDark.value;
    applyTheme(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  onMounted(() => {
    const saved = localStorage.getItem("theme");
    let dark: boolean;

    if (saved) {
      dark = saved === "dark";
    } else {
      dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    applyTheme(dark);

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          applyTheme(e.matches);
        }
      });

    const checkbox = document.getElementById("theme-toggle");

    if (checkbox) {
      checkbox.addEventListener("change", toggleTheme);
    }
  });

  return {
    isDark,
    toggleTheme,
  };
}
