/** Site-root path with GitHub Pages base prefix when configured. */
export function url(path: string): string {
  let base = import.meta.env.BASE_URL;
  if (!base.startsWith('/')) base = `/${base}`;
  if (!base.endsWith('/')) base += '/';

  const baseSegment = base.slice(1, -1);
  let clean = path.startsWith('/') ? path.slice(1) : path;

  // Avoid /open-radio-website/open-radio-website/... if base is applied twice.
  if (baseSegment && (clean === baseSegment || clean.startsWith(`${baseSegment}/`))) {
    clean = clean === baseSegment ? '' : clean.slice(baseSegment.length + 1);
  }

  return `${base}${clean}`;
}
