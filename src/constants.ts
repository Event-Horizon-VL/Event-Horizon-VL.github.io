export const LINKS = {
  github: "https://github.com/Event-Horizon-VL/blackhole-vl",
  tgChat: "https://t.me/chat_of_linux",
  donate: "http://buymeacoffee.com/nizarjh",
  voidOfficial: "https://voidlinux.org",
  voidDocs: "https://docs.voidlinux.org",
  voidPackages: "https://github.com/void-linux/void-packages",
};

export type FeatureKey =
  | "xbps"
  | "runit"
  | "musl"
  | "rolling"
  | "extra"
  | "security";

export const FEATURE_KEYS: { key: FeatureKey; icon: string }[] = [
  { key: "xbps", icon: "nf-md-package_variant_closed" },
  { key: "runit", icon: "nf-fa-angles_right" },
  { key: "musl", icon: "nf-md-language_c" },
  { key: "rolling", icon: "nf-md-repeat" },
  { key: "extra", icon: "nf-md-package_variant_closed_plus" },
  { key: "security", icon: "nf-oct-shield_check" },
];

export const PACKAGES = [
  { name: "vesktop", version: "1.5.6", category: "net" },
  { name: "librewolf", version: "135.0", category: "net" },
  { name: "neovim-nightly", version: "0.12.0", category: "editors" },
  { name: "hyprland", version: "0.53.2", category: "wm" },
  { name: "zen-browser", version: "1.8.2", category: "net" },
  { name: "kanata", version: "1.10.1", category: "util" },
];

export const SUPPORTED_ARCHITECTURES = [
  "x86_64",
  "x86_64-musl",
  "aarch64",
  "aarch64-musl",
];

export type InstallGroupKey = "manual" | "prebuilt";

export type InstallStepKey =
  | "cloneRepositories"
  | "switchBranch"
  | "copyTemplates"
  | "editShlibs"
  | "bootstrapBuild"
  | "buildPackages"
  | "installBuiltPackages"
  | "configureMirror"
  | "refreshRepo"
  | "searchRepo";

export const INSTALL_STEPS: {
  key: InstallGroupKey;
  steps: {
    step: number;
    key: InstallStepKey;
    command: string;
  }[];
}[] = [
  {
    key: "manual",
    steps: [
      {
        step: 1,
        key: "cloneRepositories",
        command:
          "git clone https://github.com/Event-Horizon-VL/blackhole-vl.git\ngit clone https://github.com/void-linux/void-packages.git",
      },
      {
        step: 2,
        key: "switchBranch",
        command: "cd blackhole-vl\ngit checkout manual",
      },
      {
        step: 3,
        key: "copyTemplates",
        command: "cp -r blackhole-vl/srcpkgs/* void-packages/srcpkgs/",
      },
      {
        step: 4,
        key: "editShlibs",
        command: "cd void-packages\nnvim common/shlibs",
      },
      {
        step: 5,
        key: "bootstrapBuild",
        command: "./xbps-src binary-bootstrap",
      },
      {
        step: 6,
        key: "buildPackages",
        command: "./xbps-src pkg <package1> <package2> ...",
      },
      {
        step: 7,
        key: "installBuiltPackages",
        command:
          "sudo xbps-install --repository /hostdir/binpkgs/ <package1> <package2> ...",
      },
    ],
  },
  {
    key: "prebuilt",
    steps: [
      {
        step: 1,
        key: "configureMirror",
        command: `sudo cp /usr/share/xbps.d/00-repository-main.conf /etc/xbps.d/\nsudo sed -i "1i repository=https://mirror.black-hole.dev/$(xbps-uhelper arch)" /etc/xbps.d/00-repository-main.conf`,
      },
      {
        step: 2,
        key: "refreshRepo",
        command: "sudo xbps-install -S",
      },
      {
        step: 3,
        key: "searchRepo",
        command: "xbps-query -Rs hypr\nsudo xbps-install -S hyprland",
      },
    ],
  },
];
