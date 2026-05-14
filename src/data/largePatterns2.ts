/**
 * Large pattern builders for levels 11-20
 * Progressively larger and more complex designs
 */
import {
  createGrid, fillRect, fillCircle, fillEllipse, fillTriangle,
  fillDiamond, drawLine, fillRing, strokeRect
} from './patternBuilder'

/** Level 11: 海洋精灵 (Ocean Spirit) - 25x25 */
export function buildOceanSpirit(): (string | null)[][] {
  const g = createGrid(25)
  // Water background
  fillRect(g, 0, 0, 25, 25, 'B')
  // Body (fish-mermaid)
  fillEllipse(g, 12, 12, 6, 5, 'C')
  fillEllipse(g, 12, 12, 5, 4, 'T')
  // Head
  fillCircle(g, 12, 6, 4, 'S')
  // Hair (flowing)
  fillEllipse(g, 12, 4, 5, 3, 'V')
  fillTriangle(g, [7, 4], [4, 8], [8, 7], 'V')
  fillTriangle(g, [17, 4], [16, 7], [20, 8], 'V')
  // Eyes
  fillCircle(g, 10, 6, 1, 'B')
  fillCircle(g, 14, 6, 1, 'B')
  fillRect(g, 10, 5, 1, 1, 'W')
  fillRect(g, 14, 5, 1, 1, 'W')
  // Tail
  fillTriangle(g, [12, 17], [6, 22], [12, 21], 'C')
  fillTriangle(g, [12, 17], [12, 21], [18, 22], 'C')
  fillTriangle(g, [12, 18], [8, 21], [16, 21], 'T')
  // Fins
  fillTriangle(g, [6, 11], [2, 9], [5, 14], 'T')
  fillTriangle(g, [18, 11], [19, 14], [22, 9], 'T')
  // Bubbles
  fillCircle(g, 3, 3, 1, 'W')
  fillCircle(g, 21, 2, 1, 'W')
  fillCircle(g, 5, 18, 1, 'W')
  fillCircle(g, 20, 20, 1, 'W')
  // Seaweed
  drawLine(g, 1, 25, 2, 18, 'G', 1)
  drawLine(g, 23, 25, 22, 19, 'G', 1)
  return g
}

/** Level 12: 蒸汽机器人 (Steam Robot) - 28x28 */
export function buildSteamRobot(): (string | null)[][] {
  const g = createGrid(28)
  // Body (main torso)
  fillRect(g, 9, 10, 10, 10, 'D')
  strokeRect(g, 9, 10, 10, 10, 'K', 1)
  // Head
  fillRect(g, 10, 4, 8, 6, 'L')
  strokeRect(g, 10, 4, 8, 6, 'K', 1)
  // Antenna
  fillRect(g, 13, 1, 2, 3, 'D')
  fillCircle(g, 14, 1, 1, 'R')
  // Eyes (glowing)
  fillRect(g, 12, 6, 2, 2, 'C')
  fillRect(g, 16, 6, 2, 2, 'C')
  fillRect(g, 12, 6, 1, 1, 'W')
  fillRect(g, 16, 6, 1, 1, 'W')
  // Mouth (grill)
  fillRect(g, 12, 8, 4, 1, 'K')
  // Arms
  fillRect(g, 5, 11, 4, 3, 'D')
  fillRect(g, 19, 11, 4, 3, 'D')
  fillCircle(g, 5, 15, 2, 'L')
  fillCircle(g, 23, 15, 2, 'L')
  // Legs
  fillRect(g, 11, 20, 3, 5, 'D')
  fillRect(g, 15, 20, 3, 5, 'D')
  fillRect(g, 10, 25, 4, 2, 'K')
  fillRect(g, 14, 25, 4, 2, 'K')
  // Chest panel
  fillRect(g, 12, 12, 4, 4, 'K')
  fillCircle(g, 14, 14, 1, 'R')
  // Gears on body
  fillRing(g, 11, 17, 2, 1, 'Y')
  fillRing(g, 17, 17, 2, 1, 'Y')
  // Steam pipes
  fillRect(g, 8, 5, 2, 1, 'D')
  fillRect(g, 18, 5, 2, 1, 'D')
  fillCircle(g, 7, 4, 1, 'W')
  fillCircle(g, 20, 3, 1, 'W')
  return g
}

