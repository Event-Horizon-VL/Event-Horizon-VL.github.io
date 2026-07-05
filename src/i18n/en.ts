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
    subtitle: "The local package catalog is temporarily unavailable.",
    unavailableTitle: "Package list is temporarily unavailable",
    unavailableDescription:
      "Check GitHub for the current package list, branches and installation notes.",
    githubLink: "View on GitHub",
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
      "neovim-nightly": "Nightly Neovim build",
      hyprland: "Tiling Wayland compositor",
      "zen-browser": "Firefox-based browser",
      "sing-box": "Universal proxy platform",
      kanata: "Keyboard remap software",
    },
  },

  install: {
    title: "Installation",
    subtitle:
      "Choose prebuilt binaries from the main branch or build packages locally from templates.",
    architecturesTitle:
      "Currently packages are tested on / crosscompiled for the following architectures:",
    architectureSelector: "Target architecture",
    groups: {
      manual: {
        title: "Manually building",
        note: "Recommended for the manual branch.",
      },
      prebuilt: {
        title: "Prebuilt binaries",
        note: "Available only for the main branch.",
      },
    },
    steps: {
      cloneRepositories: "Clone this repository and void-packages",
      switchBranch: "Optionally switch to a specific branch",
      copyTemplates: "Copy template files into void-packages",
      editShlibs:
        "Edit shlibs: remove shlibs_remove lines and append shlibs_append",
      bootstrapBuild: "Bootstrap the build system",
      buildPackages: "Build the desired packages",
      installBuiltPackages: "Install the built packages",
      configureMirror: "Add the Blackhole mirror with higher priority",
      refreshRepo: "Refresh repositories and accept the fingerprint",
      searchRepo: "Search and install packages",
    },
    note: "Old GitHub-based binary repositories are deprecated. If you used the old setup, remove /etc/xbps.d/20-repository-extra.conf before adding the current mirror.",
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
