import type { Translation } from "./types";

export const ru: Translation = {
  meta: {
    title: "BlackHole — неофициальный репозиторий Void Linux",
    description:
      "Неофициальный репозиторий Void Linux: дополнительные XBPS-пакеты, включая Hyprland, шаблоны сборки и инструкции по установке.",
  },

  nav: {
    home: "Главная",
    features: "Возможности",
    packages: "Пакеты",
    install: "Установка",
    github: "GitHub",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
  },

  hero: {
    badge: "Неофициальный репозиторий",
    titlePrefix: "Расширь свой",
    titleHighlight: "Void Linux",
    description:
      "Неофициальный репозиторий для Void Linux: дополнительные XBPS-пакеты (Hyprland и не только), шаблоны и скрипты сборки.",
    btnInstall: "Подключить репозиторий",
    btnTelegram: "Чат в Telegram",
    terminalDownloading: "[*] Downloading packages...",
    terminalSuccess: "3 packages installed successfully.",
    stats: {
      packages: "Пакетов",
      archX86: "glibc + musl",
      archArm: "glibc + musl",
      updates: "Обновления",
    },
  },

  features: {
    title: "Почему Void Linux?",
    subtitle:
      "Независимый дистрибутив с собственным пакетным менеджером, системой инициализации и философией минимализма.",
    items: {
      xbps: {
        title: "XBPS",
        description:
          "Быстрый и надёжный пакетный менеджер. Атомарные обновления, откат транзакций, разрешение зависимостей.",
      },
      runit: {
        title: "runit",
        description:
          "Минималистичная и молниеносная система инициализации. Простая, предсказуемая, эффективная.",
      },
      musl: {
        title: "musl & glibc",
        description:
          "Поддержка обеих C-библиотек. Выбирайте между максимальной совместимостью и минимализмом.",
      },
      rolling: {
        title: "Rolling Release",
        description:
          "Всегда актуальные пакеты без необходимости переустановки системы. Непрерывные обновления.",
      },
      extra: {
        title: "Доп. пакеты",
        description:
          "Расширенная коллекция пакетов, которых нет в официальном репозитории Void Linux.",
      },
      security: {
        title: "Безопасность",
        description: "Подписанные пакеты и частые обновления.",
      },
    },
  },

  packages: {
    title: "Пакеты",
    subtitle:
      "Дополнительные пакеты, собранные специально для Void Linux. Устанавливайте через XBPS.",
    unavailableTitle: "Список пакетов временно недоступен",
    unavailableDescription:
      "Актуальный список пакетов, ветки и заметки по установке смотрите на GitHub.",
    githubLink: "Смотреть на GitHub",
    searchPlaceholder: "Поиск пакетов...",
    noResults: "Пакеты не найдены",
    copyTitle: "Скопировать команду установки",
    categories: {
      all: "Все",
      net: "Сеть",
      multimedia: "Мультимедиа",
      editors: "Редакторы",
      wm: "WM",
      devel: "Разработка",
      utils: "Утилиты",
    },
  },

  install: {
    title: "Установка",
    subtitle:
      "Поставьте готовые бинарные пакеты из ветки main или соберите пакеты локально из шаблонов.",
    architecturesTitle: "Пакеты собраны и протестированы для архитектур:",
    architectureSelector: "Архитектура",
    groups: {
      manual: {
        title: "Сборка из исходников",
        note: "Для ветки manual.",
      },
      prebuilt: {
        title: "Готовые бинарные пакеты",
        note: "Только для ветки main.",
      },
    },
    ruMirror: {
      title: "Российское зеркало",
      description:
        "Рекомендуется пользователям из России и СНГ: ниже задержка и быстрее скачивание пакетов.",
    },
    steps: {
      cloneRepositories: "Склонируйте этот репозиторий и void-packages",
      switchBranch: "При необходимости переключитесь на нужную ветку",
      copyTemplates: "Скопируйте шаблоны в void-packages",
      editShlibs:
        "Отредактируйте shlibs: удалите строки из shlibs_remove и добавьте из shlibs_append",
      bootstrapBuild: "Инициализируйте систему сборки",
      buildPackages: "Соберите нужные пакеты",
      installBuiltPackages: "Установите собранные пакеты",
      configureMirror: "Подключите зеркало Blackhole с приоритетом",
      refreshRepo: "Обновите репозитории",
      searchRepo: "Найдите и установите пакеты",
    },
    note: "Старые бинарные репозитории на GitHub больше не поддерживаются. Если вы использовали старую настройку, удалите /etc/xbps.d/20-repository-extra.conf перед подключением актуального зеркала.",
  },

  footer: {
    description:
      "Неофициальный репозиторий пакетов для Void Linux. Создано энтузиастами, для энтузиастов.",
    groups: {
      links: "Ссылки",
      voidLinux: "Void Linux",
      repo: "Репозиторий",
    },
    linkLabels: {
      github: "GitHub",
      telegram: "Telegram",
      donate: "Поддержать",
      officialSite: "Официальный сайт",
      docs: "Документация",
      voidPackages: "Void Packages",
      packages: "Пакеты",
      install: "Установка",
      features: "Возможности",
    },
    copyright: "© 2026 BlackHole. Не аффилирован с",
    voidLinux: "Void Linux",
    madeWith: "Сделано с 💚 для сообщества",
  },

  ui: {
    copied: "Скопировано!",
    copy: "Скопировать",
    toggleTheme: "Переключить тему",
    search: "Поиск...",
  },
};
