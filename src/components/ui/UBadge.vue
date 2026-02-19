<script setup lang="ts">
defineProps<{
  dot?: boolean;
}>();
</script>

<template>
  <span class="badge">
    <span v-if="dot" class="badge-dot" />
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-subtle);
  border: 0px solid var(--surface-border);
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--accent-bright);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-bright);
  animation: pulse-glow 2s ease-in-out infinite;
  box-shadow: 0 0 8px var(--accent-bright);
  flex-shrink: 0;
}
</style>
