import fs from 'node:fs';
import path from 'node:path';
import { url } from './paths';

const websiteRoot = process.cwd();

/** Hover text for Download ODT buttons. */
export const odtDownloadTitle =
  'OpenDocument Text — editable in LibreOffice, Google Docs, and Word';

  /** Hover text for Download ODT buttons. */
export const odpDownloadTitle =
  'OpenDocument Presentation — editable in LibreOffice, Google Docs, and PowerPoint';

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

export type WorkshopMaterial = 'slides' | 'handout' | 'trainer-guide';

const workshopMaterialConfig = {
  slides: {
    folder: 'slides',
    fileBase: (slug: string) => slug,
    formats: [
      { ext: 'pptx', label: 'Download PowerPoint', primary: true },
      { ext: 'pdf', label: 'Download PDF', primary: false },
      { ext: 'odp', label: 'Download ODP', primary: false, altExt: 'ods' as const, title: odpDownloadTitle },
    ],
  },
  handout: {
    folder: 'handouts',
    fileBase: (slug: string) => `${slug}-handout`,
    formats: [
      { ext: 'pdf', label: 'Download PDF', primary: true },
      { ext: 'odt', label: 'Download ODT', primary: false, title: odtDownloadTitle },
    ],
  },
  'trainer-guide': {
    folder: 'trainer-guide',
    fileBase: (slug: string) => `${slug}-trainer-guide`,
    formats: [
      { ext: 'pdf', label: 'Download PDF', primary: true },
      { ext: 'odt', label: 'Download ODT', primary: false, title: odtDownloadTitle },
    ],
  },
} as const;

function workshopMaterialPaths(slug: string, material: WorkshopMaterial) {
  const config = workshopMaterialConfig[material];
  const basename = config.fileBase(slug);
  const dir = path.join(websiteRoot, 'public', 'downloads', 'workshops', slug, config.folder);
  const urlBase = `/downloads/workshops/${slug}/${config.folder}/${basename}`;
  return { dir, basename, urlBase, formats: config.formats };
}

/** Download links for a workshop material (files live under public/downloads/workshops/{slug}/). */
export function workshopMaterialDownloads(
  slug: string,
  material: WorkshopMaterial,
): Array<{ href: string; label: string; primary: boolean; title?: string }> {
  const { dir, basename, urlBase, formats } = workshopMaterialPaths(slug, material);
  const fileBase = path.join(dir, basename);

  return formats.flatMap((format) => {
    const ext =
      fs.existsSync(`${fileBase}.${format.ext}`)
        ? format.ext
        : 'altExt' in format && format.altExt && fs.existsSync(`${fileBase}.${format.altExt}`)
          ? format.altExt
          : null;

    if (!ext) return [];

    return [{
      href: url(`${urlBase}.${ext}`),
      label: format.label,
      primary: format.primary,
      ...('title' in format && format.title ? { title: format.title } : {}),
    }];
  });
}

/** True when at least one file exists for this workshop material. */
export function workshopMaterialHasDownloads(slug: string, material: WorkshopMaterial): boolean {
  return workshopMaterialDownloads(slug, material).length > 0;
}
