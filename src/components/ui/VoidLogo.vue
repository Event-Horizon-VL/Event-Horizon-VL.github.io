<script setup lang="ts">
defineProps<{
  size?: number;
}>();
</script>

<template>
  <svg
    class="void-logo"
    viewBox="0 0 100 100"
    :width="size ?? 32"
    :height="size ?? 32"
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      opacity="0.3"
    />
    <circle
      cx="50"
      cy="50"
      r="30"
      fill="none"
      stroke="var(--accent-bright)"
      stroke-width="2.5"
    />
    <circle cx="50" cy="50" r="12" fill="var(--accent-bright)" opacity="0.8" />
  </svg>
</template>

<style scoped>
.void-logo {
  color: var(--text-secondary);
  flex-shrink: 0;
}
</style>
