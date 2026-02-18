export interface FeatureTranslation {
  title: string;
  description: string;
}

export interface Translation {
  meta: {
    title: string;
    description: string;
  };

  nav: {
    home: string;
    features: string;
    packages: string;
    install: string;
    github: string;
    openMenu: string;
    closeMenu: string;
  };

  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    btnInstall: string;
    btnTelegram: string;
    terminalDownloading: string;
    terminalSuccess: string;
    stats: {
      packages: string;
      archX86: string;
      archArm: string;
      updates: string;
    };
  };

  features: {
    title: string;
    subtitle: string;
    items: {
      xbps: FeatureTranslation;
      runit: FeatureTranslation;
      musl: FeatureTranslation;
      rolling: FeatureTranslation;
      extra: FeatureTranslation;
      security: FeatureTranslation;
    };
  };

  packages: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    noResults: string;
    copyTitle: string;
    categories: {
      all: string;
      net: string;
      multimedia: string;
      editors: string;
      wm: string;
      devel: string;
      utils: string;
    };
    items: Record<string, string>;
  };

  install: {
    title: string;
    subtitle: string;
    steps: {
      createAnEntry: string;
      refreshRepo: string;
      searchRepo: string;
    };
    note: string;
  };

  footer: {
    description: string;
    groups: {
      links: string;
      voidLinux: string;
      repo: string;
    };
    linkLabels: {
      github: string;
      telegram: string;
      donate: string;
      officialSite: string;
      docs: string;
      voidPackages: string;
      packages: string;
      install: string;
      features: string;
    };
    copyright: string;
    voidLinux: string;
    madeWith: string;
  };

  ui: {
    copied: string;
    copy: string;
    toggleTheme: string;
    search: string;
  };
}

export type Locale = "ru" | "en";
