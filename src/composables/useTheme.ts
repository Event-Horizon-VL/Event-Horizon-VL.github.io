import { ref, onMounted } from "vue";

export function useTheme() {
  const isDark = ref<boolean | null>(null);

  const setTheme = (dark: boolean) => {
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

    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const toggleTheme = () => {
    setTheme(!isDark.value);
  };

  onMounted(() => {
    const saved = localStorage.getItem("theme");
    const theme = !!(saved === "dark");

    setTheme(theme);

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
