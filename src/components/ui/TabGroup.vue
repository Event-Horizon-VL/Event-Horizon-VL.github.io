<script setup lang="ts">
defineProps<{
  tabs: { value: string; label: string }[];
  modelValue: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <div class="tab-group">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="['tab-item', { active: modelValue === tab.value }]"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.tab-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tab-item {
  padding: 0.45rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: var(--font-sans);
  background: var(--surface);
  border: 0px solid var(--surface);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-item:hover {
  /* border: 2px solid var(--accent-bright); */
  /* border-color: var(--accent-bright); */
  /* color: var(--text-primary); */
  border-color: var(--accent);
  color: var(--accent-bright);
  background: var(--accent-subtle);
}

.tab-item.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--bg-primary);
}

@media (max-width: 480px) {
  .tab-group {
    gap: 0.35rem;
  }

  .tab-item {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }
}
</style>
