import fs from 'node:fs';
import path from 'node:path';
import { url } from './paths';

const websiteRoot = process.cwd();

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

function workshopMaterialFileBase(slug: string, material: WorkshopMaterial): string {
  return path.join(websiteRoot, 'public', 'downloads', 'workshops', slug, material, slug);
}

/** Download links for a workshop material (files live under public/downloads/workshops/{slug}/{material}/). */
export function workshopMaterialDownloads(
  slug: string,
  material: WorkshopMaterial,
): Array<{ href: string; label: string; primary: boolean }> {
  const fileBase = workshopMaterialFileBase(slug, material);
  const urlBase = `/downloads/workshops/${slug}/${material}/${slug}`;

  const formats =
    material === 'slides'
      ? [
          { ext: 'pptx', label: 'Download PowerPoint', primary: true },
          { ext: 'pdf', label: 'Download PDF', primary: false },
          { ext: 'odp', label: 'Download OpenDocument', primary: false, altExt: 'ods' as const },
        ]
      : [
          { ext: 'pdf', label: 'Download PDF', primary: true },
          { ext: 'odt', label: 'Download ODT', primary: false },
        ];

  return formats.flatMap((format) => {
    const ext =
      fs.existsSync(`${fileBase}.${format.ext}`)
        ? format.ext
        : 'altExt' in format && format.altExt && fs.existsSync(`${fileBase}.${format.altExt}`)
          ? format.altExt
          : null;

    if (!ext) return [];

    return [{ href: url(`${urlBase}.${ext}`), label: format.label, primary: format.primary }];
  });
}

/** True when at least one file exists for this workshop material. */
export function workshopMaterialHasDownloads(slug: string, material: WorkshopMaterial): boolean {
  return workshopMaterialDownloads(slug, material).length > 0;
}
