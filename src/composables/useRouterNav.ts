import { useRouter } from "vue-router";
import { scrollTo } from "./useScrollTo";

export function useRouterNav() {
  const router = useRouter();

  const go = (href: string, external?: boolean) => {
    if (external) return;
    const hashIndex = href.indexOf("#");
    const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : null;
    const path = (hashIndex >= 0 ? href.slice(0, hashIndex) : href) || "/";

    if (path === router.currentRoute.value.path && hash) {
      scrollTo(hash);
    } else if (path === router.currentRoute.value.path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  return { go };
}