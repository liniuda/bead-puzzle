import { type PuzzleLevel } from './patterns'

export interface TrayBead {
  id: string
  color: string
  targetRow: number
  targetCol: number
}

/**
 * Generate puzzle:
 * - Start with the complete pattern
 * - Remove beads as connected same-color groups → these go to tray
 * - Additionally, swap some remaining beads to wrong positions
 * - Board background always shows target color; wrong beads visually mismatch
 */
export function generatePuzzle(level: PuzzleLevel): {
  initialBoard: (string | null)[][]
  trayBeads: TrayBead[]
  targetGrid: (string | null)[][]
  totalSlots: number
} {
  const { grid, size } = level
  const removeRatio = level.removeRatio ?? 0.15
  const wrongBeadRatio = level.wrongBeadRatio ?? 0.20
  const traySlots = level.traySlots ?? 10

  // Copy grid as target
  const targetGrid = grid.map(row => [...row])

  // Collect all filled cells
  const filledCells: { row: number; col: number; color: string }[] = []
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] !== null) {
        filledCells.push({ row: r, col: c, color: grid[r][c]! })
      }
    }
  }

  const totalToRemove = Math.max(
    traySlots,
    Math.floor(filledCells.length * removeRatio)
  )

  // Find connected same-color groups
  const groups = findColorGroups(grid, size)

  // Shuffle groups and select which ones to remove (empty spots)
  const shuffledGroups = [...groups].sort(() => Math.random() - 0.5)
  const removedCells: { row: number; col: number; color: string }[] = []

  for (const group of shuffledGroups) {
    if (removedCells.length >= totalToRemove) break
    if (removedCells.length + group.length <= totalToRemove + 3) {
      removedCells.push(...group)
    }
  }

  // Build initial board (with removed cells as null)
  const initialBoard: (string | null)[][] = grid.map(row => [...row])
  for (const cell of removedCells) {
    initialBoard[cell.row][cell.col] = null
  }

  // Tray beads from removed cells
  const trayBeads: TrayBead[] = removedCells.map((cell, idx) => ({
    id: `tray-${idx}`,
    color: cell.color,
    targetRow: cell.row,
    targetCol: cell.col,
  }))

  // Now SWAP ~20% of remaining filled cells' positions (misplace them)
  // Beads are correct colors, just in wrong spots
  const removedSet = new Set(removedCells.map(c => `${c.row},${c.col}`))
  const remainingFilled = filledCells.filter(c => !removedSet.has(`${c.row},${c.col}`))
  const shuffledRemaining = [...remainingFilled].sort(() => Math.random() - 0.5)
  const numToSwap = Math.floor(remainingFilled.length * wrongBeadRatio)

  // Pick cells to swap, then shuffle their colors among themselves
  const swapCells = shuffledRemaining.slice(0, numToSwap)
  if (swapCells.length >= 2) {
    // Collect original colors at these positions
    const originalColors = swapCells.map(c => initialBoard[c.row][c.col]!)
    // Shuffle colors (Fisher-Yates) ensuring at least some are displaced
    for (let i = originalColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[originalColors[i], originalColors[j]] = [originalColors[j], originalColors[i]]
    }
    // Place shuffled colors back
    for (let i = 0; i < swapCells.length; i++) {
      initialBoard[swapCells[i].row][swapCells[i].col] = originalColors[i]
    }
  }

  // Shuffle tray beads
  trayBeads.sort(() => Math.random() - 0.5)

  return {
    initialBoard,
    trayBeads,
    targetGrid,
    totalSlots: Math.max(traySlots, trayBeads.length) + Math.ceil(trayBeads.length * 0.5),
  }
}

/**
 * Find groups of connected same-color cells (2-5 cells each)
 */
function findColorGroups(
  grid: (string | null)[][],
  size: number
): { row: number; col: number; color: string }[][] {
  const visited = new Set<string>()
  const groups: { row: number; col: number; color: string }[][] = []

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const key = `${r},${c}`
      if (visited.has(key) || grid[r][c] === null) continue

      const color = grid[r][c]!
      const group: { row: number; col: number; color: string }[] = []
      const queue: [number, number][] = [[r, c]]
      visited.add(key)

      while (queue.length > 0 && group.length < 5) {
        const [cr, cc] = queue.shift()!
        group.push({ row: cr, col: cc, color })

        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        for (const [dr, dc] of dirs) {
          const nr = cr + dr
          const nc = cc + dc
          const nKey = `${nr},${nc}`
          if (
            nr >= 0 && nr < size && nc >= 0 && nc < size &&
            !visited.has(nKey) &&
            grid[nr][nc] === color &&
            group.length + queue.length < 5
          ) {
            visited.add(nKey)
            queue.push([nr, nc])
          }
        }
      }

      if (group.length >= 2) {
        groups.push(group)
      } else {
        for (const cell of group) {
          visited.delete(`${cell.row},${cell.col}`)
        }
      }
    }
  }

  // Single cells for variety
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const key = `${r},${c}`
      if (!visited.has(key) && grid[r][c] !== null) {
        groups.push([{ row: r, col: c, color: grid[r][c]! }])
        visited.add(key)
      }
    }
  }

  return groups
}

/**
 * Find all same-color connected cells starting from a position on the board
 */
export function getConnectedGroup(
  board: (string | null)[][],
  startRow: number,
  startCol: number,
  size: number
): { row: number; col: number; color: string }[] {
  const color = board[startRow][startCol]
  if (!color) return []

  const visited = new Set<string>()
  const group: { row: number; col: number; color: string }[] = []
  const queue: [number, number][] = [[startRow, startCol]]
  visited.add(`${startRow},${startCol}`)

  while (queue.length > 0) {
    const [r, c] = queue.shift()!
    group.push({ row: r, col: c, color })

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc
      const nKey = `${nr},${nc}`
      if (
        nr >= 0 && nr < size && nc >= 0 && nc < size &&
        !visited.has(nKey) &&
        board[nr][nc] === color
      ) {
        visited.add(nKey)
        queue.push([nr, nc])
      }
    }
  }

  return group
}
