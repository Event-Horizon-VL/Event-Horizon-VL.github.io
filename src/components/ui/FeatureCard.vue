<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="feature-card">
 <div class="feature-icon"> <i :class="`nf ${icon}`" /> </div>
    <h3 class="feature-title">{{ title }}</h3>
    <p class="feature-desc">{{ description }}</p>
  </div>
</template>

<style scoped>
.feature-card {
  background: var(--surface);
  border: 2px solid var(--surface);
  border-radius: var(--radius-lg);
  padding: clamp(1.25rem, 2.5vw, 2rem);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent-bright),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  border-color: var(--accent);
  /* transform: translateY(-4px); */
  /* box-shadow: var(--shadow-glow); */
}

.feature-card:hover::before {
  /* opacity: 1; */
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 0.85rem;
  display: flex;
  align-items: left;
  justify-content: left;
  width: clamp(44px, 6vw, 56px);
  height: clamp(44px, 6vw, 56px);
  color: var(--accent-bright);
  background: var(--surface);
  border-radius: var(--radius-md);
}

.feature-title {
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.feature-desc {
  font-size: clamp(0.82rem, 1.1vw, 0.9rem);
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (hover: none) {
  .feature-card:hover {
    transform: none;
  }
}
</style>
