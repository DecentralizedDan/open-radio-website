import { url } from './paths';

/** Public download paths for a cheat sheet slug (files live under public/downloads/cheat-sheets/). */
export function cheatSheetDownloads(slug: string) {
  const base = `/downloads/cheat-sheets/${slug}/${slug}`;
  return {
    pdf: url(`${base}.pdf`),
    odt: url(`${base}.odt`),
  };
}
