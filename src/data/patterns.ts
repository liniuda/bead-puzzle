// Color definitions for bead pixel art - high contrast palette
export const BEAD_COLORS: Record<string, string> = {
  'R': '#DC2626',   // red (deep)
  'P': '#DB2777',   // pink (hot pink)
  'O': '#F97316',   // orange (vivid)
  'Y': '#F59E0B',   // yellow (amber)
  'G': '#16A34A',   // green (forest)
  'T': '#0D9488',   // teal (deep)
  'B': '#2563EB',   // blue (royal)
  'V': '#7C3AED',   // violet (deep purple)
  'N': '#78350F',   // brown (dark chocolate)
  'K': '#0F172A',   // black (near black)
  'W': '#FFFFFF',   // white (pure)
  'S': '#F5A623',   // skin/peach (warm tan)
  'D': '#374151',   // dark gray (charcoal)
  'L': '#E5E7EB',   // light gray (silver)
  'C': '#0891B2',   // cyan (deep sky)
  'M': '#E11D48',   // magenta (crimson rose)
  'I': '#4338CA',   // indigo (deep)
  'F': '#15803D',   // fresh green (emerald)
  'H': '#FDA4AF',   // light pink (salmon)
  'U': '#FCD34D',   // light yellow (gold)
  'Q': '#8B4513',   // saddle brown (outline)
  'E': '#65A30D',   // lime (olive green)
}

export interface PuzzleLevel {
  id: string
  name: string
  theme: string
  icon: string
  size: number
  grid: (string | null)[][]
  order: number
  difficulty: number
  removeRatio: number
  wrongBeadRatio: number
  traySlots: number
}

