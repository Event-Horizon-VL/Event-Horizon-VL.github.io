<script setup lang="ts">
defineProps<{
  items: { value: string; label: string }[];
}>();
</script>

<template>
  <div class="stat-bar">
    <template v-for="(item, i) in items" :key="i">
      <div class="stat">
        <span class="stat-value">{{ item.value }}</span>
        <span class="stat-label">{{ item.label }}</span>
      </div>
      <div v-if="i < items.length - 1" class="stat-divider" />
    </template>
  </div>
</template>

<style scoped>
.stat-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(1rem, 3vw, 2rem);
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.stat-value {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.stat-label {
  font-size: clamp(0.65rem, 1vw, 0.8rem);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--surface-border);
  flex-shrink: 0;
}

@media (max-width: 380px) {
  .stat-divider {
    display: none;
  }

  .stat-bar {
    gap: 1.5rem 2.5rem;
  }
}
</style>
