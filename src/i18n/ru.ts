import type { Translation } from "./types";

export const ru: Translation = {
  meta: {
    title: "Void Linux  Неофициальный репозиторий",
    description:
      "Неофициальный репозиторий Void Linux  пакеты, инструкции, сообщество",
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
      "Дополнительные пакеты, оптимизированные сборки и инструменты для Void Linux. Создано сообществом  для сообщества.",
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
        description:
          "Подписанные пакеты, минимальная поверхность атаки, регулярные обновления безопасности.",
      },
    },
  },

  packages: {
    title: "Пакеты",
    subtitle: "Локальный каталог пакетов временно недоступен.",
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
    items: {
      vesktop: "Discord клиент (Vencord)",
      librewolf: "Форк Firefox, ориентированный на приватность и безопасность",
      "neovim-nightly": "Nightly-сборка Neovim",
      hyprland: "Тайлинговый Wayland-композитор",
      "zen-browser": "Браузер на базе Firefox",
      "sing-box": "Универсальная прокси-платформа",
      kanata: "Программа для переназначения клавиш",
    },
  },

  install: {
    title: "Установка",
    subtitle:
      "Используйте готовые бинарные пакеты из ветки main или собирайте пакеты локально из шаблонов.",
    architecturesTitle:
      "Сейчас пакеты тестируются и кросс-компилируются для следующих архитектур:",
    architectureSelector: "Целевая архитектура",
    groups: {
      manual: {
        title: "Ручная сборка",
        note: "Рекомендуется для ветки manual.",
      },
      prebuilt: {
        title: "Готовые бинарные пакеты",
        note: "Доступно только для ветки main.",
      },
    },
    steps: {
      cloneRepositories: "Склонировать этот репозиторий и void-packages",
      switchBranch: "При необходимости переключиться на нужную ветку",
      copyTemplates: "Скопировать шаблоны в void-packages",
      editShlibs:
        "Отредактировать shlibs: удалить строки из shlibs_remove и добавить shlibs_append",
      bootstrapBuild: "Инициализировать систему сборки",
      buildPackages: "Собрать нужные пакеты",
      installBuiltPackages: "Установить собранные пакеты",
      configureMirror: "Добавить зеркало Blackhole с повышенным приоритетом",
      refreshRepo: "Обновить репозитории и принять отпечаток ключа",
      searchRepo: "Найти и установить пакеты",
    },
    note: "Старые бинарные репозитории на GitHub больше не обновляются. Если вы использовали старую настройку, удалите /etc/xbps.d/20-repository-extra.conf перед добавлением актуального зеркала.",
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
