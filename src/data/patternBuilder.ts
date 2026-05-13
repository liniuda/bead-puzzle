/**
 * Pattern Builder - Shape primitives for generating large pixel art grids
 */

type Grid = (string | null)[][]

/** Create empty grid of given size */
export function createGrid(size: number): Grid {
  return Array.from({ length: size }, () => Array(size).fill(null))
}

/** Fill a rectangle area */
export function fillRect(grid: Grid, x: number, y: number, w: number, h: number, color: string): void {
  const rows = grid.length
  const cols = grid[0].length
  for (let r = y; r < y + h && r < rows; r++) {
    for (let c = x; c < x + w && c < cols; c++) {
      if (r >= 0 && c >= 0) grid[r][c] = color
    }
  }
}

/** Fill a circle using midpoint algorithm */
export function fillCircle(grid: Grid, cx: number, cy: number, radius: number, color: string): void {
  const rows = grid.length
  const cols = grid[0].length
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = c - cx
      const dy = r - cy
      if (dx * dx + dy * dy <= radius * radius) {
        grid[r][c] = color
      }
    }
  }
}

/** Fill an ellipse */
export function fillEllipse(grid: Grid, cx: number, cy: number, rx: number, ry: number, color: string): void {
  const rows = grid.length
  const cols = grid[0].length
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = (c - cx) / rx
      const dy = (r - cy) / ry
      if (dx * dx + dy * dy <= 1) {
        grid[r][c] = color
      }
    }
  }
}

/** Fill a triangle given 3 points using scanline */
export function fillTriangle(
  grid: Grid,
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  color: string
): void {
  const rows = grid.length
  const cols = grid[0].length
  const minY = Math.max(0, Math.floor(Math.min(p1[1], p2[1], p3[1])))
  const maxY = Math.min(rows - 1, Math.ceil(Math.max(p1[1], p2[1], p3[1])))

  for (let y = minY; y <= maxY; y++) {
    const xs: number[] = []
    const edges: [number, number][][] = [[p1, p2], [p2, p3], [p3, p1]]
    for (const [a, b] of edges) {
      if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) {
        const t = (y - a[1]) / (b[1] - a[1])
        xs.push(a[0] + t * (b[0] - a[0]))
      }
    }
    if (xs.length >= 2) {
      xs.sort((a, b) => a - b)
      const startX = Math.max(0, Math.floor(xs[0]))
      const endX = Math.min(cols - 1, Math.ceil(xs[xs.length - 1]))
      for (let x = startX; x <= endX; x++) {
        grid[y][x] = color
      }
    }
  }
}

/** Fill a diamond/rhombus shape */
export function fillDiamond(grid: Grid, cx: number, cy: number, rx: number, ry: number, color: string): void {
  const rows = grid.length
  const cols = grid[0].length
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dx = Math.abs(c - cx) / rx
      const dy = Math.abs(r - cy) / ry
      if (dx + dy <= 1) {
        grid[r][c] = color
      }
    }
  }
}

/** Mirror grid horizontally (copy left half to right) */
export function mirrorH(grid: Grid): void {
  const cols = grid[0].length
  const mid = Math.floor(cols / 2)
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < mid; c++) {
      grid[r][cols - 1 - c] = grid[r][c]
    }
  }
}

/** Stamp a small pattern onto the grid at offset */
export function stamp(grid: Grid, offsetX: number, offsetY: number, pattern: Grid): void {
  for (let r = 0; r < pattern.length; r++) {
    for (let c = 0; c < pattern[0].length; c++) {
      const gr = offsetY + r
      const gc = offsetX + c
      if (gr >= 0 && gr < grid.length && gc >= 0 && gc < grid[0].length && pattern[r][c] !== null) {
        grid[gr][gc] = pattern[r][c]
      }
    }
  }
}

/** Draw a line between two points */
export function drawLine(grid: Grid, x1: number, y1: number, x2: number, y2: number, color: string, thickness = 1): void {
  const dx = Math.abs(x2 - x1)
  const dy = Math.abs(y2 - y1)
  const steps = Math.max(dx, dy)
  if (steps === 0) {
    if (y1 >= 0 && y1 < grid.length && x1 >= 0 && x1 < grid[0].length) {
      grid[y1][x1] = color
    }
    return
  }
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = Math.round(x1 + t * (x2 - x1))
    const y = Math.round(y1 + t * (y2 - y1))
    // Apply thickness
    const half = Math.floor(thickness / 2)
    for (let dr = -half; dr <= half; dr++) {
      for (let dc = -half; dc <= half; dc++) {
        const rr = y + dr
        const cc = x + dc
        if (rr >= 0 && rr < grid.length && cc >= 0 && cc < grid[0].length) {
          grid[rr][cc] = color
        }
      }
    }
  }
}

/** Fill ring (circle outline with thickness) */
export function fillRing(grid: Grid, cx: number, cy: number, outerR: number, innerR: number, color: string): void {
  const rows = grid.length
  const cols = grid[0].length
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2)
      if (dist <= outerR && dist >= innerR) {
        grid[r][c] = color
      }
    }
  }
}

/** Replace all instances of one color with another */
export function colorReplace(grid: Grid, from: string, to: string): void {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === from) grid[r][c] = to
    }
  }
}

/** Fill border/outline of a rectangle */
export function strokeRect(grid: Grid, x: number, y: number, w: number, h: number, color: string, thickness = 1): void {
  fillRect(grid, x, y, w, thickness, color) // top
  fillRect(grid, x, y + h - thickness, w, thickness, color) // bottom
  fillRect(grid, x, y, thickness, h, color) // left
  fillRect(grid, x + w - thickness, y, thickness, h, color) // right
}

/** Fill area with a checkerboard pattern of two colors */
export function fillCheckerboard(grid: Grid, x: number, y: number, w: number, h: number, c1: string, c2: string, cellSize = 1): void {
  for (let r = y; r < y + h && r < grid.length; r++) {
    for (let c = x; c < x + w && c < grid[0].length; c++) {
      if (r >= 0 && c >= 0) {
        const isEven = (Math.floor((r - y) / cellSize) + Math.floor((c - x) / cellSize)) % 2 === 0
        grid[r][c] = isEven ? c1 : c2
      }
    }
  }
}
