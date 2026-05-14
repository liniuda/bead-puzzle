import { type PuzzleLevel } from './patterns'

export interface TrayBead {
  id: string
  color: string
  targetRow: number
  targetCol: number
}

/**
 * Generate puzzle:
 * - Start with the complete pattern, all beads on board
 * - Swap ~20% of beads to wrong positions (misplace them)
 * - Tray starts empty — it's only used as a holding area during play
 */
export function generatePuzzle(level: PuzzleLevel): {
  initialBoard: (string | null)[][]
  trayBeads: TrayBead[]
  targetGrid: (string | null)[][]
  totalSlots: number
} {
  const { grid, size } = level
  const wrongBeadRatio = level.wrongBeadRatio ?? 0.20
  const traySlots = level.traySlots ?? 10

  // Copy grid as target
  const targetGrid = grid.map(row => [...row])

  // Build initial board with all beads placed
  const initialBoard: (string | null)[][] = grid.map(row => [...row])

  // Collect all filled cells
  const filledCells: { row: number; col: number; color: string }[] = []
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] !== null) {
        filledCells.push({ row: r, col: c, color: grid[r][c]! })
      }
    }
  }

  // Swap ~20% of beads to wrong positions (Fisher-Yates shuffle among selected cells)
  const shuffledFilled = [...filledCells].sort(() => Math.random() - 0.5)
  const numToSwap = Math.floor(filledCells.length * wrongBeadRatio)
  const swapCells = shuffledFilled.slice(0, numToSwap)

  if (swapCells.length >= 2) {
    const originalColors = swapCells.map(c => initialBoard[c.row][c.col]!)
    // Fisher-Yates shuffle ensuring displacement
    for (let i = originalColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i) // j < i ensures no element stays in place
      ;[originalColors[i], originalColors[j]] = [originalColors[j], originalColors[i]]
    }
    for (let i = 0; i < swapCells.length; i++) {
      initialBoard[swapCells[i].row][swapCells[i].col] = originalColors[i]
    }
  }

  // Tray starts empty — provide enough slots for gameplay
  const trayBeads: TrayBead[] = []

  return {
    initialBoard,
    trayBeads,
    targetGrid,
    totalSlots: Math.max(traySlots, Math.ceil(filledCells.length * 0.15)),
  }
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
