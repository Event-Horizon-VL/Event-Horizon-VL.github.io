<script setup lang="ts">
defineProps<{
  step: number;
  title: string;
  command: string;
}>();

const emit = defineEmits<{
  copy: [command: string];
}>();
</script>

<template>
  <div class="step-card">
    <div class="step-number">{{ step }}</div>
    <div class="step-content">
      <h3 class="step-title">{{ title }}</h3>
      <slot :command="command" :copy="() => emit('copy', command)">
        <div class="step-command">
          <code>{{ command }}</code>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.step-card {
  display: flex;
  gap: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-lg);
  padding: clamp(1rem, 2vw, 1.5rem);
  transition: all 0.2s ease;
  align-items: flex-start;
}

.step-card:hover {
  border-color: var(--accent);
  box-shadow: var(--shadow-glow);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: clamp(36px, 5vw, 42px);
  height: clamp(36px, 5vw, 42px);
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-weight: 800;
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.step-title {
  font-size: clamp(0.92rem, 1.3vw, 1.05rem);
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.step-command code {
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 1.1vw, 0.82rem);
  color: var(--accent-bright);
  word-break: break-all;
}

@media (max-width: 640px) {
  .step-card {
    flex-direction: column;
    gap: 0.85rem;
  }

  .step-content {
    width: 100%;
  }
}

@media (max-width: 380px) {
  .step-card {
    padding: 0.85rem;
  }
}
</style>
