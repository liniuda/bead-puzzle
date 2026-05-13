/**
 * Large pattern builders for levels 4-10
 * Each function returns a (string|null)[][] grid
 */
import {
  createGrid, fillRect, fillCircle, fillEllipse, fillTriangle,
  fillDiamond, mirrorH, drawLine, fillRing, strokeRect
} from './patternBuilder'

/** Level 4: 星之少女 (Star Girl) - 25x25, anime girl face */
export function buildStarGirl(): (string | null)[][] {
  const g = createGrid(25)
  // Hair (violet, large area)
  fillEllipse(g, 12, 10, 11, 10, 'V')
  // Face (skin)
  fillEllipse(g, 12, 12, 7, 8, 'S')
  // Hair bangs
  fillEllipse(g, 12, 5, 9, 4, 'V')
  fillRect(g, 3, 6, 4, 10, 'V')
  fillRect(g, 18, 6, 4, 10, 'V')
  // Eyes
  fillEllipse(g, 9, 12, 2, 2, 'B')
  fillEllipse(g, 15, 12, 2, 2, 'B')
  fillCircle(g, 9, 12, 1, 'K')
  fillCircle(g, 15, 12, 1, 'K')
  // Eye highlights
  fillRect(g, 8, 11, 1, 1, 'W')
  fillRect(g, 14, 11, 1, 1, 'W')
  // Mouth
  fillRect(g, 11, 16, 3, 1, 'P')
  // Blush
  fillCircle(g, 7, 14, 1, 'H')
  fillCircle(g, 17, 14, 1, 'H')
  // Star accessories in hair
  fillDiamond(g, 6, 4, 2, 2, 'Y')
  fillDiamond(g, 18, 4, 2, 2, 'Y')
  // Neck and shoulders
  fillRect(g, 10, 20, 5, 2, 'S')
  fillRect(g, 6, 22, 13, 3, 'C')
  return g
}

/** Level 5: 火焰精灵 (Flame Spirit) - 28x28, fire elemental */
export function buildFlameSpirit(): (string | null)[][] {
  const g = createGrid(28)
  // Body (orange core)
  fillEllipse(g, 14, 16, 7, 9, 'O')
  // Inner flame (yellow)
  fillEllipse(g, 14, 15, 5, 7, 'Y')
  // Hot core (white)
  fillEllipse(g, 14, 16, 3, 4, 'U')
  // Flame tips (red, going upward)
  fillTriangle(g, [14, 2], [10, 10], [18, 10], 'R')
  fillTriangle(g, [9, 4], [6, 12], [12, 11], 'O')
  fillTriangle(g, [19, 4], [16, 11], [22, 12], 'O')
  fillTriangle(g, [14, 0], [11, 7], [17, 7], 'Y')
  // Small side flames
  fillTriangle(g, [5, 10], [3, 16], [8, 15], 'R')
  fillTriangle(g, [23, 10], [20, 15], [25, 16], 'R')
  // Eyes (dark)
  fillEllipse(g, 11, 14, 2, 2, 'K')
  fillEllipse(g, 17, 14, 2, 2, 'K')
  fillRect(g, 11, 13, 1, 1, 'W')
  fillRect(g, 17, 13, 1, 1, 'W')
  // Mouth (smile)
  fillRect(g, 12, 18, 4, 1, 'R')
  // Bottom sparks
  fillCircle(g, 8, 24, 2, 'Q')
  fillCircle(g, 20, 24, 2, 'Q')
  fillCircle(g, 14, 26, 2, 'O')
  return g
}

/** Level 6: 森之守护 (Forest Guardian) - 32x32, tree spirit creature */
export function buildForestGuardian(): (string | null)[][] {
  const g = createGrid(32)
  // Tree trunk (brown)
  fillRect(g, 12, 18, 8, 14, 'N')
  // Main canopy (green)
  fillCircle(g, 16, 12, 10, 'G')
  // Lighter foliage spots
  fillCircle(g, 12, 8, 5, 'F')
  fillCircle(g, 20, 9, 4, 'F')
  fillCircle(g, 16, 6, 4, 'E')
  // Face on trunk
  fillEllipse(g, 16, 22, 4, 3, 'S')
  // Eyes
  fillCircle(g, 14, 21, 1, 'K')
  fillCircle(g, 18, 21, 1, 'K')
  fillRect(g, 14, 20, 1, 1, 'W')
  fillRect(g, 18, 20, 1, 1, 'W')
  // Mouth
  fillRect(g, 15, 24, 2, 1, 'N')
  // Roots
  fillTriangle(g, [12, 30], [8, 32], [14, 32], 'N')
  fillTriangle(g, [20, 30], [18, 32], [24, 32], 'N')
  // Mushrooms on trunk
  fillCircle(g, 10, 22, 2, 'R')
  fillRect(g, 10, 23, 1, 2, 'W')
  fillCircle(g, 22, 20, 2, 'R')
  fillRect(g, 22, 21, 1, 2, 'W')
  // Small flowers
  fillCircle(g, 8, 14, 1, 'P')
  fillCircle(g, 24, 11, 1, 'P')
  fillCircle(g, 13, 4, 1, 'Y')
  // Branches
  drawLine(g, 8, 16, 12, 18, 'N', 2)
  drawLine(g, 24, 16, 20, 18, 'N', 2)
  return g
}

