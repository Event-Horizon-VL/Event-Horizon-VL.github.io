<script setup lang="ts">
import { computed } from "vue";
import { FEATURE_KEYS } from "../constants";
import { useI18n } from "../i18n";
import SectionHeader from "./ui/SectionHeader.vue";
import FeatureCard from "./ui/FeatureCard.vue";

const { t } = useI18n();

const features = computed(() =>
  FEATURE_KEYS.map((f) => ({
    icon: f.icon,
    title: t.value.features.items[f.key].title,
    description: t.value.features.items[f.key].description,
  })),
);
</script>

<template>
  <section id="features" class="features">
    <div class="section-container">
      <SectionHeader>
        <template #title>{{ t.features.title }}</template>
        <template #subtitle>
          {{ t.features.subtitle }}
        </template>
      </SectionHeader>

      <div class="features-grid">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  padding: clamp(3rem, 8vw, 6rem) 0;
  position: relative;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: clamp(0.85rem, 1.5vw, 1.25rem);
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
