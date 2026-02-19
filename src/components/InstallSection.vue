<script setup lang="ts">
import { ref } from "vue";
import { INSTALL_STEPS } from "../constants";
import { useI18n } from "../i18n";
import SectionHeader from "./ui/SectionHeader.vue";
import StepCard from "./ui/StepCard.vue";
import CodeBlock from "./ui/CodeBlock.vue";

const { t } = useI18n();

const copiedStep = ref<number | null>(null);

const handleCopy = (command: string, step: number) => {
  navigator.clipboard.writeText(command);
  copiedStep.value = step;
  setTimeout(() => {
    copiedStep.value = null;
  }, 2000);
};
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

      <div class="steps">
        <StepCard
          v-for="item in INSTALL_STEPS"
          :key="item.step"
          :step="item.step"
          :title="t.install.steps[item.key]"
          :command="item.command"
          @copy="(cmd) => handleCopy(cmd, item.step)"
        >
          <template #default>
            <CodeBlock :code="item.command" />
          </template>
        </StepCard>
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

.steps {
  max-width: 750px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.install-note {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 750px;
  margin: clamp(1.5rem, 3vw, 2.5rem) auto 0;
  padding: 1rem 1.25rem;
  background: var(--accent-subtle);
  border: 0px solid var(--surface-border);
  border-radius: var(--radius-md);
  font-size: clamp(0.78rem, 1.1vw, 0.85rem);
  color: var(--text-secondary);
  line-height: 1.6;
}

.install-note svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--accent-bright);
}

@media (max-width: 480px) {
  .install-note {
    padding: 0.85rem 1rem;
    gap: 0.6rem;
  }
}
</style>