/** Level 7: 月光城堡 (Moonlit Castle) - 36x36, castle under moon */
export function buildMoonlitCastle(): (string | null)[][] {
  const g = createGrid(36)
  // Sky background (dark blue)
  fillRect(g, 0, 0, 36, 24, 'I')
  // Moon
  fillCircle(g, 28, 7, 5, 'U')
  fillCircle(g, 30, 6, 4, 'I') // crescent cutout
  // Stars
  fillRect(g, 5, 3, 1, 1, 'W')
  fillRect(g, 10, 5, 1, 1, 'W')
  fillRect(g, 15, 2, 1, 1, 'W')
  fillRect(g, 20, 4, 1, 1, 'W')
  fillRect(g, 3, 8, 1, 1, 'W')
  fillRect(g, 8, 1, 1, 1, 'Y')
  fillRect(g, 33, 3, 1, 1, 'W')
  // Ground
  fillRect(g, 0, 24, 36, 12, 'G')
  fillRect(g, 0, 24, 36, 2, 'F')
  // Castle main body
  fillRect(g, 10, 14, 16, 14, 'D')
  // Castle towers
  fillRect(g, 7, 10, 6, 18, 'L')
  fillRect(g, 23, 10, 6, 18, 'L')
  // Tower tops (pointed)
  fillTriangle(g, [10, 5], [7, 10], [13, 10], 'V')
  fillTriangle(g, [26, 5], [23, 10], [29, 10], 'V')
  // Central tower
  fillRect(g, 15, 8, 6, 20, 'D')
  fillTriangle(g, [18, 3], [15, 8], [21, 8], 'V')
  // Windows
  fillRect(g, 16, 12, 2, 3, 'Y')
  fillRect(g, 19, 12, 2, 3, 'Y')
  fillRect(g, 9, 14, 2, 3, 'Y')
  fillRect(g, 25, 14, 2, 3, 'Y')
  // Door
  fillRect(g, 16, 24, 4, 4, 'N')
  fillEllipse(g, 18, 24, 2, 2, 'N')
  // Battlements
  for (let i = 0; i < 4; i++) {
    fillRect(g, 10 + i * 4, 13, 2, 2, 'L')
  }
  // Path to castle
  fillRect(g, 16, 28, 4, 8, 'L')
  return g
}

/** Level 8: 机械凤凰 (Mecha Phoenix) - 40x40, mechanical bird */
export function buildMechaPhoenix(): (string | null)[][] {
  const g = createGrid(40)
  // Body (metallic gray center)
  fillEllipse(g, 20, 20, 6, 8, 'D')
  fillEllipse(g, 20, 20, 4, 6, 'L')
  // Head
  fillCircle(g, 20, 10, 5, 'D')
  fillCircle(g, 20, 10, 3, 'L')
  // Beak
  fillTriangle(g, [20, 5], [18, 8], [22, 8], 'Y')
  // Eyes
  fillCircle(g, 18, 9, 1, 'R')
  fillCircle(g, 22, 9, 1, 'R')
  // Left wing (spread)
  fillTriangle(g, [14, 16], [0, 8], [6, 24], 'O')
  fillTriangle(g, [12, 18], [2, 12], [8, 22], 'Y')
  fillTriangle(g, [10, 17], [1, 10], [5, 20], 'R')
  // Right wing (mirror)
  fillTriangle(g, [26, 16], [40, 8], [34, 24], 'O')
  fillTriangle(g, [28, 18], [38, 12], [32, 22], 'Y')
  fillTriangle(g, [30, 17], [39, 10], [35, 20], 'R')
  // Tail feathers
  fillTriangle(g, [20, 28], [14, 38], [20, 36], 'R')
  fillTriangle(g, [20, 28], [20, 36], [26, 38], 'R')
  fillTriangle(g, [20, 30], [16, 37], [20, 35], 'O')
  fillTriangle(g, [20, 30], [20, 35], [24, 37], 'O')
  fillTriangle(g, [20, 31], [17, 36], [23, 36], 'Y')
  // Mechanical details (gear circles)
  fillRing(g, 20, 20, 5, 3, 'C')
  fillRing(g, 10, 15, 3, 2, 'B')
  fillRing(g, 30, 15, 3, 2, 'B')
  // Neck
  fillRect(g, 18, 14, 4, 4, 'D')
  drawLine(g, 19, 14, 19, 17, 'C', 1)
  drawLine(g, 21, 14, 21, 17, 'C', 1)
  // Crown crest
  fillTriangle(g, [20, 3], [18, 6], [22, 6], 'M')
  fillTriangle(g, [17, 4], [16, 7], [19, 7], 'V')
  fillTriangle(g, [23, 4], [21, 7], [24, 7], 'V')
  return g
}

