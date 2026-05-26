/**
 * WCAG 2.2 AA contrast check for theme color pairs.
 * Run: npm run audit:contrast
 */

function luminance(r, g, b) {
  const channels = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function parseHex(hex) {
  const value = hex.replace('#', '');
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function contrast(foreground, background) {
  const l1 = luminance(...parseHex(foreground));
  const l2 = luminance(...parseHex(background));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const pairs = [
  { name: 'Body text on page background', fg: '#333333', bg: '#f8fafc' },
  { name: 'Muted text on page background', fg: '#64748b', bg: '#f8fafc' },
  { name: 'Muted text on surface', fg: '#64748b', bg: '#ffffff' },
  { name: 'Heading on page background', fg: '#334155', bg: '#f8fafc' },
  { name: 'Header nav on white', fg: '#475569', bg: '#ffffff' },
  { name: 'Link accent on white', fg: '#c94518', bg: '#ffffff' },
  { name: 'Link hover on white', fg: '#b8380f', bg: '#ffffff' },
  { name: 'Primary button text on accent', fg: '#ffffff', bg: '#c94518' },
  { name: 'Primary button text on accent hover', fg: '#ffffff', bg: '#b8380f' },
  { name: 'Hero lead on warm gradient', fg: '#475569', bg: '#ffe4d6' },
  { name: 'Hero number strip on warm gradient', fg: '#475569', bg: '#ffc9a3' },
  { name: 'Hero number emphasis on warm gradient', fg: '#334155', bg: '#ffc9a3' },
  { name: 'Badge label on badge background', fg: '#475569', bg: '#f1f5f9' },
  { name: 'Coming soon badge', fg: '#9a4b1a', bg: '#fff3e8' },
  { name: 'Preview badge', fg: '#1a6640', bg: '#e8f5ee' },
  { name: 'Focus text on focus background', fg: '#0b0c0c', bg: '#ffdd04' },
  { name: 'Section nav hover on soft accent', fg: '#b8380f', bg: '#ffe4d6' },
  { name: 'Path track label on white', fg: '#c94518', bg: '#ffffff' },
  { name: 'Footer text on page background', fg: '#64748b', bg: '#f8fafc' },
];

let failed = 0;

for (const { name, fg, bg } of pairs) {
  const ratio = contrast(fg, bg);
  const pass = ratio >= 4.5;
  const status = pass ? 'PASS' : 'FAIL';
  console.log(`${status} ${ratio.toFixed(2)}:1 — ${name}`);
  if (!pass) failed += 1;
}

if (failed > 0) {
  console.error(`\n${failed} pair(s) below WCAG AA (4.5:1) for normal text.`);
  process.exit(1);
}

console.log(`\nAll ${pairs.length} checked pairs meet WCAG AA (4.5:1).`);
