<template>
  <div class="section-header">
    <h2 class="section-title">
      <slot name="title" />
    </h2>
    <p v-if="$slots.subtitle" class="section-subtitle">
      <slot name="subtitle" />
    </p>
  </div>
</template>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
  color: var(--text-primary);
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}
</style>
