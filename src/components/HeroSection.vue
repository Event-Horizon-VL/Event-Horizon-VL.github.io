<script setup lang="ts">
import { computed } from "vue";
import { LINKS } from "../constants";
import { useI18n } from "../i18n";
import { handleScrollLink } from "../composables/useScrollTo";
import UBadge from "./ui/UBadge.vue";
import TerminalBlock from "./ui/TerminalBlock.vue";
import StatBar from "./ui/StatBar.vue";

const { t } = useI18n();

const stats = computed(() => [
  { value: "100+", label: t.value.hero.stats.packages },
  { value: "x86_64", label: t.value.hero.stats.archX86 },
  { value: "aarch64", label: t.value.hero.stats.archArm },
  { value: "24/7", label: t.value.hero.stats.updates },
]);

const buttons = computed(() => [
  { label: t.value.hero.btnInstall, href: "#install", primary: true },
  {
    label: t.value.hero.btnTelegram,
    href: LINKS.tgChat,
    primary: false,
    external: true,
  },
]);
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-bg">
      <div class="grid-overlay" />
      <div class="glow glow-1" />
      <div class="glow glow-2" />
      <div class="glow glow-3" />
    </div>

    <div class="hero-container">
      <UBadge dot class="fade-in-up">{{ t.hero.badge }}</UBadge>

      <h1 class="hero-title fade-in-up" style="animation-delay: 0.1s">
        {{ t.hero.titlePrefix }}<br />
        <span class="gradient-text">{{ t.hero.titleHighlight }}</span>
      </h1>

      <p class="hero-description fade-in-up" style="animation-delay: 0.2s">
        {{ t.hero.description }}
      </p>

      <div class="hero-actions fade-in-up" style="animation-delay: 0.3s">
        <a
          v-for="btn in buttons"
          :key="btn.label"
          :href="btn.href"
          :target="btn.external ? '_blank' : undefined"
          :rel="btn.external ? 'noopener noreferrer' : undefined"
          :class="['hero-btn', btn.primary ? 'btn-primary' : 'btn-secondary']"
          @click="(e: Event) => handleScrollLink(e, btn.href)"
        >
          <svg
            v-if="btn.primary"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
            />
          </svg>
          {{ btn.label }}
        </a>
      </div>

      <div class="hero-terminal fade-in-up" style="animation-delay: 0.45s">
        <TerminalBlock title="terminal">
          <div class="terminal-line">
            <span class="prompt">$</span>
            <span class="command"
              >sudo xbps-install -S telegram-desktop vesktop hyprland</span
            >
          </div>
          <div class="terminal-line output">
            <span>{{ t.hero.terminalDownloading }}</span>
          </div>
          <div class="terminal-line output">
            <span class="success">{{ t.hero.terminalSuccess }}</span>
          </div>
        </TerminalBlock>
      </div>

      <div class="fade-in-up" style="animation-delay: 0.6s">
        <StatBar :items="stats" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: clamp(5rem, 12vw, 8rem) clamp(1rem, 4vw, 2rem)
    clamp(2.5rem, 6vw, 4rem);
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--surface-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--surface-border) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.15;
  mask-image: radial-gradient(
    ellipse 80% 70% at 50% 40%,
    black 20%,
    transparent 75%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 80% 70% at 50% 40%,
    black 20%,
    transparent 75%
  );
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.glow-1 {
  width: min(600px, 80vw);
  height: min(600px, 80vw);
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(
    circle,
    rgba(93, 186, 136, 0.12) 0%,
    transparent 70%
  );
  animation: float 8s ease-in-out infinite;
}

.glow-2 {
  width: min(400px, 60vw);
  height: min(400px, 60vw);
  bottom: 10%;
  left: 10%;
  background: radial-gradient(
    circle,
    rgba(71, 128, 97, 0.08) 0%,
    transparent 70%
  );
  animation: float 10s ease-in-out infinite reverse;
}

.glow-3 {
  width: min(300px, 50vw);
  height: min(300px, 50vw);
  top: 30%;
  right: 5%;
  background: radial-gradient(
    circle,
    rgba(93, 186, 136, 0.06) 0%,
    transparent 70%
  );
  animation: float 12s ease-in-out infinite;
}

.hero-container {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.hero-title {
  font-size: clamp(2.2rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -2px;
  margin: 1.5rem 0;
  color: var(--text-primary);
}

.gradient-text {
  background: linear-gradient(
    135deg,
    var(--accent-bright) 0%,
    #88d4ab 40%,
    var(--accent) 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
}

.hero-description {
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  color: var(--text-secondary);
  max-width: 650px;
  margin: 0 auto clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 0.85rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: clamp(0.65rem, 1.2vw, 0.85rem) clamp(1.25rem, 2.5vw, 2rem);
  border-radius: var(--radius-md);
  font-size: clamp(0.85rem, 1.2vw, 1rem);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-secondary);
  border: 1px solid var(--accent);
  /* box-shadow: 0 0 30px rgba(93, 186, 136, 0.15); */
}

.btn-primary:hover {
  background: var(--accent-bright);
  border-color: var(--accent-bright);
  /* box-shadow: 0 0 40px rgba(93, 186, 136, 0.25); */
  /* transform: translateY(-2px); */
  color: var(--bg-primary);
}

.btn-secondary {
  background: var(--surface);
  color: var(--text-primary);
  border: 0px solid var(--surface-border);
}

.btn-secondary:hover {
  /* border-color: var(--text-muted); */
  /* background: var(--surface); */
  /* transform: translateY(-2px); */
  /* color: var(--text-primary); */
  border-color: var(--accent);
  color: var(--accent-bright);
  background: var(--accent-subtle);
}

.hero-terminal {
  max-width: 620px;
  margin: 0 auto clamp(2rem, 4vw, 3rem);
}

/* Terminal line styles */
.terminal-line {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.terminal-line:last-child {
  margin-bottom: 0;
}

.prompt {
  color: var(--accent-bright);
  font-weight: 600;
  user-select: none;
}

.command {
  color: var(--text-primary);
  word-break: break-all;
  white-space: pre-wrap;
}

.output {
  color: var(--text-muted);
  padding-left: 1rem;
}

.success {
  color: var(--accent-bright);
}

@media (max-width: 480px) {
  .hero {
    padding-top: clamp(4.5rem, 10vw, 6rem);
  }

  .hero-title {
    letter-spacing: -1px;
    margin: 1rem 0;
  }

  .hero-description {
    margin-bottom: 1.25rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    margin-bottom: 1.5rem;
  }

  .hero-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}

@media (hover: none) {
  .btn-primary:hover,
  .btn-secondary:hover {
    transform: none;
  }
}
</style>
