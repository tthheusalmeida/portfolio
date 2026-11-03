import { DEFAULT_LANG, Lang } from "./dictionary";

export const SITE_URL = "https://almeida-matheus.com";

// Static pages (without locale prefix). Every page exists in every language.
export const PAGES = ["/", "/projects"] as const;

// Removes the locale prefix and the trailing slash: "/en/projects/" -> "/projects".
export function stripLocale(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) return path.slice(3);
  return path;
}

// Static export uses trailing slashes ("/projects/", "/en/projects/").
// Portuguese lives at the root, English under "/en".
export function localizedPath(lang: Lang, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const prefix = lang === DEFAULT_LANG ? "" : `/${lang}`;
  return clean ? `${prefix}/${clean}/` : `${prefix}/` || "/";
}

export function absoluteUrl(lang: Lang, path: string): string {
  return `${SITE_URL}${localizedPath(lang, path)}`;
}
