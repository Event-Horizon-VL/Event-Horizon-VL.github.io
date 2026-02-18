<script setup lang="ts">
import { ref, computed } from "vue";
import { PACKAGES } from "../constants";
import { useI18n } from "../i18n";
import SectionHeader from "./ui/SectionHeader.vue";
import SearchInput from "./ui/SearchInput.vue";
import TabGroup from "./ui/TabGroup.vue";
import PackageRow from "./ui/PackageRow.vue";

const { t } = useI18n();

const search = ref("");
const selectedCategory = ref("all");

const categories = computed(() => {
  const cats = t.value.packages.categories;
  return [
    { value: "all", label: cats.all },
    { value: "net", label: cats.net },
    { value: "multimedia", label: cats.multimedia },
    { value: "editors", label: cats.editors },
    { value: "wm", label: cats.wm },
    { value: "devel", label: cats.devel },
    { value: "utils", label: cats.utils },
  ];
});

const filteredPackages = computed(() => {
  const items = t.value.packages.items;
  return PACKAGES.filter((pkg) => {
    const desc = items[pkg.name] ?? pkg.name;
    const matchesSearch =
      !search.value ||
      pkg.name.toLowerCase().includes(search.value.toLowerCase()) ||
      desc.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "all" ||
      pkg.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const copyCommand = (pkgName: string) => {
  navigator.clipboard.writeText(`sudo xbps-install -S ${pkgName}`);
};
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

      <div class="packages-controls">
        <div class="search-wrapper">
          <SearchInput
            v-model="search"
            :placeholder="t.packages.searchPlaceholder"
          />
        </div>
        <TabGroup :tabs="categories" v-model="selectedCategory" />
      </div>

      <div class="packages-list">
        <PackageRow
          v-for="pkg in filteredPackages"
          :key="pkg.name"
          :name="pkg.name"
          :version="pkg.version"
          :description="t.packages.items[pkg.name] ?? pkg.name"
          :category="pkg.category"
          :copyTitle="t.packages.copyTitle"
          @copy="copyCommand"
        />

        <div v-if="filteredPackages.length === 0" class="no-results">
          <p>{{ t.packages.noResults }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.packages {
  padding: clamp(3rem, 8vw, 6rem) 0;
  background: var(--bg-secondary);
}

.packages-controls {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.search-wrapper {
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.packages-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--surface-border);
}

.no-results {
  padding: clamp(2rem, 4vw, 3rem);
  text-align: center;
  color: var(--text-muted);
  background: var(--surface);
}
</style>
