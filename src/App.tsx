import { useState, useCallback, useMemo } from 'react'
import { GameBoard } from './components/GameBoard'
import { BeadTray } from './components/BeadTray'
import { LevelSelector } from './components/LevelSelector'
import { CelebrationOverlay } from './components/CelebrationOverlay'
import { GameHeader } from './components/GameHeader'
import { LEVELS, BEAD_COLORS, type PuzzleLevel } from './data/levelConfig'
import { generatePuzzle, getConnectedGroup, type TrayBead } from './data/puzzleGenerator'
import { useGameProgress } from './hooks/useGameProgress'

export interface TraySlotBead {
  id: string
  color: string
  targetRow: number
  targetCol: number
}

function App() {
  const { unlockedUpTo, completedLevels, isLevelCompleted, markLevelComplete } = useGameProgress()

  const [currentLevel, setCurrentLevel] = useState<PuzzleLevel>(LEVELS[0])
  const [showLevelSelector, setShowLevelSelector] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const [initialData] = useState(() => generatePuzzle(LEVELS[0]))
  const [board, setBoard] = useState<(string | null)[][]>(initialData.initialBoard.map(r => [...r]))
  const [tray, setTray] = useState<(TraySlotBead | null)[]>(() => {
    const slots: (TraySlotBead | null)[] = initialData.trayBeads.map(b => ({ ...b }))
    while (slots.length < initialData.totalSlots) slots.push(null)
    return slots
  })
  const [selectedTrayIdx, setSelectedTrayIdx] = useState<number | null>(null)
  const [hintCell, setHintCell] = useState<string | null>(null)

  const initLevel = useCallback((level: PuzzleLevel) => {
    const data = generatePuzzle(level)
    setBoard(data.initialBoard.map(r => [...r]))
    const slots: (TraySlotBead | null)[] = data.trayBeads.map((b: TrayBead) => ({ ...b }))
    while (slots.length < data.totalSlots) slots.push(null)
    setTray(slots)
    setSelectedTrayIdx(null)
    setHintCell(null)
    setIsCompleted(false)
  }, [])

  const handleSelectLevel = useCallback((level: PuzzleLevel) => {
    setCurrentLevel(level)
    setShowLevelSelector(false)
    initLevel(level)
  }, [initLevel])

  const handleReset = useCallback(() => {
    initLevel(currentLevel)
  }, [currentLevel, initLevel])

  // Click a cell on the board
  const handleBoardCellClick = useCallback((row: number, col: number) => {
    if (isCompleted) return
    setHintCell(null) // clear hint on any board interaction

    const cellColor = board[row][col]

    // CASE 1: Tray bead selected + clicking an EMPTY cell → place it + auto-fill same color
    if (selectedTrayIdx !== null && cellColor === null) {
      const trayBead = tray[selectedTrayIdx]
      if (!trayBead) return

      const color = trayBead.color
      const targetGrid = currentLevel.grid
      const emptyNeedingColor = findConnectedEmptyCells(board, targetGrid, row, col, color, currentLevel.size)

      const sameColorTrayIdxs = tray
        .map((slot, idx) => (slot && slot.color === color) ? idx : -1)
        .filter(idx => idx >= 0)

      const toPlace = Math.min(sameColorTrayIdxs.length, emptyNeedingColor.length)

      setBoard(prev => {
        const next = prev.map(r => [...r])
        for (let i = 0; i < toPlace; i++) {
          const { row: r, col: c } = emptyNeedingColor[i]
          next[r][c] = color
        }
        return next
      })

      setTray(prev => {
        const next = [...prev]
        for (let i = 0; i < toPlace; i++) {
          next[sameColorTrayIdxs[i]] = null
        }
        return next
      })
      setSelectedTrayIdx(null)

      setTimeout(() => {
        setBoard(curBoard => {
          checkIfComplete(curBoard, currentLevel)
          return curBoard
        })
      }, 50)
      return
    }

    // CASE 2: Clicking a FILLED cell
    if (cellColor !== null) {
      setSelectedTrayIdx(null)

      const color = cellColor
      const targetGrid = currentLevel.grid

      // Check if there are adjacent empty cells needing this color + same-color beads in tray
      const adjacentEmpties = findAdjacentEmptyCellsForColor(board, targetGrid, row, col, color, currentLevel.size)
      const sameColorTrayIdxs = tray
        .map((slot, idx) => (slot && slot.color === color) ? idx : -1)
        .filter(idx => idx >= 0)

      if (adjacentEmpties.length > 0 && sameColorTrayIdxs.length > 0) {
        const toPlace = Math.min(sameColorTrayIdxs.length, adjacentEmpties.length)

        setBoard(prev => {
          const next = prev.map(r => [...r])
          for (let i = 0; i < toPlace; i++) {
            const { row: r, col: c } = adjacentEmpties[i]
            next[r][c] = color
          }
          return next
        })

        setTray(prev => {
          const next = [...prev]
          for (let i = 0; i < toPlace; i++) {
            next[sameColorTrayIdxs[i]] = null
          }
          return next
        })

        setTimeout(() => {
          setBoard(curBoard => {
            checkIfComplete(curBoard, currentLevel)
            return curBoard
          })
        }, 50)
        return
      }

      // Otherwise: extract connected same-color group to tray
      const group = getConnectedGroup(board, row, col, currentLevel.size)
      if (group.length === 0) return

      const emptySlots = tray.filter(s => s === null).length
      if (emptySlots === 0) return // truly no space at all

      // If full group doesn't fit, fall back to extracting just the clicked bead
      const toExtract = emptySlots >= group.length
        ? group
        : [{ row, col, color }]

      setBoard(prev => {
        const next = prev.map(r => [...r])
        for (const cell of toExtract) {
          next[cell.row][cell.col] = null
        }
        return next
      })

      setTray(prev => {
        const next = [...prev]
        let slotIdx = 0
        for (const cell of toExtract) {
          while (next[slotIdx] !== null && slotIdx < next.length) slotIdx++
          if (slotIdx < next.length) {
            next[slotIdx] = {
              id: `ex-${Date.now()}-${cell.row}-${cell.col}`,
              color: cell.color,
              targetRow: cell.row,
              targetCol: cell.col,
            }
            slotIdx++
          }
        }
        return next
      })
    }
  }, [board, tray, selectedTrayIdx, isCompleted, currentLevel])

  const checkIfComplete = useCallback((curBoard: (string | null)[][], level: PuzzleLevel) => {
    const target = level.grid
    for (let r = 0; r < level.size; r++) {
      for (let c = 0; c < level.size; c++) {
        if (target[r][c] !== null && curBoard[r][c] !== target[r][c]) {
          return
        }
      }
    }
    setIsCompleted(true)
    markLevelComplete(level.id, level.order)
  }, [markLevelComplete])

  // Click a tray slot
  const handleTrayClick = useCallback((slotIdx: number) => {
    if (tray[slotIdx] === null) {
      setSelectedTrayIdx(null)
      return
    }
    setSelectedTrayIdx(prev => prev === slotIdx ? null : slotIdx)
  }, [tray])

  // Hint: find one wrong-placed bead and highlight it
  const handleHint = useCallback(() => {
    const target = currentLevel.grid
    const wrongCells: string[] = []
    for (let r = 0; r < currentLevel.size; r++) {
      for (let c = 0; c < currentLevel.size; c++) {
        if (target[r][c] !== null && board[r][c] !== null && board[r][c] !== target[r][c]) {
          wrongCells.push(`${r},${c}`)
        }
      }
    }
    if (wrongCells.length > 0) {
      const pick = wrongCells[Math.floor(Math.random() * wrongCells.length)]
      setHintCell(pick)
      // Auto-clear after 3 seconds
      setTimeout(() => setHintCell(null), 3000)
    }
  }, [board, currentLevel])

  // Progress
  const progress = useMemo(() => {
    const target = currentLevel.grid
    let total = 0
    let correct = 0
    for (let r = 0; r < currentLevel.size; r++) {
      for (let c = 0; c < currentLevel.size; c++) {
        if (target[r][c] !== null) {
          total++
          if (board[r][c] === target[r][c]) correct++
        }
      }
    }
    return total === 0 ? 100 : Math.round((correct / total) * 100)
  }, [board, currentLevel])

  const beadsInTray = tray.filter(s => s !== null).length
  const isAllComplete = LEVELS.every(l => isLevelCompleted(l.id)) || (isCompleted && currentLevel.order === 10)

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto">
      <GameHeader
        level={currentLevel}
        progress={progress}
        beadsInTray={beadsInTray}
        onSelectLevel={() => setShowLevelSelector(true)}
        onReset={handleReset}
        onHint={handleHint}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-2 py-2">
        <GameBoard
          level={currentLevel}
          board={board}
          selectedTrayBead={selectedTrayIdx !== null ? tray[selectedTrayIdx] : null}
          hintCell={hintCell}
          onCellClick={handleBoardCellClick}
          beadColors={BEAD_COLORS}
        />
      </main>

      <BeadTray
        tray={tray}
        selectedIdx={selectedTrayIdx}
        onSlotClick={handleTrayClick}
        beadColors={BEAD_COLORS}
      />

      {showLevelSelector && (
        <LevelSelector
          levels={LEVELS}
          currentLevel={currentLevel}
          beadColors={BEAD_COLORS}
          unlockedUpTo={unlockedUpTo}
          completedLevels={completedLevels}
          onSelect={handleSelectLevel}
          onClose={() => setShowLevelSelector(false)}
        />
      )}

      {isCompleted && (
        <CelebrationOverlay
          level={currentLevel}
          isAllComplete={isAllComplete}
          onNextLevel={() => {
            const idx = LEVELS.findIndex(l => l.id === currentLevel.id)
            const next = LEVELS[(idx + 1) % LEVELS.length]
            handleSelectLevel(next)
          }}
          onReplay={handleReset}
        />
      )}
    </div>
  )
}

