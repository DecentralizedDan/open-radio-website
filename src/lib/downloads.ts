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

function cheatSheetDir(slug: string) {
  return path.join(websiteRoot, 'public', 'downloads', 'cheat-sheets', slug);
}

/** Basename for files in public/downloads/cheat-sheets/{slug}/ (e.g. gmrs or gmrs-cheatsheet). */
function cheatSheetFileBasename(slug: string): string | null {
  const dir = cheatSheetDir(slug);
  if (!fs.existsSync(dir)) return null;

  for (const basename of [slug, `${slug}-cheatsheet`]) {
    const fileBase = path.join(dir, basename);
    if (fs.existsSync(`${fileBase}.pdf`) || fs.existsSync(`${fileBase}.odt`)) {
      return basename;
    }
  }

  return null;
}

/** Public download paths for a cheat sheet slug (files live under public/downloads/cheat-sheets/). */
export function cheatSheetDownloads(slug: string) {
  const basename = cheatSheetFileBasename(slug) ?? slug;
  const base = `/downloads/cheat-sheets/${slug}/${basename}`;
  return {
    pdf: url(`${base}.pdf`),
    odt: url(`${base}.odt`),
  };
}

/** Download buttons for cheat sheet files that exist on disk. */
export function cheatSheetDownloadLinks(
  slug: string,
): Array<{ href: string; label: string; primary: boolean; title?: string }> {
  const basename = cheatSheetFileBasename(slug);
  if (!basename) return [];

  const fileBase = path.join(cheatSheetDir(slug), basename);
  const urlBase = `/downloads/cheat-sheets/${slug}/${basename}`;
  const links: Array<{ href: string; label: string; primary: boolean; title?: string }> = [];

  if (fs.existsSync(`${fileBase}.pdf`)) {
    links.push({ href: url(`${urlBase}.pdf`), label: 'Download PDF', primary: true });
  }
  if (fs.existsSync(`${fileBase}.odt`)) {
    links.push({
      href: url(`${urlBase}.odt`),
      label: 'Download ODT',
      primary: false,
      title: odtDownloadTitle,
    });
  }

  return links;
}

/** True when at least one PDF or ODT exists for this slug under public/downloads/cheat-sheets/. */
export function cheatSheetHasDownloads(slug: string): boolean {
  return cheatSheetDownloadLinks(slug).length > 0;
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

const unitMaterialLabels: { material: WorkshopMaterial; label: string }[] = [
  { material: 'slides', label: 'Slides' },
  { material: 'handout', label: 'Handout' },
  { material: 'trainer-guide', label: 'Trainer guide' },
];

/** Primary download link per available workshop material (for compact list views). */
export function unitDownloads(
  slug: string,
): Array<{ href: string; label: string; primary: boolean; title?: string }> {
  return unitMaterialLabels.flatMap(({ material, label }) => {
    const downloads = workshopMaterialDownloads(slug, material);
    const primary = downloads.find((download) => download.primary) ?? downloads[0];
    if (!primary) return [];
    return [{ ...primary, label }];
  });
}

/** True when at least one workshop material file exists for this unit slug. */
export function unitHasDownloads(slug: string): boolean {
  return unitDownloads(slug).length > 0;
}
