<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { LINKS, SUPPORTED_ARCHITECTURES } from "../constants";
import { useI18n } from "../i18n";
import SectionHeader from "../components/ui/SectionHeader.vue";
import SearchInput from "../components/ui/SearchInput.vue";
import TabGroup from "../components/ui/TabGroup.vue";
import PackageRow from "../components/ui/PackageRow.vue";

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
  };
}

const API_URL = import.meta.env.VITE_API_URL ?? LINKS.api;
const PAGE_SIZE = 8;
const FETCH_PAGE_SIZE = 500;
const CACHE_TTL_MS = 10 * 60 * 1000;
const PERSIST_TTL_MS = 60 * 60 * 1000;

interface CacheEntry {
  packages: ApiPackage[];
  ts: number;
}

const archCache = new Map<string, CacheEntry>();

const storageKey = (arch: string) => `blackhole:packages:${arch}`;

const readStorage = (arch: string): CacheEntry | null => {
  try {
    const raw = localStorage.getItem(storageKey(arch));
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
};

const saveToStorage = (arch: string, packages: ApiPackage[]) => {
  try {
    localStorage.setItem(
      storageKey(arch),
      JSON.stringify({ packages, ts: Date.now() }),
    );
  } catch {
    /* storage unavailable */
  }
};

let persistedSearch = "";
let persistedArch = "x86_64";
let persistedPage = 1;

const search = ref(persistedSearch);
const selectedArch = ref(persistedArch);
const allPackages = ref<ApiPackage[]>([]);
const page = ref(persistedPage);
const loading = ref(false);
const loadFailed = ref(false);

const archTabs = computed(() =>
  SUPPORTED_ARCHITECTURES.map((arch) => ({ value: arch, label: arch })),
);

const filteredPackages = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) return allPackages.value;
  return allPackages.value.filter(
    (pkg) =>
      pkg.packageName.toLowerCase().includes(query) ||
      pkg.shortDescription.toLowerCase().includes(query),
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredPackages.value.length / PAGE_SIZE)),
);

const pagedPackages = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE;
  return filteredPackages.value.slice(start, start + PAGE_SIZE);
});

const fetchPage = async (
  arch: string,
  pageNumber: number,
): Promise<PackagesResponse> => {
  const params = new URLSearchParams({
    arch,
    pageNumber: String(pageNumber),
    pageSize: String(FETCH_PAGE_SIZE),
  });
  const res = await fetch(`${API_URL}/packages?${params}`);
  if (!res.ok) {
    throw new Error(`API responded with ${res.status}`);
  }
  return res.json();
};

let loadSeq = 0;

const fetchAll = async (arch: string): Promise<ApiPackage[]> => {
  const firstPage = await fetchPage(arch, 1);
  if (firstPage.page.totalPages <= 1) return [...firstPage.content];
  const restPages = await Promise.all(
    Array.from({ length: firstPage.page.totalPages - 1 }, (_, i) =>
      fetchPage(arch, i + 2),
    ),
  );
  return [...firstPage.content, ...restPages.flatMap((p) => p.content)];
};

const loadArch = async (arch: string) => {
  const mem = archCache.get(arch);
  if (mem && Date.now() - mem.ts < CACHE_TTL_MS) {
    allPackages.value = mem.packages;
    return;
  }

  const stored = readStorage(arch);
  const storedFresh = stored && Date.now() - stored.ts < PERSIST_TTL_MS;

  if (stored) {
    allPackages.value = stored.packages;
    archCache.set(arch, stored);
    if (storedFresh) return;
  }

  const seq = ++loadSeq;
  loading.value = !stored;
  loadFailed.value = false;
  if (!stored) allPackages.value = [];

  try {
    const full = await fetchAll(arch);
    if (seq !== loadSeq) return;
    allPackages.value = full;
    const entry = { packages: full, ts: Date.now() };
    archCache.set(arch, entry);
    saveToStorage(arch, full);
  } catch {
    if (!stored && allPackages.value.length === 0) {
      loadFailed.value = true;
    }
  } finally {
    if (seq === loadSeq) {
      loading.value = false;
    }
  }
};

const goToPage = (targetPage: number) => {
  if (targetPage < 1 || targetPage > totalPages.value) return;
  page.value = targetPage;
  persistedPage = targetPage;
};

const copyCommand = (pkgName: string) => {
  navigator.clipboard.writeText(`sudo xbps-install -S ${pkgName}`);
};

const packageHref = (pkgName: string) => `${LINKS.srcpkgs}/${pkgName}`;

watch(search, () => {
  persistedSearch = search.value;
  page.value = 1;
  persistedPage = 1;
});

watch(selectedArch, () => {
  persistedArch = selectedArch.value;
  page.value = 1;
  persistedPage = 1;
  loadArch(selectedArch.value);
});

watch(filteredPackages, () => {
  if (page.value > totalPages.value) {
    page.value = totalPages.value;
    persistedPage = page.value;
  }
});

loadArch(persistedArch);
</script>

<template>
  <main class="packages-page">
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
          <TabGroup :tabs="archTabs" v-model="selectedArch" />
        </div>

        <div v-if="loading" class="packages-status">
          <div class="spinner" aria-hidden="true"></div>
        </div>

        <div v-else class="packages-list">
          <PackageRow
            v-for="pkg in pagedPackages"
            :key="pkg.packageName"
            :name="pkg.packageName"
            :version="pkg.version"
            :description="pkg.shortDescription"
            :href="packageHref(pkg.packageName)"
            :copyTitle="t.packages.copyTitle"
            @copy="copyCommand"
          />

          <div v-if="filteredPackages.length === 0" class="no-results">
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
  </main>
</template>

<style scoped>
.packages-page {
  padding: clamp(4rem, 8vw, 6rem) 0 clamp(3rem, 8vw, 6rem);
  min-height: 100vh;
}

.packages-page :deep(.section-title) {
  font-size: clamp(2.25rem, 5vw, 3.25rem);
}

.packages-page :deep(.section-subtitle) {
  font-size: clamp(1rem, 1.7vw, 1.3rem);
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