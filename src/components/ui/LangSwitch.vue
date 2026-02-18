<script setup lang="ts">
import { useI18n } from "../../i18n";

const { locale, toggleLocale } = useI18n();
</script>

<template>
  <button
    class="lang-switch"
    @click="toggleLocale"
    :title="locale === 'ru' ? 'Switch to English' : 'Переключить на русский'"
  >
    <span class="lang-flag">{{ locale === "ru" ? "🇷🇺" : "🇬🇧" }}</span>
    <span class="lang-code">{{ locale === "ru" ? "RU" : "EN" }}</span>
  </button>
</template>

<style scoped>
.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-md);
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 600;
  font-family: var(--font-sans);
  white-space: nowrap;
}

.lang-switch:hover {
  border-color: var(--accent);
  color: var(--text-primary);
  background: var(--accent-subtle);
}

.lang-flag {
  font-size: 0.85rem;
  line-height: 1;
}

.lang-code {
  letter-spacing: 0.5px;
}
</style>
