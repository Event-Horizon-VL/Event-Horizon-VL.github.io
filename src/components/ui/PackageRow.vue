<script setup lang="ts">
defineProps<{
  name: string;
  version: string;
  description: string;
  category: string;
  copyTitle?: string;
}>();

const emit = defineEmits<{
  copy: [name: string];
}>();
</script>

<template>
  <div class="package-row">
    <div class="package-info">
      <div class="package-name-row">
        <span class="package-name">{{ name }}</span>
        <span class="package-version">{{ version }}</span>
      </div>
      <p class="package-desc">{{ description }}</p>
    </div>
    <div class="package-actions">
      <span class="package-category">{{ category }}</span>
      <button class="copy-btn" @click="emit('copy', name)" :title="copyTitle">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.package-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--surface);
  transition: all 0.15s ease;
}

.package-row:hover {
  background: var(--surface-hover);
}

.package-info {
  flex: 1;
  min-width: 0;
}

.package-name-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.2rem;
  flex-wrap: wrap;
}

.package-name {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: clamp(0.82rem, 1.2vw, 0.95rem);
  color: var(--accent-bright);
}

.package-version {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  background: var(--accent-subtle);
  padding: 0.1rem 0.5rem;
  border-radius: 100px;
  white-space: nowrap;
}

.package-desc {
  font-size: clamp(0.78rem, 1.1vw, 0.85rem);
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.package-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  margin-left: 1rem;
}

.package-category {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  background: var(--bg-tertiary);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--bg-tertiary);
  border: 0px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.copy-btn:hover {
  color: var(--accent-bright);
  border-color: var(--accent);
  background: var(--accent-subtle);
}

@media (max-width: 640px) {
  .package-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
  }

  .package-info {
    width: 100%;
  }

  .package-actions {
    width: 100%;
    justify-content: space-between;
    margin-left: 0;
  }

  .package-desc {
    white-space: normal;
    line-height: 1.5;
  }
}

@media (max-width: 380px) {
  .package-row {
    padding: 0.75rem;
  }

  .package-name-row {
    gap: 0.5rem;
  }
}
</style>
