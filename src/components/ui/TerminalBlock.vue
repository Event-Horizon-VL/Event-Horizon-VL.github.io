<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="terminal">
    <div class="terminal-header">
      <div class="terminal-dots">
        <span class="dot dot-red" />
        <span class="dot dot-yellow" />
        <span class="dot dot-green" />
      </div>
      <span v-if="title" class="terminal-title">{{ title }}</span>
    </div>
    <div class="terminal-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.terminal {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow-lg);
  text-align: left;
  width: 100%;
}

.terminal-header {
  background: var(--surface);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--surface-border);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red {
  background: #ff5f57;
}
.dot-yellow {
  background: #febc2e;
}
.dot-green {
  background: #28c840;
}

.terminal-title {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.terminal-body {
  background: var(--code-bg);
  padding: 1.25rem;
  font-family: var(--font-mono);
  font-size: clamp(0.72rem, 1.2vw, 0.85rem);
  overflow-x: auto;
}

@media (max-width: 480px) {
  .terminal-header {
    padding: 0.6rem 0.85rem;
  }

  .terminal-body {
    padding: 1rem 0.85rem;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}
</style>