/** Level 13: 樱花树 (Cherry Blossom) - 30x30 */
export function buildCherryBlossom(): (string | null)[][] {
  const g = createGrid(30)
  // Sky
  fillRect(g, 0, 0, 30, 22, 'H')
  // Ground
  fillRect(g, 0, 22, 30, 8, 'G')
  fillRect(g, 0, 22, 30, 2, 'F')
  // Trunk
  fillRect(g, 13, 14, 4, 12, 'N')
  drawLine(g, 15, 14, 20, 10, 'N', 2)
  drawLine(g, 14, 14, 8, 9, 'N', 2)
  drawLine(g, 13, 17, 8, 15, 'N', 1)
  drawLine(g, 16, 16, 22, 13, 'N', 1)
  // Main canopy (pink blossoms)
  fillCircle(g, 15, 8, 7, 'P')
  fillCircle(g, 9, 7, 5, 'P')
  fillCircle(g, 21, 7, 5, 'P')
  fillCircle(g, 7, 11, 4, 'P')
  fillCircle(g, 23, 11, 4, 'P')
  // Lighter pink spots
  fillCircle(g, 12, 5, 3, 'H')
  fillCircle(g, 18, 6, 3, 'H')
  fillCircle(g, 8, 9, 2, 'H')
  fillCircle(g, 22, 9, 2, 'H')
  // White highlights
  fillCircle(g, 14, 4, 2, 'W')
  fillCircle(g, 20, 5, 1, 'W')
  // Falling petals
  fillRect(g, 4, 16, 1, 1, 'P')
  fillRect(g, 7, 19, 1, 1, 'P')
  fillRect(g, 24, 15, 1, 1, 'P')
  fillRect(g, 26, 18, 1, 1, 'P')
  fillRect(g, 10, 20, 1, 1, 'P')
  fillRect(g, 21, 17, 1, 1, 'H')
  // Small flowers on ground
  fillCircle(g, 5, 24, 1, 'P')
  fillCircle(g, 25, 25, 1, 'P')
  fillCircle(g, 12, 26, 1, 'H')
  return g
}

/** Level 14: 太空飞船 (Spaceship) - 32x32 */
export function buildSpaceship(): (string | null)[][] {
  const g = createGrid(32)
  // Space background
  fillRect(g, 0, 0, 32, 32, 'K')
  // Stars
  const stars = [[3,2],[7,5],[1,10],[28,3],[25,7],[30,12],[5,25],[27,27],[15,1],[20,28],[2,20],[29,20]]
  for (const [x, y] of stars) {
    if (g[y]?.[x] !== undefined) g[y][x] = 'W'
  }
  // Ship body (wedge shape)
  fillTriangle(g, [16, 6], [6, 24], [26, 24], 'D')
  fillTriangle(g, [16, 8], [8, 22], [24, 22], 'L')
  // Cockpit
  fillEllipse(g, 16, 12, 3, 2, 'C')
  fillEllipse(g, 16, 12, 2, 1, 'W')
  // Wings
  fillTriangle(g, [6, 20], [0, 26], [8, 24], 'B')
  fillTriangle(g, [26, 20], [24, 24], [32, 26], 'B')
  // Engine glow
  fillRect(g, 12, 24, 2, 3, 'O')
  fillRect(g, 15, 24, 2, 3, 'O')
  fillRect(g, 18, 24, 2, 3, 'O')
  fillRect(g, 13, 27, 1, 2, 'Y')
  fillRect(g, 16, 27, 1, 2, 'Y')
  fillRect(g, 19, 27, 1, 2, 'Y')
  // Details
  drawLine(g, 10, 16, 16, 10, 'C', 1)
  drawLine(g, 22, 16, 16, 10, 'C', 1)
  fillRing(g, 16, 18, 2, 1, 'V')
  // Planet in background
  fillCircle(g, 5, 6, 3, 'O')
  fillCircle(g, 6, 5, 2, 'Y')
  return g
}

