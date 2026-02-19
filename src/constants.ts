export const LINKS = {
  github: "https://github.com/Nizarjh/blackhole-vl",
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
  { key: "musl", icon: "nf-dev-c" },
  { key: "rolling", icon: "nf-md-repeat" },
  { key: "extra", icon: "nf-md-package_variant_closed_plus" },
  { key: "security", icon: "nf-oct-shield_check" },
];

export const PACKAGES = [
  { name: "vesktop", version: "1.5.6", category: "net" },
  { name: "librewolf", version: "135.0", category: "net" },
  { name: "obs-studio", version: "31.0.2", category: "multimedia" },
  { name: "neovim-nightly", version: "0.12.0", category: "editors" },
  { name: "hyprland", version: "0.53.2", category: "wm" },
  { name: "zen-browser", version: "1.8.2", category: "net" },
  { name: "lazygit", version: "0.46.0", category: "devel" },
];

export type InstallStepKey = "createAnEntry" | "refreshRepo" | "searchRepo";

export const INSTALL_STEPS: {
  step: number;
  key: InstallStepKey;
  command: string;
}[] = [
  {
    step: 1,
    key: "createAnEntry",
    command:
      "echo repository=https://raw.githubusercontent.com/Nizarjh/blackhole-vl/repository-x86_64 | sudo tee /etc/xbps.d/20-repository-extra.conf",
  },
  {
    step: 2,
    key: "refreshRepo",
    command: "sudo xbps-install -S",
  },
  {
    step: 3,
    key: "searchRepo",
    command: `xbps-query -Rs hypr && sudo xbps-install -S hyprland`,
  },
];
