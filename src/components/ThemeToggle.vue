<script setup lang="ts">
import { useTheme } from "../composables/useTheme";
import { useI18n } from "../i18n";

useTheme();
const { t } = useI18n();
</script>

<template>
  <div class="theme-switch-wrapper">
    <input type="checkbox" id="theme-toggle" />
    <label
      for="theme-toggle"
      class="theme-label"
      :title="t.ui.toggleTheme"
    ></label>
  </div>
</template>

<style scoped>
#theme-toggle {
  display: none;
}

.theme-switch-wrapper {
  display: flex;
  align-items: center;
}

.theme-label {
  cursor: pointer;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: 20px;
  width: 46px;
  height: 24px;
  position: relative;
  transition: all 0.3s ease;
  display: block;
}

.theme-label:hover {
  border-color: var(--accent);
}

.theme-label::after {
  content: "🌙";
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 1px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--bg-primary);
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

#theme-toggle:checked + .theme-label::after {
  content: "☀️";
  transform: translateX(20px);
  background: var(--text-primary);
  color: var(--bg-primary);
}
</style>