// Shiba Inu dog (20x20) - cute rounded pixel art
const shibaLevel: PuzzleLevel = {
  id: 'shiba',
  name: '柴犬',
  theme: '动物',
  icon: '🐕',
  size: 20,
  order: 1,
  difficulty: 1,
  removeRatio: 0.10,
  wrongBeadRatio: 0.10,
  traySlots: 8,
  grid: [
    [null,null,null,null,null,'Q','Q','Q',null,null,null,null,null,'Q','Q','Q',null,null,null,null],
    [null,null,null,null,'Q','O','O','Q','Q',null,null,null,'Q','O','O','O','Q',null,null,null],
    [null,null,null,'Q','O','O','O','O','Q',null,null,null,'Q','O','O','O','O','Q',null,null],
    [null,null,'Q','O','O','O','O','O','Q',null,null,null,null,'Q','O','O','O','O','Q',null],
    [null,null,'Q','O','O','O','O','O','O','Q','Q','Q','Q','O','O','O','O','O','Q',null],
    [null,null,null,'Q','O','O','O','O','O','O','O','O','O','O','O','O','O','O','Q',null],
    [null,null,null,'Q','O','O','O','O','O','O','O','O','O','O','O','O','O','Q',null,null],
    [null,null,null,'Q','O','O','K','K','O','O','O','O','O','K','K','O','O','Q',null,null],
    [null,null,null,'Q','O','O','K','W','K','O','O','O','K','W','K','O','O','Q',null,null],
    [null,null,null,'Q','O','O','K','K','O','W','W','W','O','K','K','O','O','Q',null,null],
    [null,null,null,'Q','W','W','O','O','W','W','K','W','W','O','O','W','W','Q',null,null],
    [null,null,null,'Q','W','W','W','W','W','W','K','W','W','W','W','W','W','Q',null,null],
    [null,null,null,null,'Q','W','W','W','W','W','W','W','W','W','W','W','Q',null,null,null],
    [null,null,null,null,'Q','O','W','W','W','W','W','W','W','W','W','O','Q',null,null,null],
    [null,null,null,null,null,'Q','O','O','W','W','W','W','W','O','O','Q',null,null,null,null],
    [null,null,null,null,null,'Q','O','O','O','O','O','O','O','O','O','Q',null,null,null,null],
    [null,null,null,null,null,null,'Q','O','O','O','O','O','O','O','Q',null,null,null,null,null],
    [null,null,null,null,null,null,'Q','O','O','Q','Q','Q','O','O','Q',null,null,null,null,null],
    [null,null,null,null,null,null,'Q','Q','Q',null,null,null,'Q','Q','Q',null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  ],
}

// Pirate cat with sunglasses (20x20)
const pirateCatLevel: PuzzleLevel = {
  id: 'pirate-cat',
  name: '海盗猫',
  theme: '动漫',
  icon: '🏴‍☠️',
  size: 20,
  order: 3,
  difficulty: 2,
  removeRatio: 0.15,
  wrongBeadRatio: 0.18,
  traySlots: 12,
  grid: [
    [null,null,null,null,null,null,'K','K','K','K','K','K','K','K',null,null,null,null,null,null],
    [null,null,null,null,null,'K','R','R','R','R','R','R','R','R','K',null,null,null,null,null],
    [null,null,null,null,'K','R','R','R','R','R','R','R','R','R','R','K',null,null,null,null],
    [null,null,null,'K','D','D','D','D','D','D','D','D','D','D','D','D','K',null,null,null],
    [null,null,'K','D','D','D','D','D','D','D','D','D','D','D','D','D','D','K',null,null],
    [null,null,'K','C','C','C','C','C','C','C','C','C','C','C','C','C','C','K',null,null],
    [null,'K','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','C','K',null],
    [null,'K','C','C','K','K','K','C','C','C','C','C','K','K','K','C','C','C','K',null],
    [null,'K','C','K','V','V','V','K','C','C','C','K','O','O','O','K','C','C','K',null],
    [null,'K','C','K','V','K','V','K','C','C','C','K','O','K','O','K','C','C','K',null],
    [null,'K','C','C','K','K','K','C','C','K','C','C','K','K','K','C','C','C','K',null],
    [null,'K','C','C','C','C','C','C','C','K','C','C','C','C','C','C','C','C','K',null],
    [null,'K','C','C','C','C','C','C','K','K','K','C','C','C','C','C','C','C','K',null],
    [null,null,'K','C','C','C','M','M','M','M','M','M','M','C','C','C','C','K',null,null],
    [null,null,'K','C','C','C','C','M','M','M','M','M','C','C','C','C','C','K',null,null],
    [null,null,null,'K','C','C','C','C','C','C','C','C','C','C','C','C','K',null,null,null],
    [null,null,null,null,'K','C','C','C','C','C','C','C','C','C','C','K',null,null,null,null],
    [null,null,null,null,null,'K','K','C','C','C','C','C','C','K','K',null,null,null,null,null],
    [null,null,null,null,null,null,null,'K','K','K','K','K','K',null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  ],
}

// Cute panda (20x20)
const pandaLevel: PuzzleLevel = {
  id: 'panda',
  name: '熊猫',
  theme: '动物',
  icon: '🐼',
  size: 20,
  order: 2,
  difficulty: 1,
  removeRatio: 0.12,
  wrongBeadRatio: 0.15,
  traySlots: 10,
  grid: [
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    [null,null,null,'K','K','K',null,null,null,null,null,null,null,null,'K','K','K',null,null,null],
    [null,null,'K','K','K','K','K',null,null,null,null,null,null,'K','K','K','K','K',null,null],
    [null,null,'K','K','K','K','K',null,null,null,null,null,null,'K','K','K','K','K',null,null],
    [null,null,null,'K','K','K','W','W','W','W','W','W','W','W','K','K','K',null,null,null],
    [null,null,null,null,'W','W','W','W','W','W','W','W','W','W','W','W',null,null,null,null],
    [null,null,null,'W','W','W','W','W','W','W','W','W','W','W','W','W','W',null,null,null],
    [null,null,null,'W','W','W','K','K','K','W','W','W','K','K','K','W','W',null,null,null],
    [null,null,null,'W','W','K','K','W','K','K','W','K','K','W','K','K','W',null,null,null],
    [null,null,null,'W','W','K','K','K','K','K','W','K','K','K','K','K','W',null,null,null],
    [null,null,null,'W','W','W','K','K','K','W','W','W','K','K','K','W','W',null,null,null],
    [null,null,null,'W','W','W','W','W','W','K','K','W','W','W','W','W','W',null,null,null],
    [null,null,null,'W','W','W','W','W','W','K','K','W','W','W','W','W','W',null,null,null],
    [null,null,null,null,'W','W','W','H','H','H','H','H','H','W','W','W',null,null,null,null],
    [null,null,null,null,'W','W','W','W','H','H','H','H','W','W','W','W',null,null,null,null],
    [null,null,null,null,null,'W','W','W','W','W','W','W','W','W','W',null,null,null,null,null],
    [null,null,null,null,null,null,'W','W','W','W','W','W','W','W',null,null,null,null,null,null],
    [null,null,null,null,null,null,null,'K','K','W','W','K','K',null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,'K','K',null,null,'K','K',null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
  ],
}

export const SMALL_LEVELS: PuzzleLevel[] = [
  shibaLevel,
  pandaLevel,
  pirateCatLevel,
]
