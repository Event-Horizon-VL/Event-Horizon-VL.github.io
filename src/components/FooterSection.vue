<script setup lang="ts">
import { computed } from "vue";
import { LINKS } from "../constants";
import { useI18n } from "../i18n";
import VoidLogo from "./ui/VoidLogo.vue";
import FooterLinkGroup from "./ui/FooterLinkGroup.vue";

const { t } = useI18n();

const linkGroups = computed(() => [
  {
    title: t.value.footer.groups.links,
    links: [
      {
        label: t.value.footer.linkLabels.github,
        href: LINKS.github,
        external: true,
      },
      {
        label: t.value.footer.linkLabels.telegram,
        href: LINKS.tgChat,
        external: true,
      },
      {
        label: t.value.footer.linkLabels.donate,
        href: LINKS.donate,
        external: true,
      },
    ],
  },
  {
    title: t.value.footer.groups.voidLinux,
    links: [
      {
        label: t.value.footer.linkLabels.officialSite,
        href: LINKS.voidOfficial,
        external: true,
      },
      {
        label: t.value.footer.linkLabels.docs,
        href: LINKS.voidDocs,
        external: true,
      },
      {
        label: t.value.footer.linkLabels.voidPackages,
        href: LINKS.voidPackages,
        external: true,
      },
    ],
  },
  {
    title: t.value.footer.groups.repo,
    links: [
      { label: t.value.footer.linkLabels.packages, href: "#packages" },
      { label: t.value.footer.linkLabels.install, href: "#install" },
      { label: t.value.footer.linkLabels.features, href: "#features" },
    ],
  },
]);
</script>

<template>
  <footer class="footer">
    <div class="section-container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <VoidLogo :size="28" />
            <span class="footer-brand-text">
              <span class="brand-v">Black</span>Hole
            </span>
          </div>
          <p class="footer-desc">
            {{ t.footer.description }}
          </p>
        </div>

        <FooterLinkGroup
          v-for="group in linkGroups"
          :key="group.title"
          :title="group.title"
          :links="group.links"
        />
      </div>

      <div class="footer-bottom">
        <p>
          {{ t.footer.copyright }}
          <a
            :href="LINKS.voidOfficial"
            target="_blank"
            rel="noopener noreferrer"
            >{{ t.footer.voidLinux }}</a
          >.
        </p>
        <p class="footer-made">{{ t.footer.madeWith }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: clamp(2.5rem, 5vw, 4rem) 0 clamp(1rem, 3vw, 2rem);
  background: var(--bg-secondary);
  border-top: 1px solid var(--surface-border);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: clamp(1.5rem, 3vw, 3rem);
  margin-bottom: clamp(2rem, 3vw, 3rem);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.footer-brand-text {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.brand-v {
  color: var(--accent-bright);
}

.footer-desc {
  color: var(--text-secondary);
  font-size: clamp(0.82rem, 1.1vw, 0.9rem);
  line-height: 1.6;
  max-width: 300px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: clamp(1.25rem, 2vw, 2rem);
  border-top: 1px solid var(--surface-border);
  font-size: clamp(0.72rem, 1vw, 0.82rem);
  color: var(--text-muted);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-made {
  color: var(--text-muted);
}

/* Tablet */
@media (max-width: 860px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

/* Mobile */
@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 1.5rem;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

/* Small mobile */
@media (max-width: 380px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
