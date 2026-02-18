import type { Translation } from "./types";

export const en: Translation = {
  meta: {
    title: "Void Linux  Unofficial Repository",
    description:
      "Unofficial Void Linux repository  packages, guides, community",
  },

  nav: {
    home: "Home",
    features: "Features",
    packages: "Packages",
    install: "Install",
    github: "GitHub",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    badge: "Unofficial repository",
    titlePrefix: "Supercharge your",
    titleHighlight: "Void Linux",
    description:
      "Extra packages, optimized builds and tools for Void Linux. Built by the community  for the community.",
    btnInstall: "Connect repository",
    btnTelegram: "Telegram Chat",
    terminalDownloading: "[*] Downloading packages...",
    terminalSuccess: "3 packages installed successfully.",
    stats: {
      packages: "Packages",
      archX86: "glibc + musl",
      archArm: "glibc + musl",
      updates: "Updates",
    },
  },

  features: {
    title: "Why Void Linux?",
    subtitle:
      "An independent distro with its own package manager, init system, and a philosophy of minimalism.",
    items: {
      xbps: {
        title: "XBPS",
        description:
          "Fast and reliable package manager. Atomic updates, transaction rollback, dependency resolution.",
      },
      runit: {
        title: "runit",
        description:
          "Minimalist and lightning-fast init system. Simple, predictable, efficient.",
      },
      musl: {
        title: "musl & glibc",
        description:
          "Support for both C libraries. Choose between maximum compatibility and minimalism.",
      },
      rolling: {
        title: "Rolling Release",
        description:
          "Always up-to-date packages without reinstalling. Continuous updates.",
      },
      extra: {
        title: "Extra packages",
        description:
          "Extended collection of packages not found in the official Void Linux repository.",
      },
      security: {
        title: "Security",
        description:
          "Signed packages, minimal attack surface, regular security updates.",
      },
    },
  },

  packages: {
    title: "Packages",
    subtitle:
      "Additional packages built specifically for Void Linux. Install via XBPS.",
    searchPlaceholder: "Search packages...",
    noResults: "No packages found",
    copyTitle: "Copy install command",
    categories: {
      all: "All",
      net: "Network",
      multimedia: "Multimedia",
      editors: "Editors",
      wm: "WM",
      devel: "Development",
      utils: "Utilities",
    },
    items: {
      vesktop: "Discord client (Vencord)",
      librewolf: "Privacy-focused Firefox fork",
      "obs-studio": "Recording & streaming",
      "neovim-nightly": "Nightly Neovim build",
      hyprland: "Tiling Wayland compositor",
      "zen-browser": "Firefox-based browser",
      lazygit: "Terminal Git client",
    },
  },

  install: {
    title: "Installation",
    subtitle:
      "Connect the repository in a few simple steps. Works on glibc and musl.",
    steps: {
      createAnEntry: "Create an entry",
      refreshRepo: "Refresh repositories",
      searchRepo: "Search and install",
    },
    note: "This is an unofficial repository. Use at your own risk. Packages are signed and regularly updated.",
  },

  footer: {
    description:
      "Unofficial package repository for Void Linux. Built by enthusiasts, for enthusiasts.",
    groups: {
      links: "Links",
      voidLinux: "Void Linux",
      repo: "Repository",
    },
    linkLabels: {
      github: "GitHub",
      telegram: "Telegram",
      donate: "Donate",
      officialSite: "Official website",
      docs: "Documentation",
      voidPackages: "Void Packages",
      packages: "Packages",
      install: "Installation",
      features: "Features",
    },
    copyright: "© 2026 BlackHole. Not affiliated with",
    voidLinux: "Void Linux",
    madeWith: "Made with 💚 for the community",
  },

  ui: {
    copied: "Copied!",
    copy: "Copy",
    toggleTheme: "Toggle theme",
    search: "Search...",
  },
};
