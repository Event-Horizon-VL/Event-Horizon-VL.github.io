<script setup lang="ts">
import { LINKS } from "../constants";
import { useI18n } from "../i18n";
import SectionHeader from "./ui/SectionHeader.vue";

const { t } = useI18n();

const installationUrl = `${LINKS.github}#installation`;
</script>

<template>
  <section id="packages" class="packages">
    <div class="section-container">
      <SectionHeader>
        <template #title>{{ t.packages.title }}</template>
        <template #subtitle>
          {{ t.packages.subtitle }}
        </template>
      </SectionHeader>

      <div class="packages-unavailable">
        <div class="packages-unavailable-icon" aria-hidden="true">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            />
            <path d="M3.27 6.96 12 12.01l8.73-5.05" />
            <path d="M12 22.08V12" />
          </svg>
        </div>
        <div class="packages-unavailable-content">
          <h3>{{ t.packages.unavailableTitle }}</h3>
          <p>{{ t.packages.unavailableDescription }}</p>
          <a
            :href="installationUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="packages-github-link"
          >
            {{ t.packages.githubLink }}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Package search and category menu are temporarily disabled. Use GitHub for the current package list. -->
    </div>
  </section>
</template>

<style scoped>
.packages {
  padding: clamp(3rem, 8vw, 6rem) 0;
  background: var(--bg-secondary);
}

.packages-unavailable {
  max-width: 750px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface-border);
}

.packages-unavailable-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  color: var(--accent-bright);
  background: var(--accent-subtle);
  border-radius: var(--radius-md);
}

.packages-unavailable-content h3 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-size: clamp(1rem, 1.6vw, 1.2rem);
}

.packages-unavailable-content p {
  margin-bottom: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.packages-github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--accent-bright);
  font-weight: 600;
  text-decoration: none;
}

.packages-github-link:hover {
  text-decoration: underline;
}

@media (max-width: 560px) {
  .packages-unavailable {
    flex-direction: column;
  }
}
</style>