/** Level 9: 龙之传说 (Dragon Legend) - 45x45, eastern dragon */
export function buildDragonLegend(): (string | null)[][] {
  const g = createGrid(45)
  // Serpentine body - series of connected ellipses
  const bodyPoints: [number, number, number, number][] = [
    [22, 10, 5, 4], // head area
    [18, 15, 4, 3],
    [14, 20, 4, 3],
    [12, 26, 4, 3],
    [15, 31, 4, 3],
    [20, 35, 4, 3],
    [26, 37, 4, 3],
    [32, 35, 4, 3],
    [36, 30, 3, 3],
    [38, 25, 3, 2],
  ]
  // Body segments (green scales)
  for (const [cx, cy, rx, ry] of bodyPoints) {
    fillEllipse(g, cx, cy, rx, ry, 'G')
    fillEllipse(g, cx, cy, rx - 1, ry - 1, 'T')
  }
  // Head (larger)
  fillEllipse(g, 22, 8, 6, 5, 'G')
  fillEllipse(g, 22, 8, 5, 4, 'T')
  // Horns
  fillTriangle(g, [18, 2], [17, 6], [20, 5], 'Y')
  fillTriangle(g, [26, 2], [24, 5], [27, 6], 'Y')
  // Eyes
  fillEllipse(g, 20, 8, 2, 2, 'R')
  fillEllipse(g, 25, 8, 2, 2, 'R')
  fillCircle(g, 20, 8, 1, 'K')
  fillCircle(g, 25, 8, 1, 'K')
  // Snout
  fillEllipse(g, 22, 12, 3, 2, 'F')
  fillRect(g, 21, 13, 1, 1, 'K')
  fillRect(g, 23, 13, 1, 1, 'K')
  // Whiskers
  drawLine(g, 18, 11, 12, 9, 'W', 1)
  drawLine(g, 26, 11, 32, 9, 'W', 1)
  // Dorsal spines
  const spinePoints: [number, number][] = [
    [22, 4], [19, 12], [15, 17], [12, 23], [14, 28], [19, 33], [25, 35], [31, 33], [35, 28]
  ]
  for (const [sx, sy] of spinePoints) {
    fillTriangle(g, [sx, sy - 3], [sx - 1, sy], [sx + 1, sy], 'R')
  }
  // Wings (small, eastern dragon style)
  fillTriangle(g, [10, 16], [4, 10], [8, 20], 'I')
  fillTriangle(g, [30, 16], [36, 10], [32, 20], 'I')
  fillTriangle(g, [9, 17], [5, 12], [8, 19], 'V')
  fillTriangle(g, [31, 17], [35, 12], [32, 19], 'V')
  // Claws
  fillRect(g, 11, 28, 2, 3, 'K')
  fillRect(g, 24, 38, 2, 3, 'K')
  // Tail tip (fire)
  fillCircle(g, 40, 23, 3, 'O')
  fillCircle(g, 40, 23, 2, 'Y')
  // Cloud decorations
  fillEllipse(g, 6, 5, 4, 2, 'W')
  fillEllipse(g, 38, 6, 3, 2, 'W')
  fillEllipse(g, 5, 38, 3, 2, 'W')
  fillEllipse(g, 40, 40, 4, 2, 'W')
  return g
}

