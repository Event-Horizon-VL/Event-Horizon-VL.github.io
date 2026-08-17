<script setup lang="ts">
import { useRouterNav } from "../../composables/useRouterNav";

defineProps<{
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}>();

const { go } = useRouterNav();

const onLinkClick = (
  e: Event,
  link: { href: string; external?: boolean },
) => {
  if (link.external) return;
  e.preventDefault();
  go(link.href);
};
</script>

<template>
  <div class="link-group">
    <h4>{{ title }}</h4>
    <ul>
      <li v-for="link in links" :key="link.label">
        <a
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          @click="(e: Event) => onLinkClick(e, link)"
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