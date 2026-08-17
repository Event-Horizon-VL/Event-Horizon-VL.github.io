import type { Translation } from "./types";

export const en: Translation = {
  meta: {
    title: "BlackHole — Unofficial Void Linux Repository",
    description:
      "Unofficial Void Linux repository with additional XBPS packages, including Hyprland, build templates and installation guides.",
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
      "Unofficial repository for Void Linux: additional XBPS packages (Hyprland and more), templates and build scripts.",
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
        description: "Signed packages and frequent updates.",
      },
    },
  },

  packages: {
    title: "Packages",
    subtitle:
      "Additional packages built specifically for Void Linux. Install via XBPS.",
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
  },

  install: {
    title: "Installation",
    subtitle:
      "Install prebuilt binaries from the main branch or build packages locally from templates.",
    architecturesTitle:
      "Packages are built and tested for the following architectures:",
    architectureSelector: "Architecture",
    groups: {
      manual: {
        title: "Build from source",
        note: "For the manual branch.",
      },
      prebuilt: {
        title: "Prebuilt binaries",
        note: "For the main branch only.",
      },
    },
    ruMirror: {
      title: "Russian mirror",
      description:
        "Recommended for users in Russia and the CIS: lower latency and faster package downloads.",
    },
    steps: {
      cloneRepositories: "Clone this repository and void-packages",
      switchBranch: "Switch to the required branch if needed",
      copyTemplates: "Copy the templates into void-packages",
      editShlibs:
        "Edit shlibs: remove the shlibs_remove entries and append shlibs_append",
      bootstrapBuild: "Bootstrap the build system",
      buildPackages: "Build the packages you need",
      installBuiltPackages: "Install the built packages",
      configureMirror: "Add the Blackhole mirror with higher priority",
      refreshRepo: "Refresh repositories",
      searchRepo: "Search and install packages",
    },
    note: "The old GitHub-hosted binary repositories are deprecated. If you used the old setup, remove /etc/xbps.d/20-repository-extra.conf before adding the current mirror.",
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
