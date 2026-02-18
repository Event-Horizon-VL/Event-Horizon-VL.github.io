<script setup lang="ts">
import { useI18n } from "../../i18n";

defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();

const { t } = useI18n();
</script>

<template>
  <div class="search-box">
    <svg
      class="search-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
    <input
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      type="text"
      :placeholder="placeholder ?? t.ui.search"
      class="search-input"
    />
  </div>
</template>

<style scoped>
.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.75rem;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}

@media (max-width: 480px) {
  .search-input {
    padding: 0.7rem 0.85rem 0.7rem 2.5rem;
    font-size: 0.9rem;
  }
}
</style>