/**
 * Find connected empty cells that need a specific color, starting from (startRow, startCol).
 */
function findConnectedEmptyCells(
  board: (string | null)[][],
  targetGrid: (string | null)[][],
  startRow: number,
  startCol: number,
  color: string,
  size: number
): { row: number; col: number }[] {
  if (targetGrid[startRow][startCol] !== color) return [{ row: startRow, col: startCol }]

  const visited = new Set<string>()
  const result: { row: number; col: number }[] = []
  const queue: [number, number][] = [[startRow, startCol]]
  visited.add(`${startRow},${startCol}`)

  while (queue.length > 0) {
    const [r, c] = queue.shift()!
    result.push({ row: r, col: c })

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc
      const key = `${nr},${nc}`
      if (
        nr >= 0 && nr < size && nc >= 0 && nc < size &&
        !visited.has(key) &&
        board[nr][nc] === null &&
        targetGrid[nr][nc] === color
      ) {
        visited.add(key)
        queue.push([nr, nc])
      }
    }
  }

  return result
}

/**
 * Find empty cells adjacent to a FILLED cell's connected group that need the same color.
 */
function findAdjacentEmptyCellsForColor(
  board: (string | null)[][],
  targetGrid: (string | null)[][],
  startRow: number,
  startCol: number,
  color: string,
  size: number
): { row: number; col: number }[] {
  const visited = new Set<string>()
  const groupCells: [number, number][] = []
  const queue: [number, number][] = [[startRow, startCol]]
  visited.add(`${startRow},${startCol}`)

  while (queue.length > 0) {
    const [r, c] = queue.shift()!
    groupCells.push([r, c])

    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc
      const key = `${nr},${nc}`
      if (
        nr >= 0 && nr < size && nc >= 0 && nc < size &&
        !visited.has(key) &&
        board[nr][nc] === color
      ) {
        visited.add(key)
        queue.push([nr, nc])
      }
    }
  }

  const emptyResult: { row: number; col: number }[] = []
  const emptyVisited = new Set<string>()

  for (const [gr, gc] of groupCells) {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (const [dr, dc] of dirs) {
      const nr = gr + dr
      const nc = gc + dc
      const key = `${nr},${nc}`
      if (
        nr >= 0 && nr < size && nc >= 0 && nc < size &&
        !emptyVisited.has(key) &&
        board[nr][nc] === null &&
        targetGrid[nr][nc] === color
      ) {
        emptyVisited.add(key)
        emptyResult.push({ row: nr, col: nc })
      }
    }
  }

  return emptyResult
}

export default App
