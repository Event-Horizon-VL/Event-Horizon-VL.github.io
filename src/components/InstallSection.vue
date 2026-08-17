<script setup lang="ts">
import { computed, ref } from "vue";
import { INSTALL_STEPS, LINKS, SUPPORTED_ARCHITECTURES } from "../constants";
import { useI18n } from "../i18n";
import SectionHeader from "./ui/SectionHeader.vue";
import StepCard from "./ui/StepCard.vue";
import CodeBlock from "./ui/CodeBlock.vue";

const { t } = useI18n();
const selectedArchitecture = ref("x86_64");

const ruMirrorCommand = `sudo cp /usr/share/xbps.d/00-repository-main.conf /etc/xbps.d/\nsudo sed -i "1i repository=${LINKS.ruMirror}/$(xbps-uhelper arch)" /etc/xbps.d/00-repository-main.conf\nsudo xbps-install -S`;

const getInstallCommand = (key: string, command: string) => {
  if (key !== "configureMirror") return command;

  return `sudo cp /usr/share/xbps.d/00-repository-main.conf /etc/xbps.d/\nsudo sed -i "1i repository=https://mirror.black-hole.dev/${selectedArchitecture.value}" /etc/xbps.d/00-repository-main.conf`;
};

const installGroups = computed(() =>
  INSTALL_STEPS.map((group) => ({
    key: group.key,
    title: t.value.install.groups[group.key].title,
    note: t.value.install.groups[group.key].note,
    steps: group.steps.map((item) => ({
      ...item,
      title: t.value.install.steps[item.key],
      command: getInstallCommand(item.key, item.command),
    })),
  })),
);
</script>

<template>
  <section id="install" class="install">
    <div class="section-container">
      <SectionHeader>
        <template #title>{{ t.install.title }}</template>
        <template #subtitle>
          {{ t.install.subtitle }}
        </template>
      </SectionHeader>

      <div class="install-architectures">
        <p>{{ t.install.architecturesTitle }}</p>
        <ul class="architecture-list">
          <li v-for="arch in SUPPORTED_ARCHITECTURES" :key="arch">
            <code>{{ arch }}</code>
          </li>
        </ul>
      </div>

      <details
        v-for="group in installGroups"
        :key="group.key"
        class="install-group"
        :open="group.key === 'prebuilt'"
      >
        <summary>
          <span>{{ group.title }}</span>
        </summary>
        <p class="install-group-note">{{ group.note }}</p>

        <label v-if="group.key === 'prebuilt'" class="architecture-selector">
          <span>{{ t.install.architectureSelector }}</span>
          <select v-model="selectedArchitecture">
            <option
              v-for="arch in SUPPORTED_ARCHITECTURES"
              :key="arch"
              :value="arch"
            >
              {{ arch }}
            </option>
          </select>
        </label>

        <div class="steps">
          <StepCard
            v-for="item in group.steps"
            :key="`${group.key}-${item.step}`"
            :step="item.step"
            :title="item.title"
            :command="item.command"
          >
            <template #default>
              <CodeBlock :code="item.command" />
            </template>
          </StepCard>
        </div>
      </details>

      <div class="install-ru-mirror">
        <div class="ru-mirror-head">
          <span class="ru-mirror-title">{{ t.install.ruMirror.title }}</span>
          <a
            :href="LINKS.ruMirror"
            target="_blank"
            rel="noopener noreferrer"
            class="ru-mirror-url"
          >
            ru.mirror.black-hole.dev
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
        <p class="ru-mirror-description">
          {{ t.install.ruMirror.description }}
        </p>
        <CodeBlock :code="ruMirrorCommand" />
      </div>

      <div class="install-note">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <span>{{ t.install.note }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.install {
  padding: clamp(3rem, 8vw, 6rem) 0;
  position: relative;
}

.install-architectures {
  max-width: 1100px;
  margin: 0 auto clamp(1.5rem, 3vw, 2.5rem);
  padding: 1rem 1.25rem;
  background: var(--surface);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
}

.install-architectures p {
  margin-bottom: 0.85rem;
  line-height: 1.6;
}

.architecture-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  list-style: none;
}

.architecture-list code {
  display: inline-flex;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-sm);
  background: var(--code-bg);
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: 0.82rem;
}

.install-group {
  max-width: 1100px;
  margin: 0 auto 1rem;
  padding: 1rem;
  background: var(--surface);
  border-radius: var(--radius-lg);
}

.install-group summary {
  cursor: pointer;
  color: var(--text-primary);
  font-weight: 700;
  font-size: clamp(1rem, 1.5vw, 1.12rem);
}

.install-group-note {
  margin: 0.85rem 0 1rem;
  color: var(--text-secondary);
  font-size: clamp(0.78rem, 1.1vw, 0.9rem);
  line-height: 1.6;
}

.architecture-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: clamp(0.78rem, 1.1vw, 0.9rem);
}

.architecture-selector select {
  min-width: 170px;
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-sm);
  padding: 0.45rem 0.65rem;
  background: var(--surface);
  color: var(--text-primary);
  font: inherit;
}

.steps {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.install-note {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 1100px;
  margin: clamp(1.5rem, 3vw, 2.5rem) auto 0;
  padding: 1rem 1.25rem;
  background: var(--accent-subtle);
  border: 0px solid var(--surface-border);
  border-radius: var(--radius-md);
  font-size: clamp(0.78rem, 1.1vw, 0.85rem);
  color: var(--text-secondary);
  line-height: 1.6;
}

.install-ru-mirror {
  max-width: 1100px;
  margin: clamp(1.5rem, 3vw, 2.5rem) auto 0;
  padding: clamp(1rem, 2vw, 1.5rem);
  background: var(--surface);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-lg);
}

.ru-mirror-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.ru-mirror-title {
  color: var(--text-primary);
  font-weight: 700;
  font-size: clamp(1rem, 1.5vw, 1.12rem);
}

.ru-mirror-url {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  text-decoration: none;
}

.ru-mirror-url:hover {
  text-decoration: underline;
}

.ru-mirror-description {
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-size: clamp(0.78rem, 1.1vw, 0.9rem);
  line-height: 1.6;
}

.install-note svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--accent-bright);
}

@media (max-width: 480px) {
  .architecture-selector {
    flex-direction: column;
    align-items: stretch;
  }

  .architecture-selector select {
    width: 100%;
  }

  .install-note {
    padding: 0.85rem 1rem;
    gap: 0.6rem;
  }
}
</style>
