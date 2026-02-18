<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "../../i18n";

const props = defineProps<{
  code: string;
  inline?: boolean;
}>();

const { t } = useI18n();
const copied = ref(false);

const copy = () => {
  navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>

<template>
  <div :class="['code-block', { 'code-inline': inline }]">
    <code>{{ code }}</code>
    <button
      class="code-copy"
      @click="copy"
      :title="copied ? t.ui.copied : t.ui.copy"
    >
      <svg
        v-if="!copied"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>
      <svg
        v-else
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-bright)"
        stroke-width="2.5"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.code-block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  overflow-x: auto;
}

.code-block code {
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 1.2vw, 0.85rem);
  color: var(--accent-bright);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .code-block code {
    white-space: pre-wrap;
    word-break: break-all;
    overflow: visible;
  }
}

.code-inline {
  display: inline-flex;
  padding: 0.3rem 0.6rem;
}

.code-copy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.code-copy:hover {
  color: var(--accent-bright);
  background: var(--accent-subtle);
}

@media (max-width: 480px) {
  .code-block {
    padding: 0.6rem 0.75rem;
    gap: 0.5rem;
  }

  .code-copy {
    width: 26px;
    height: 26px;
  }
}
</style>
