<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import Navigation from "./components/Navigation.vue";
import FooterSection from "./components/FooterSection.vue";
import { useI18n } from "./i18n";

const route = useRoute();
const { t } = useI18n();

const setMeta = (title: string, description: string) => {
  document.title = title;

  const setAttr = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setAttr('meta[name="description"]', "content", description);
  setAttr('meta[property="og:title"]', "content", title);
  setAttr('meta[property="og:description"]', "content", description);
  setAttr('meta[name="twitter:title"]', "content", title);
  setAttr('meta[name="twitter:description"]', "content", description);
};

watch(
  [route, () => t.value],
  () => {
    const pageTitle =
      route.name === "packages"
        ? `${t.value.packages.title} — ${t.value.meta.title}`
        : t.value.meta.title;
    setMeta(pageTitle, t.value.meta.description);
  },
  { immediate: true },
);
</script>

<template>
  <Navigation />
  <RouterView />
  <FooterSection />
</template>

<style scoped></style>