/** Level 15: 海底城市 (Underwater City) - 35x35 */
export function buildUnderwaterCity(): (string | null)[][] {
  const g = createGrid(35)
  // Ocean gradient
  fillRect(g, 0, 0, 35, 12, 'B')
  fillRect(g, 0, 12, 35, 12, 'I')
  fillRect(g, 0, 24, 35, 11, 'K')
  // Sea floor
  fillRect(g, 0, 30, 35, 5, 'N')
  // Dome building 1
  fillEllipse(g, 10, 20, 6, 5, 'C')
  fillRect(g, 5, 20, 10, 8, 'C')
  strokeRect(g, 5, 20, 10, 8, 'T', 1)
  fillRect(g, 8, 24, 4, 4, 'Y')
  // Dome building 2
  fillEllipse(g, 25, 18, 5, 4, 'C')
  fillRect(g, 21, 18, 8, 10, 'C')
  strokeRect(g, 21, 18, 8, 10, 'T', 1)
  fillRect(g, 23, 22, 3, 3, 'Y')
  fillRect(g, 26, 22, 2, 3, 'Y')
  // Tower
  fillRect(g, 16, 12, 4, 16, 'L')
  fillEllipse(g, 18, 11, 3, 3, 'C')
  fillCircle(g, 18, 11, 1, 'Y')
  // Tubes connecting buildings
  fillRect(g, 15, 22, 6, 2, 'L')
  // Bubbles rising
  fillCircle(g, 8, 8, 1, 'W')
  fillCircle(g, 12, 5, 1, 'W')
  fillCircle(g, 28, 7, 1, 'W')
  fillCircle(g, 20, 4, 2, 'W')
  // Fish
  fillEllipse(g, 5, 10, 2, 1, 'O')
  fillTriangle(g, [3, 10], [1, 9], [1, 11], 'O')
  fillEllipse(g, 30, 14, 2, 1, 'R')
  fillTriangle(g, [32, 14], [34, 13], [34, 15], 'R')
  // Seaweed
  drawLine(g, 2, 35, 3, 28, 'G', 1)
  drawLine(g, 4, 35, 3, 29, 'F', 1)
  drawLine(g, 32, 35, 31, 28, 'G', 1)
  // Coral
  fillCircle(g, 7, 30, 2, 'P')
  fillCircle(g, 28, 31, 2, 'M')
  return g
}

/** Level 16: 凤凰花园 (Phoenix Garden) - 38x38 */
export function buildPhoenixGarden(): (string | null)[][] {
  const g = createGrid(38)
  // Garden background
  fillRect(g, 0, 0, 38, 20, 'B')
  fillRect(g, 0, 20, 38, 18, 'G')
  fillRect(g, 0, 20, 38, 3, 'F')
  // Phoenix (center)
  fillEllipse(g, 19, 12, 5, 4, 'O')
  fillEllipse(g, 19, 12, 3, 3, 'Y')
  // Phoenix head
  fillCircle(g, 19, 6, 3, 'R')
  fillCircle(g, 19, 6, 2, 'O')
  fillRect(g, 18, 5, 1, 1, 'K')
  fillRect(g, 20, 5, 1, 1, 'K')
  // Crest
  fillTriangle(g, [19, 1], [17, 4], [21, 4], 'M')
  fillTriangle(g, [17, 2], [16, 5], [19, 4], 'R')
  fillTriangle(g, [21, 2], [19, 4], [22, 5], 'R')
  // Wings spread
  fillTriangle(g, [12, 10], [3, 6], [8, 16], 'R')
  fillTriangle(g, [11, 11], [5, 8], [9, 15], 'O')
  fillTriangle(g, [26, 10], [30, 16], [35, 6], 'R')
  fillTriangle(g, [27, 11], [29, 15], [33, 8], 'O')
  // Tail (flowing down)
  fillTriangle(g, [19, 16], [14, 24], [19, 22], 'R')
  fillTriangle(g, [19, 16], [19, 22], [24, 24], 'R')
  fillTriangle(g, [19, 17], [15, 23], [23, 23], 'Y')
  // Garden flowers
  fillCircle(g, 5, 25, 2, 'P')
  fillCircle(g, 10, 28, 2, 'M')
  fillCircle(g, 33, 25, 2, 'V')
  fillCircle(g, 28, 30, 2, 'P')
  fillCircle(g, 15, 32, 2, 'R')
  fillCircle(g, 24, 33, 2, 'H')
  // Flower centers
  fillCircle(g, 5, 25, 1, 'Y')
  fillCircle(g, 10, 28, 1, 'Y')
  fillCircle(g, 33, 25, 1, 'Y')
  fillCircle(g, 28, 30, 1, 'Y')
  // Trees on sides
  fillRect(g, 1, 22, 2, 10, 'N')
  fillCircle(g, 2, 20, 3, 'G')
  fillRect(g, 35, 22, 2, 10, 'N')
  fillCircle(g, 36, 20, 3, 'G')
  // Fence
  for (let i = 0; i < 38; i += 3) {
    fillRect(g, i, 35, 1, 3, 'N')
  }
  fillRect(g, 0, 35, 38, 1, 'N')
  return g
}

