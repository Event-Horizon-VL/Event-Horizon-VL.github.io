<script setup lang="ts">
import { ref, watch } from "vue";
import { LINKS } from "../constants";
import { useI18n } from "../i18n";
import { scrollTo } from "../composables/useScrollTo";
import SectionHeader from "./ui/SectionHeader.vue";
import SearchInput from "./ui/SearchInput.vue";
import PackageRow from "./ui/PackageRow.vue";

const { t } = useI18n();

interface ApiPackage {
  packageName: string;
  version: string;
  shortDescription: string;
}

interface PackagesResponse {
  content: ApiPackage[];
  page: {
    number: number;
    totalPages: number;
    totalElements: number;
  };
}

const API_URL = import.meta.env.VITE_API_URL ?? LINKS.api;
const PAGE_SIZE = 8;

const search = ref("");
const packages = ref<ApiPackage[]>([]);
const page = ref(1);
const totalPages = ref(1);
const loading = ref(false);
const loadFailed = ref(false);

let requestSeq = 0;
let searchTimer: ReturnType<typeof setTimeout> | undefined;

const loadPage = async (targetPage: number) => {
  const seq = ++requestSeq;
  loading.value = true;
  loadFailed.value = false;
  packages.value = [];

  const params = new URLSearchParams({
    arch: "x86_64",
    pageNumber: String(targetPage),
    pageSize: String(PAGE_SIZE),
  });
  if (search.value.trim()) {
    params.set("name", search.value.trim());
  }

  try {
    const res = await fetch(`${API_URL}/packages?${params}`);
    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }
    const data: PackagesResponse = await res.json();
    if (seq !== requestSeq) return;
    packages.value = data.content;
    page.value = targetPage;
    totalPages.value = data.page.totalPages;
  } catch {
    if (seq !== requestSeq) return;
    loadFailed.value = true;
  } finally {
    if (seq === requestSeq) {
      loading.value = false;
    }
  }
};

const goToPage = (targetPage: number) => {
  if (targetPage < 1 || targetPage > totalPages.value) return;
  loadPage(targetPage);
  scrollTo("packages");
};

const copyCommand = (pkgName: string) => {
  navigator.clipboard.writeText(`sudo xbps-install -S ${pkgName}`);
};

watch(search, () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => loadPage(1), 300);
});

loadPage(1);
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

      <div v-if="loadFailed" class="packages-unavailable">
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
            :href="`${LINKS.github}#installation`"
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

      <template v-else>
        <div class="packages-controls">
          <div class="search-wrapper">
            <SearchInput
              v-model="search"
              :placeholder="t.packages.searchPlaceholder"
            />
          </div>
        </div>

        <div v-if="loading" class="packages-status">
          <div class="spinner" aria-hidden="true"></div>
        </div>

        <div v-else class="packages-list">
          <PackageRow
            v-for="pkg in packages"
            :key="pkg.packageName"
            :name="pkg.packageName"
            :version="pkg.version"
            :description="pkg.shortDescription"
            :copyTitle="t.packages.copyTitle"
            @copy="copyCommand"
          />

          <div v-if="packages.length === 0" class="no-results">
            <p>{{ t.packages.noResults }}</p>
          </div>
        </div>

        <div v-if="totalPages > 1" class="packages-pagination">
          <button
            class="page-btn"
            :disabled="page <= 1"
            @click="goToPage(page - 1)"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span class="page-indicator">{{ page }} / {{ totalPages }}</span>
          <button
            class="page-btn"
            :disabled="page >= totalPages"
            @click="goToPage(page + 1)"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </template>
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
}

.packages-status {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 4vw, 3rem);
  background: var(--surface);
  border-radius: var(--radius-lg);
}

.spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--accent-subtle);
  border-top-color: var(--accent-bright);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.no-results {
  padding: clamp(2rem, 4vw, 3rem);
  text-align: center;
  color: var(--text-muted);
  background: var(--surface);
}

.packages-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--surface);
  border: 0px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  color: var(--accent-bright);
  background: var(--accent-subtle);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.page-indicator {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-secondary);
}

@media (max-width: 560px) {
  .packages-unavailable {
    flex-direction: column;
  }
}
</style>