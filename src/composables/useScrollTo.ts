export function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function handleScrollLink(e: Event, href: string) {
  if (href.startsWith("#")) {
    e.preventDefault();
    scrollTo(href.slice(1));
  }
}