/** Level 17: 水晶宫殿 (Crystal Palace) - 42x42 */
export function buildCrystalPalace(): (string | null)[][] {
  const g = createGrid(42)
  // Sky gradient
  fillRect(g, 0, 0, 42, 15, 'I')
  fillRect(g, 0, 15, 42, 10, 'V')
  fillRect(g, 0, 25, 42, 17, 'D')
  // Palace main structure
  fillRect(g, 10, 18, 22, 18, 'C')
  strokeRect(g, 10, 18, 22, 18, 'B', 1)
  // Crystal spires
  fillTriangle(g, [15, 8], [12, 18], [18, 18], 'C')
  fillTriangle(g, [21, 6], [18, 18], [24, 18], 'C')
  fillTriangle(g, [27, 8], [24, 18], [30, 18], 'C')
  // Spire highlights
  fillTriangle(g, [15, 10], [13, 17], [16, 17], 'W')
  fillTriangle(g, [21, 8], [19, 17], [22, 17], 'W')
  fillTriangle(g, [27, 10], [25, 17], [28, 17], 'W')
  // Grand entrance
  fillEllipse(g, 21, 30, 4, 5, 'K')
  fillEllipse(g, 21, 30, 3, 4, 'I')
  // Windows (crystal shaped)
  fillDiamond(g, 14, 22, 2, 2, 'W')
  fillDiamond(g, 21, 22, 2, 2, 'W')
  fillDiamond(g, 28, 22, 2, 2, 'W')
  fillDiamond(g, 14, 28, 2, 2, 'U')
  fillDiamond(g, 28, 28, 2, 2, 'U')
  // Pillars
  fillRect(g, 11, 25, 2, 11, 'L')
  fillRect(g, 30, 25, 2, 11, 'L')
  // Crystal decorations
  fillDiamond(g, 5, 30, 2, 3, 'C')
  fillDiamond(g, 37, 30, 2, 3, 'C')
  fillDiamond(g, 5, 30, 1, 2, 'W')
  fillDiamond(g, 37, 30, 1, 2, 'W')
  // Floating crystals
  fillDiamond(g, 6, 10, 2, 3, 'C')
  fillDiamond(g, 36, 12, 2, 3, 'C')
  fillDiamond(g, 3, 18, 1, 2, 'T')
  fillDiamond(g, 39, 20, 1, 2, 'T')
  // Ground reflection
  fillRect(g, 10, 36, 22, 2, 'T')
  // Stars
  fillRect(g, 3, 3, 1, 1, 'W')
  fillRect(g, 8, 5, 1, 1, 'W')
  fillRect(g, 35, 4, 1, 1, 'W')
  fillRect(g, 40, 7, 1, 1, 'W')
  fillRect(g, 20, 2, 1, 1, 'Y')
  return g
}

