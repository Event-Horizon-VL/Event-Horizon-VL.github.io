import { ref, computed, watchEffect } from "vue";
import type { Locale, Translation } from "./types";
import { ru } from "./ru";
import { en } from "./en";

const translations: Record<Locale, Translation> = { ru, en };

const STORAGE_KEY = "locale";

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "ru" || stored === "en") return stored;

  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "ru" ? "ru" : "en";
}

const locale = ref<Locale>(getInitialLocale());

const t = computed<Translation>(() => translations[locale.value]);

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, locale.value);
  document.documentElement.lang = locale.value;
  document.title = t.value.meta.title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", t.value.meta.description);
  }
});

export function useI18n() {
  const setLocale = (l: Locale) => {
    locale.value = l;
  };

  const toggleLocale = () => {
    locale.value = locale.value === "ru" ? "en" : "ru";
  };

  return {
    locale,
    t,
    setLocale,
    toggleLocale,
  };
}
