<script setup lang="ts">
import { handleScrollLink } from "../../composables/useScrollTo";

defineProps<{
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}>();
</script>

<template>
  <div class="link-group">
    <h4>{{ title }}</h4>
    <ul>
      <li v-for="link in links" :key="link.label">
        <a
          :href="link.external ? link.href : undefined"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          @click="(e: Event) => handleScrollLink(e, link.href)"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.link-group h4 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-weight: 600;
}

.link-group ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.link-group a {
  color: var(--text-secondary);
  font-size: clamp(0.82rem, 1.1vw, 0.9rem);
  text-decoration: none;
  transition: color 0.2s ease;
}

.link-group a:hover {
  color: var(--accent-bright);
}
</style>