/** Level 18: 银河战舰 (Galaxy Battleship) - 45x45 */
export function buildGalaxyBattleship(): (string | null)[][] {
  const g = createGrid(45)
  // Space
  fillRect(g, 0, 0, 45, 45, 'K')
  // Nebula clouds
  fillEllipse(g, 8, 8, 6, 4, 'V')
  fillEllipse(g, 38, 35, 5, 4, 'I')
  fillEllipse(g, 35, 8, 4, 3, 'V')
  // Stars
  const stars = [[2,2],[5,12],[40,5],[42,15],[3,30],[8,40],[38,40],[22,2],[30,3],[15,42],[35,42],[1,20],[43,22]]
  for (const [x, y] of stars) {
    if (g[y]?.[x] !== undefined) g[y][x] = 'W'
  }
  // Ship hull (large wedge)
  fillTriangle(g, [22, 8], [8, 34], [36, 34], 'D')
  fillTriangle(g, [22, 10], [10, 32], [34, 32], 'L')
  // Bridge (top structure)
  fillRect(g, 18, 12, 8, 4, 'D')
  fillRect(g, 19, 12, 6, 3, 'C')
  fillRect(g, 20, 13, 4, 1, 'W')
  // Wing pylons
  fillRect(g, 5, 26, 12, 3, 'D')
  fillRect(g, 28, 26, 12, 3, 'D')
  // Engine pods
  fillEllipse(g, 8, 30, 3, 4, 'D')
  fillEllipse(g, 36, 30, 3, 4, 'D')
  fillEllipse(g, 8, 30, 2, 3, 'B')
  fillEllipse(g, 36, 30, 2, 3, 'B')
  // Engine glow
  fillRect(g, 7, 34, 3, 3, 'C')
  fillRect(g, 35, 34, 3, 3, 'C')
  fillRect(g, 8, 35, 1, 2, 'W')
  fillRect(g, 36, 35, 1, 2, 'W')
  // Main engines
  fillRect(g, 18, 34, 3, 3, 'O')
  fillRect(g, 24, 34, 3, 3, 'O')
  fillRect(g, 19, 36, 1, 2, 'Y')
  fillRect(g, 25, 36, 1, 2, 'Y')
  // Weapons
  drawLine(g, 22, 8, 22, 4, 'R', 1)
  fillCircle(g, 22, 4, 1, 'R')
  // Hull details
  drawLine(g, 14, 20, 30, 20, 'C', 1)
  drawLine(g, 16, 24, 28, 24, 'C', 1)
  fillRing(g, 22, 22, 3, 2, 'Y')
  fillCircle(g, 22, 22, 1, 'R')
  // Shield effect
  fillRing(g, 22, 22, 14, 13, 'C')
  return g
}

/** Level 19: 世界树 (World Tree) - 48x48 */
export function buildWorldTree(): (string | null)[][] {
  const g = createGrid(48)
  // Sky gradient
  fillRect(g, 0, 0, 48, 20, 'I')
  fillRect(g, 0, 20, 48, 10, 'B')
  fillRect(g, 0, 30, 48, 18, 'G')
  // Massive trunk
  fillRect(g, 18, 20, 12, 24, 'N')
  fillRect(g, 20, 20, 8, 24, 'Q')
  // Roots
  fillTriangle(g, [18, 40], [10, 48], [20, 46], 'N')
  fillTriangle(g, [30, 40], [28, 46], [38, 48], 'N')
  drawLine(g, 15, 42, 8, 46, 'N', 2)
  drawLine(g, 33, 42, 40, 46, 'N', 2)
  // Main canopy layers
  fillCircle(g, 24, 14, 12, 'G')
  fillCircle(g, 16, 12, 8, 'G')
  fillCircle(g, 32, 12, 8, 'G')
  fillCircle(g, 10, 16, 6, 'G')
  fillCircle(g, 38, 16, 6, 'G')
  // Lighter foliage
  fillCircle(g, 20, 8, 6, 'F')
  fillCircle(g, 28, 9, 5, 'F')
  fillCircle(g, 14, 10, 4, 'E')
  fillCircle(g, 34, 10, 4, 'E')
  fillCircle(g, 24, 5, 4, 'F')
  // Highlights
  fillCircle(g, 22, 6, 2, 'W')
  fillCircle(g, 30, 7, 2, 'W')
  // Tree face
  fillEllipse(g, 24, 28, 4, 3, 'S')
  fillCircle(g, 22, 27, 1, 'K')
  fillCircle(g, 26, 27, 1, 'K')
  fillRect(g, 22, 26, 1, 1, 'W')
  fillRect(g, 26, 26, 1, 1, 'W')
  fillRect(g, 23, 30, 2, 1, 'N')
  // Glowing fruits/orbs
  fillCircle(g, 12, 14, 1, 'Y')
  fillCircle(g, 18, 6, 1, 'Y')
  fillCircle(g, 30, 5, 1, 'Y')
  fillCircle(g, 36, 13, 1, 'Y')
  fillCircle(g, 8, 18, 1, 'O')
  fillCircle(g, 40, 17, 1, 'O')
  // Branches visible
  drawLine(g, 18, 22, 10, 18, 'N', 2)
  drawLine(g, 30, 22, 38, 18, 'N', 2)
  drawLine(g, 16, 24, 8, 20, 'N', 1)
  drawLine(g, 32, 24, 40, 20, 'N', 1)
  // Small creatures
  fillCircle(g, 5, 34, 1, 'R')
  fillCircle(g, 42, 36, 1, 'P')
  // Flowers at base
  fillCircle(g, 10, 38, 1, 'P')
  fillCircle(g, 38, 40, 1, 'V')
  fillCircle(g, 14, 42, 1, 'M')
  fillCircle(g, 34, 42, 1, 'P')
  return g
}

