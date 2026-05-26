import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { url } from './paths';

const websiteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** Public download paths for a cheat sheet slug (files live under public/downloads/cheat-sheets/). */
export function cheatSheetDownloads(slug: string) {
  const base = `/downloads/cheat-sheets/${slug}/${slug}`;
  return {
    pdf: url(`${base}.pdf`),
    odt: url(`${base}.odt`),
  };
}

/** True when at least one PDF or ODT exists for this slug under public/downloads/cheat-sheets/. */
export function cheatSheetHasDownloads(slug: string): boolean {
  const fileBase = path.join(websiteRoot, 'public', 'downloads', 'cheat-sheets', slug, slug);
  return fs.existsSync(`${fileBase}.pdf`) || fs.existsSync(`${fileBase}.odt`);
}
