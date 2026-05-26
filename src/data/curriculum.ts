export type License = 'none' | 'technician' | 'general';
export type UnitType = 'workshop' | 'activity';
export type Track = 'phone' | 'digital' | 'activities';

export interface Unit {
  slug: string;
  title: string;
  track: Track;
  type: UnitType;
  license: License;
  description: string;
  duration: string;
  featured?: boolean;
  featuredActivity?: boolean;
  ready?: boolean;
  cheatSheets?: string[];
}

export interface CheatSheet {
  slug: string;
  title: string;
  description: string;
}

export const site = {
  name: 'Free Ham Radio Curriculum',
  tagline: 'Free Ham radio workshop and activity curriculum',
  description:
    'Take learners from no radio experience to confident HF operation with free, open source curriculum that any experienced Ham can lead.',
};

export const phoneTrack: Unit[] = [
  {
    slug: 'emergency-radio-101',
    title: 'Emergency Radio 101',
    track: 'phone',
    type: 'workshop',
    license: 'none',
    description:
      'Case studies of disasters and how civilians used radio to cope with them.',
    duration: '60–90 min',
    featured: true,
    ready: true,
    cheatSheets: ['message-passing'],
  },
  {
    slug: 'gmrs-101',
    title: 'GMRS 101',
    track: 'phone',
    type: 'workshop',
    license: 'none',
    description: 'GMRS overview with a gentle focus on limitations vs. Ham radio.',
    duration: '60–90 min',
    cheatSheets: ['gmrs'],
  },
  {
    slug: 'ham-101',
    title: 'Ham 101',
    track: 'phone',
    type: 'workshop',
    license: 'none',
    description:
      'A general introduction, including VHF, UHF, and HF, and the licensing process.',
    duration: '60–90 min',
  },
  {
    slug: 'ham-ht-practical-skills',
    title: 'Ham HT Practical Skills',
    track: 'phone',
    type: 'workshop',
    license: 'technician',
    description:
      'Programming HTs with CHIRP and VFO, getting on the air, and hitting repeaters.',
    duration: '60–90 min',
    cheatSheets: ['uhf-vhf-ham'],
  },
  {
    slug: 'ham-201',
    title: 'Ham 201',
    track: 'phone',
    type: 'workshop',
    license: 'technician',
    description:
      'Propagation, band plans, comparing antennas, and an introduction to digital modes.',
    duration: '60–90 min',
    cheatSheets: ['uhf-vhf-ham'],
  },
  {
    slug: 'ham-hf-practical-skills',
    title: 'Ham HF Practical Skills',
    track: 'phone',
    type: 'workshop',
    license: 'general',
    description: 'Getting new Hams on HF and using best practices to make one QSO.',
    duration: '60–90 min',
    featured: true,
    cheatSheets: ['hf-phone'],
  },
];

export const digitalTrack: Unit[] = [
  {
    slug: 'mesh-networks-101',
    title: 'Mesh Networks 101',
    track: 'digital',
    type: 'workshop',
    license: 'none',
    description:
      'Meshtastic and Meshcore overview with a focus on emcomms and Ham digital modes.',
    duration: '60–90 min',
    cheatSheets: ['amateur-digital-operation'],
  },
  {
    slug: 'digital-radio-101',
    title: 'Digital Radio 101',
    track: 'digital',
    type: 'workshop',
    license: 'none',
    description:
      'Introduction to Ham digital modes: FT8, Winlink, APRS, packet BBS, and more.',
    duration: '60–90 min',
    featured: true,
    cheatSheets: ['amateur-digital-operation'],
  },
  {
    slug: 'digital-radio-practical-skills',
    title: 'Digital Radio Practical Skills',
    track: 'digital',
    type: 'workshop',
    license: 'technician',
    description: 'Getting new Hams doing digital operations with HTs and SDRs.',
    duration: '60–90 min',
    cheatSheets: ['amateur-digital-operation'],
  },
  {
    slug: 'long-distance-digital-qso-practical-skills',
    title: 'Long Distance Digital QSO Practical Skills',
    track: 'digital',
    type: 'workshop',
    license: 'general',
    description: 'Getting new Hams QSOs on the air, from 10 meters and up.',
    duration: '60–90 min',
    cheatSheets: ['hf-digital'],
  },
];

