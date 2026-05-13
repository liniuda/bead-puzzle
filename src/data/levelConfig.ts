/**
 * Central level registry: 10 levels with difficulty progression
 */
import { type PuzzleLevel, SMALL_LEVELS, BEAD_COLORS } from './patterns'
import {
  buildStarGirl,
  buildFlameSpirit,
  buildForestGuardian,
  buildMoonlitCastle,
  buildMechaPhoenix,
  buildDragonLegend,
  buildStarFestival,
} from './largePatterns'

// Lazily compute large grids (only when level is selected)
const gridCache = new Map<string, (string | null)[][]>()

function getOrBuildGrid(id: string, builder: () => (string | null)[][]): (string | null)[][] {
  if (!gridCache.has(id)) {
    gridCache.set(id, builder())
  }
  return gridCache.get(id)!
}

// Large levels (4-10) defined with builders
const largeLevelDefs: Omit<PuzzleLevel, 'grid'>[] = [
  {
    id: 'star-girl',
    name: '星之少女',
    theme: '动漫',
    icon: '⭐',
    size: 25,
    order: 4,
    difficulty: 3,
    removeRatio: 0.15,
    wrongBeadRatio: 0.20,
    traySlots: 14,
  },
  {
    id: 'flame-spirit',
    name: '火焰精灵',
    theme: '动漫',
    icon: '🔥',
    size: 28,
    order: 5,
    difficulty: 3,
    removeRatio: 0.18,
    wrongBeadRatio: 0.22,
    traySlots: 16,
  },
  {
    id: 'forest-guardian',
    name: '森之守护',
    theme: '幻想',
    icon: '🌳',
    size: 32,
    order: 6,
    difficulty: 4,
    removeRatio: 0.18,
    wrongBeadRatio: 0.25,
    traySlots: 18,
  },
  {
    id: 'moonlit-castle',
    name: '月光城堡',
    theme: '幻想',
    icon: '🏰',
    size: 36,
    order: 7,
    difficulty: 4,
    removeRatio: 0.20,
    wrongBeadRatio: 0.25,
    traySlots: 20,
  },
  {
    id: 'mecha-phoenix',
    name: '机械凤凰',
    theme: '机甲',
    icon: '🦅',
    size: 40,
    order: 8,
    difficulty: 5,
    removeRatio: 0.22,
    wrongBeadRatio: 0.28,
    traySlots: 22,
  },
  {
    id: 'dragon-legend',
    name: '龙之传说',
    theme: '幻想',
    icon: '🐉',
    size: 45,
    order: 9,
    difficulty: 5,
    removeRatio: 0.22,
    wrongBeadRatio: 0.30,
    traySlots: 24,
  },
  {
    id: 'star-festival',
    name: '星空祭典',
    theme: '祭典',
    icon: '🎆',
    size: 50,
    order: 10,
    difficulty: 5,
    removeRatio: 0.25,
    wrongBeadRatio: 0.30,
    traySlots: 28,
  },
]

const builders: Record<string, () => (string | null)[][]> = {
  'star-girl': buildStarGirl,
  'flame-spirit': buildFlameSpirit,
  'forest-guardian': buildForestGuardian,
  'moonlit-castle': buildMoonlitCastle,
  'mecha-phoenix': buildMechaPhoenix,
  'dragon-legend': buildDragonLegend,
  'star-festival': buildStarFestival,
}

// Assemble all 10 levels
function buildAllLevels(): PuzzleLevel[] {
  // Levels 1-3 from hand-crafted patterns
  const levels: PuzzleLevel[] = [...SMALL_LEVELS]

  // Levels 4-10 from builders
  for (const def of largeLevelDefs) {
    const grid = getOrBuildGrid(def.id, builders[def.id])
    levels.push({ ...def, grid } as PuzzleLevel)
  }

  // Sort by order
  levels.sort((a, b) => a.order - b.order)
  return levels
}

export const LEVELS: PuzzleLevel[] = buildAllLevels()
export { BEAD_COLORS, type PuzzleLevel } from './patterns'
