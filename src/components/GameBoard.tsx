import { useState } from 'react'
import { type PuzzleLevel } from '../data/patterns'
import { type TraySlotBead } from '../App'

interface GameBoardProps {
  level: PuzzleLevel
  board: (string | null)[][]
  selectedTrayBead: TraySlotBead | null | undefined
  hintCell: string | null  // "row,col" of highlighted hint cell
  onCellClick: (row: number, col: number) => void
  beadColors: Record<string, string>
}

const SCROLL_THRESHOLD = 32
const MIN_CELL_PX = 11
const MAX_VIEWPORT = 360

export function GameBoard({ level, board, selectedTrayBead, hintCell, onCellClick, beadColors }: GameBoardProps) {
  const [justPlaced, setJustPlaced] = useState<string | null>(null)
  const [justExtracted, setJustExtracted] = useState<Set<string>>(new Set())

  // For small boards: fit in viewport. For large boards: fixed cell size with scroll
  const needsScroll = level.size > SCROLL_THRESHOLD
  const cellPx = needsScroll
    ? MIN_CELL_PX
    : Math.min(18, Math.floor(MAX_VIEWPORT / level.size))

  const boardTotalPx = level.size * cellPx

  const handleClick = (row: number, col: number) => {
    const cellColor = board[row][col]
    const cellKey = `${row},${col}`

    if (selectedTrayBead && cellColor === null) {
      setJustPlaced(cellKey)
      setTimeout(() => setJustPlaced(null), 400)
    } else if (cellColor !== null && !selectedTrayBead) {
      setJustExtracted(new Set([cellKey]))
      setTimeout(() => setJustExtracted(new Set()), 300)
    }

    onCellClick(row, col)
  }

  const gridContent = (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${level.size}, ${cellPx}px)`,
        gridTemplateRows: `repeat(${level.size}, ${cellPx}px)`,
        gap: '0px',
        width: `${boardTotalPx}px`,
        height: `${boardTotalPx}px`,
      }}
    >
      {board.map((row, rowIdx) =>
        row.map((cellColor, colIdx) => {
          const cellKey = `${rowIdx},${colIdx}`
          const targetColor = level.grid[rowIdx][colIdx]
          const isPatternCell = targetColor !== null
          const isNew = justPlaced === cellKey
          const isExtracting = justExtracted.has(cellKey)
          const isEmpty = cellColor === null
          const hasSelectedBead = selectedTrayBead !== null && selectedTrayBead !== undefined

          if (!isPatternCell) {
            return <div key={cellKey} className="bg-white/5" />
          }

          const bgColor = beadColors[targetColor] || '#ccc'

          if (isEmpty) {
            return (
              <div
                key={cellKey}
                className={`
                  flex items-center justify-center cursor-pointer
                  transition-all duration-150 border border-black/5
                  ${hasSelectedBead ? 'animate-pulse-soft' : ''}
                `}
                style={{ backgroundColor: `${bgColor}40` }}
                onClick={() => handleClick(rowIdx, colIdx)}
              >
                <div
                  className="w-[60%] h-[60%] rounded-full opacity-30"
                  style={{ backgroundColor: bgColor }}
                />
              </div>
            )
          }

          const beadColor = beadColors[cellColor!] || '#ccc'
          const isWrong = cellColor !== targetColor
          const isHinted = hintCell === cellKey

          return (
            <div
              key={cellKey}
              className={`
                flex items-center justify-center cursor-pointer
                transition-all duration-150 border border-black/5
                ${isNew ? 'animate-bead-pop' : ''}
                ${isExtracting ? 'animate-bead-remove' : ''}
                ${isHinted ? 'ring-2 ring-yellow-400 animate-pulse z-10' : ''}
              `}
              style={{ backgroundColor: `${bgColor}40` }}
              onClick={() => handleClick(rowIdx, colIdx)}
            >
              <div
                className={`
                  w-[90%] h-[90%] rounded-full relative overflow-hidden shadow-bead
                  ${isWrong ? 'ring-1 ring-red-400/40' : ''}
                `}
                style={{ backgroundColor: beadColor }}
              >
                {cellPx >= 14 && (
                  <div className="absolute top-[8%] left-[12%] w-[20%] h-[20%] rounded-full bg-white/30" />
                )}
              </div>
            </div>
          )
        })
      )}
    </div>
  )

  if (needsScroll) {
    return (
      <div className="gradient-board rounded-xl p-2 shadow-board">
        <div
          className="overflow-auto rounded-lg touch-pan-x touch-pan-y"
          style={{
            maxWidth: `${MAX_VIEWPORT}px`,
            maxHeight: `${MAX_VIEWPORT}px`,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {gridContent}
        </div>
        <p className="text-xs text-center text-white/50 mt-1">滑动查看完整棋盘</p>
      </div>
    )
  }

  return (
    <div className="gradient-board rounded-xl p-2 shadow-board">
      {gridContent}
    </div>
  )
}