/** Level 10: 星空祭典 (Star Festival) - 50x50, festival scene with fireworks */
export function buildStarFestival(): (string | null)[][] {
  const g = createGrid(50)
  // Night sky
  fillRect(g, 0, 0, 50, 35, 'I')
  // Ground/street
  fillRect(g, 0, 35, 50, 15, 'D')
  fillRect(g, 0, 35, 50, 2, 'N')
  // Street path
  fillRect(g, 20, 37, 10, 13, 'L')

  // Buildings (silhouettes)
  fillRect(g, 0, 20, 8, 17, 'K')
  fillRect(g, 9, 22, 7, 15, 'K')
  fillRect(g, 35, 18, 7, 19, 'K')
  fillRect(g, 43, 22, 7, 15, 'K')
  // Building windows (lit)
  for (let i = 0; i < 3; i++) {
    fillRect(g, 2, 22 + i * 4, 2, 2, 'Y')
    fillRect(g, 5, 22 + i * 4, 2, 2, 'Y')
    fillRect(g, 11, 24 + i * 4, 2, 2, 'U')
    fillRect(g, 37, 20 + i * 4, 2, 2, 'Y')
    fillRect(g, 40, 20 + i * 4, 2, 2, 'Y')
    fillRect(g, 45, 24 + i * 4, 2, 2, 'U')
  }

  // Torii gate (red)
  fillRect(g, 21, 36, 2, 10, 'R')
  fillRect(g, 27, 36, 2, 10, 'R')
  fillRect(g, 19, 35, 12, 2, 'R')
  fillRect(g, 20, 38, 10, 1, 'R')

  // Firework 1 (top left, pink burst)
  fillCircle(g, 12, 8, 5, 'P')
  fillCircle(g, 12, 8, 3, 'M')
  fillCircle(g, 12, 8, 1, 'W')
  drawLine(g, 12, 3, 12, 0, 'P', 1)
  drawLine(g, 7, 5, 5, 3, 'P', 1)
  drawLine(g, 17, 5, 19, 3, 'P', 1)
  drawLine(g, 7, 11, 5, 13, 'P', 1)
  drawLine(g, 17, 11, 19, 13, 'P', 1)

  // Firework 2 (top right, gold burst)
  fillCircle(g, 38, 6, 4, 'Y')
  fillCircle(g, 38, 6, 2, 'U')
  fillCircle(g, 38, 6, 1, 'W')
  drawLine(g, 38, 1, 38, 0, 'Y', 1)
  drawLine(g, 34, 4, 32, 2, 'Y', 1)
  drawLine(g, 42, 4, 44, 2, 'Y', 1)
  drawLine(g, 34, 9, 32, 11, 'Y', 1)
  drawLine(g, 42, 9, 44, 11, 'Y', 1)

  // Firework 3 (center, blue-cyan)
  fillCircle(g, 25, 5, 4, 'C')
  fillCircle(g, 25, 5, 2, 'B')
  fillCircle(g, 25, 5, 1, 'W')
  drawLine(g, 25, 0, 25, 0, 'C', 1)
  drawLine(g, 21, 3, 19, 1, 'C', 1)
  drawLine(g, 29, 3, 31, 1, 'C', 1)

  // Firework 4 (smaller, green)
  fillCircle(g, 6, 15, 3, 'F')
  fillCircle(g, 6, 15, 1, 'E')

  // Firework 5 (smaller, orange)
  fillCircle(g, 44, 14, 3, 'O')
  fillCircle(g, 44, 14, 1, 'Q')

  // Lanterns (hanging)
  fillCircle(g, 18, 30, 2, 'R')
  fillCircle(g, 32, 30, 2, 'R')
  fillRect(g, 18, 28, 1, 2, 'K')
  fillRect(g, 32, 28, 1, 2, 'K')

  // Festival stalls (bottom)
  fillRect(g, 2, 38, 8, 6, 'O')
  strokeRect(g, 2, 38, 8, 6, 'N', 1)
  fillRect(g, 40, 38, 8, 6, 'C')
  strokeRect(g, 40, 38, 8, 6, 'N', 1)

  // People (simple pixel figures)
  // Person 1
  fillCircle(g, 15, 40, 1, 'S')
  fillRect(g, 14, 42, 2, 3, 'V')
  // Person 2
  fillCircle(g, 35, 41, 1, 'S')
  fillRect(g, 34, 43, 2, 3, 'B')
  // Person 3
  fillCircle(g, 25, 42, 1, 'S')
  fillRect(g, 24, 44, 2, 3, 'P')

  // Stars scattered
  const starPositions = [
    [3, 2], [8, 4], [15, 1], [20, 3], [30, 2], [35, 1], [45, 3], [47, 7],
    [2, 10], [48, 10], [22, 15], [28, 14], [16, 18], [33, 17]
  ]
  for (const [sx, sy] of starPositions) {
    if (g[sy]?.[sx] === 'I') { // only on sky
      g[sy][sx] = 'W'
    }
  }

  return g
}
