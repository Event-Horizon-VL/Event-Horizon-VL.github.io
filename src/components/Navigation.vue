<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { LINKS } from "../constants";
import { useI18n } from "../i18n";
import { handleScrollLink, scrollTo } from "../composables/useScrollTo";
import ThemeToggle from "./ThemeToggle.vue";
import VoidLogo from "./ui/VoidLogo.vue";
import LangSwitch from "./ui/LangSwitch.vue";

const { t } = useI18n();

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

const navItems = computed(() => [
  { label: t.value.nav.home, href: "#hero" },
  { label: t.value.nav.features, href: "#features" },
  { label: t.value.nav.packages, href: "#packages" },
  { label: t.value.nav.install, href: "#install" },
  { label: t.value.nav.github, href: LINKS.github, external: true },
]);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  document.body.style.overflow = mobileMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = "";
};

const onNavClick = (e: Event, href: string) => {
  closeMenu();
  handleScrollLink(e, href);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});
</script>

<template>
  <nav :class="['navbar', { scrolled, 'menu-open': mobileMenuOpen }]">
    <div class="nav-container">
      <a
        href="/"
        class="nav-brand"
        @click.prevent="
          closeMenu();
          scrollTo('hero');
        "
      >
        <VoidLogo :size="30" />
        <span class="brand-text">
          <span class="brand-void">Black</span>
          <span class="brand-repo">Hole</span>
        </span>
      </a>

      <button
        class="mobile-toggle"
        @click="toggleMenu"
        :aria-label="mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu"
        :aria-expanded="mobileMenuOpen"
      >
        <span :class="['hamburger', { open: mobileMenuOpen }]">
          <!-- костыль для моб меню -->
          <span /><span /><span />
        </span>
      </button>

      <div :class="['nav-menu', { open: mobileMenuOpen }]">
        <div class="nav-links">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.external ? item.href : undefined"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            class="nav-link"
            @click="(e) => onNavClick(e, item.href)"
          >
            {{ item.label }}
            <svg
              v-if="item.external"
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
        <div class="nav-actions">
          <div class="nav-actions-row">
            <LangSwitch />
            <ThemeToggle />
          </div>
          <a :href="LINKS.tgChat" target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  padding: 1rem 0;
}

.navbar.scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid var(--surface-border);
  padding: 0.6rem 0;
  box-shadow: var(--shadow-sm);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--text-primary);
  z-index: 10;
}

.brand-text {
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  font-weight: 700;
  letter-spacing: -0.5px;
}

.brand-void {
  color: var(--accent-bright);
}

.brand-repo {
  color: var(--text-primary);
  font-weight: 400;
  opacity: 0.7;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--accent-subtle);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.nav-actions-row {
  display: contents;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 10;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
  width: 100%;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 960px) {
  .nav-links {
    gap: 0;
  }

  .nav-link {
    padding: 0.45rem 0.55rem;
    font-size: 0.82rem;
  }
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .nav-menu {
    position: fixed;
    inset: 0;
    background: var(--bg-primary);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
    z-index: 5;
    padding: 5rem 2rem 2rem;
  }

  .nav-menu.open {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .nav-link {
    font-size: 1.15rem;
    padding: 0.75rem 1.25rem;
    justify-content: center;
  }

  .nav-actions {
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }

  .nav-actions-row {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .nav-cta {
    padding: 0.75rem 2rem;
    font-size: 1rem;
    text-align: center;
    width: 100%;
    max-width: 200px;
  }
}
</style>