export const activities: Unit[] = [
  {
    slug: 'radio-practical-skills',
    title: 'Radio Practical Skills',
    track: 'activities',
    type: 'activity',
    license: 'none',
    description: 'Using best practices to communicate on the air with FRS radios.',
    duration: '60–90 min',
    featuredActivity: true,
    cheatSheets: ['uhf-vhf-ham'],
  },
  {
    slug: 'mesh-network-practical-skills',
    title: 'Mesh Network Practical Skills',
    track: 'activities',
    type: 'activity',
    license: 'none',
    description:
      'Assembling, setting up, and using your own mesh network device. No license required.',
    duration: '60–90 min',
  },
  {
    slug: 'how-to-host-a-neighborhood-net',
    title: 'How to Host a Neighborhood Net',
    track: 'activities',
    type: 'activity',
    license: 'none',
    description:
      'Guiding a group through holding their own net, including real-time troubleshooting.',
    duration: '60–90 min',
    featuredActivity: true,
    cheatSheets: ['message-passing'],
  },
  {
    slug: 'pace-planning',
    title: 'PACE Planning',
    track: 'activities',
    type: 'activity',
    license: 'none',
    description:
      'Developing a Primary, Alternate, Contingency, and Emergency communications plan.',
    duration: '60–90 min',
    cheatSheets: ['message-passing'],
  },
  {
    slug: 'fox-hunt',
    title: 'Fox Hunt',
    track: 'activities',
    type: 'activity',
    license: 'none',
    description:
      'Find a hidden transmitter — learn about radio waves, antennas, and reception.',
    duration: '60–90 min',
    featuredActivity: true,
  },
];

export const allUnits: Unit[] = [...phoneTrack, ...digitalTrack, ...activities];

export const cheatSheets: CheatSheet[] = [
  {
    slug: 'gmrs',
    title: 'GMRS',
    description: 'Quick reference for GMRS operation.',
  },
  {
    slug: 'uhf-vhf-ham',
    title: 'UHF/VHF Ham',
    description: 'Getting on the air with a handheld on VHF and UHF.',
  },
  {
    slug: 'hf-phone',
    title: 'HF Phone',
    description: 'HF voice operating essentials.',
  },
  {
    slug: 'hf-digital',
    title: 'HF Digital',
    description: 'HF digital mode quick reference.',
  },
  {
    slug: 'amateur-digital-operation',
    title: 'Amateur Digital Operation',
    description: 'Digital modes overview for new operators.',
  },
  {
    slug: 'message-passing',
    title: 'Message Passing',
    description: 'Structured message handling for emcomm.',
  },
];

export function licenseLabel(license: License): string {
  switch (license) {
    case 'none':
      return 'No license needed';
    case 'technician':
      return 'Technician';
    case 'general':
      return 'General';
  }
}

export function trackLabel(track: Track): string {
  switch (track) {
    case 'phone':
      return 'Phone';
    case 'digital':
      return 'Digital';
    case 'activities':
      return 'Activities';
  }
}

export function unitPath(unit: Unit): string {
  return `/curriculum/${unit.track}/${unit.slug}/`;
}

export function getUnit(track: Track, slug: string): Unit | undefined {
  const list =
    track === 'phone' ? phoneTrack : track === 'digital' ? digitalTrack : activities;
  return list.find((u) => u.slug === slug);
}

export function getAdjacentUnits(unit: Unit): {
  prev?: Unit;
  next?: Unit;
} {
  if (unit.track === 'activities') return {};
  const list = unit.track === 'phone' ? phoneTrack : digitalTrack;
  const index = list.findIndex((u) => u.slug === unit.slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function getCheatSheet(slug: string): CheatSheet | undefined {
  return cheatSheets.find((s) => s.slug === slug);
}