/** Level 20: 星际庆典 (Cosmic Festival) - 55x55, grand final */
export function buildCosmicFestival(): (string | null)[][] {
  const g = createGrid(55)
  // Deep space
  fillRect(g, 0, 0, 55, 55, 'K')
  // Nebula
  fillEllipse(g, 15, 15, 10, 8, 'V')
  fillEllipse(g, 40, 40, 8, 6, 'I')
  fillEllipse(g, 42, 12, 7, 5, 'V')
  fillEllipse(g, 10, 42, 6, 5, 'I')
  // Central planet
  fillCircle(g, 27, 27, 12, 'B')
  fillCircle(g, 27, 27, 10, 'T')
  fillCircle(g, 27, 27, 6, 'C')
  // Planet ring
  fillEllipse(g, 27, 27, 16, 3, 'L')
  // Restore planet center over ring
  fillCircle(g, 27, 27, 10, 'T')
  fillCircle(g, 27, 27, 6, 'C')
  fillCircle(g, 27, 27, 3, 'W')
  // Continents
  fillEllipse(g, 24, 24, 3, 2, 'G')
  fillEllipse(g, 31, 28, 2, 3, 'G')
  fillEllipse(g, 27, 32, 3, 2, 'F')
  // Fireworks around planet
  // Firework 1 (top left)
  fillCircle(g, 8, 8, 4, 'R')
  fillCircle(g, 8, 8, 2, 'O')
  fillCircle(g, 8, 8, 1, 'Y')
  drawLine(g, 8, 3, 8, 1, 'R', 1)
  drawLine(g, 4, 5, 2, 3, 'R', 1)
  drawLine(g, 12, 5, 14, 3, 'R', 1)
  // Firework 2 (top right)
  fillCircle(g, 46, 10, 4, 'P')
  fillCircle(g, 46, 10, 2, 'M')
  fillCircle(g, 46, 10, 1, 'W')
  drawLine(g, 46, 5, 46, 3, 'P', 1)
  drawLine(g, 42, 7, 40, 5, 'P', 1)
  drawLine(g, 50, 7, 52, 5, 'P', 1)
  // Firework 3 (bottom left)
  fillCircle(g, 10, 46, 3, 'Y')
  fillCircle(g, 10, 46, 1, 'W')
  drawLine(g, 7, 43, 5, 41, 'Y', 1)
  drawLine(g, 13, 43, 15, 41, 'Y', 1)
  // Firework 4 (bottom right)
  fillCircle(g, 46, 46, 3, 'C')
  fillCircle(g, 46, 46, 1, 'W')
  drawLine(g, 43, 43, 41, 41, 'C', 1)
  drawLine(g, 49, 43, 51, 41, 'C', 1)
  // Small stars
  const stars = [
    [3,20],[6,30],[50,20],[48,30],[25,3],[30,5],[20,50],[35,50],
    [2,45],[52,45],[52,3],[1,3],[27,1],[27,53],[1,27],[53,27]
  ]
  for (const [x, y] of stars) {
    if (y < 55 && x < 55) g[y][x] = 'W'
  }
  // Spaceships (small)
  fillTriangle(g, [20, 8], [18, 11], [22, 11], 'L')
  fillTriangle(g, [38, 45], [36, 48], [40, 48], 'L')
  // Comets
  drawLine(g, 5, 2, 12, 5, 'U', 1)
  fillCircle(g, 5, 2, 1, 'W')
  drawLine(g, 50, 50, 45, 48, 'U', 1)
  fillCircle(g, 50, 50, 1, 'W')
  // Celebration banners (orbiting planet)
  fillRect(g, 14, 26, 3, 1, 'R')
  fillRect(g, 14, 27, 3, 1, 'Y')
  fillRect(g, 38, 26, 3, 1, 'G')
  fillRect(g, 38, 27, 3, 1, 'B')
  return g
}
