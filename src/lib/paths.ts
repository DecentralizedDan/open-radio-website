/** Site-root path with GitHub Pages base prefix when configured. */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
