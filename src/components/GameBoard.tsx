import { useState, useRef, useCallback } from 'react'
import { type PuzzleLevel } from '../data/patterns'
import { type TraySlotBead } from '../App'

interface GameBoardProps {
  level: PuzzleLevel
  board: (string | null)[][]
  selectedTrayBead: TraySlotBead | null | undefined
  hintCell: string | null  // "row,col" of highlighted hint cell
  checkMode: boolean
  onCellClick: (row: number, col: number) => void
  beadColors: Record<string, string>
}

const SCROLL_THRESHOLD = 32
const MIN_CELL_PX = 11
const MAX_VIEWPORT = 360

export function GameBoard({ level, board, selectedTrayBead, hintCell, checkMode, onCellClick, beadColors }: GameBoardProps) {
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
          const isCorrect = cellColor === targetColor

          // Check mode: dim correct beads, highlight wrong ones
          const checkDim = checkMode && isCorrect
          const checkHighlight = checkMode && isWrong

          return (
            <div
              key={cellKey}
              className={`
                flex items-center justify-center cursor-pointer
                transition-all duration-150 border border-black/5
                ${isNew ? 'animate-bead-pop' : ''}
                ${isExtracting ? 'animate-bead-remove' : ''}
                ${isHinted ? 'ring-2 ring-yellow-400 animate-pulse z-10' : ''}
                ${checkHighlight ? 'ring-2 ring-red-500 z-10' : ''}
              `}
              style={{ backgroundColor: `${bgColor}40` }}
              onClick={() => handleClick(rowIdx, colIdx)}
            >
              <div
                className={`
                  w-[90%] h-[90%] rounded-full relative overflow-hidden shadow-bead
                  ${isWrong && !checkMode ? 'ring-1 ring-red-400/40' : ''}
                  ${checkDim ? 'opacity-30' : ''}
                  ${checkHighlight ? 'animate-pulse' : ''}
                `}
                style={{
                  background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45) 0%, transparent 50%), radial-gradient(circle at 50% 50%, ${beadColor} 0%, ${beadColor} 65%, rgba(0,0,0,0.2) 100%)`,
                }}
              >
                {cellPx >= 14 && (
                  <>
                    <div className="absolute top-[10%] left-[15%] w-[22%] h-[18%] rounded-full bg-white/50 blur-[0.5px]" />
                    <div className="absolute bottom-[15%] right-[18%] w-[10%] h-[10%] rounded-full bg-white/20" />
                  </>
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
      <ZoomableBoard maxViewport={MAX_VIEWPORT} boardTotalPx={boardTotalPx}>
        {gridContent}
      </ZoomableBoard>
    )
  }

  return (
    <div className="gradient-board rounded-xl p-2 shadow-board">
      {gridContent}
    </div>
  )
}

/** Zoomable/pannable wrapper for large boards */
function ZoomableBoard({ children, maxViewport, boardTotalPx }: { children: React.ReactNode; maxViewport: number; boardTotalPx: number }) {
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const pinchRef = useRef<{ startDist: number; startScale: number } | null>(null)
  const panRef = useRef<{ startX: number; startY: number; startTx: number; startTy: number } | null>(null)
  const lastTapRef = useRef<number>(0)

  const minScale = 1
  const maxScale = 3

  const clampTranslate = useCallback((tx: number, ty: number, s: number) => {
    const overflow = (boardTotalPx * s - maxViewport) / 2
    if (overflow <= 0) return { x: 0, y: 0 }
    return {
      x: Math.max(-overflow, Math.min(overflow, tx)),
      y: Math.max(-overflow, Math.min(overflow, ty)),
    }
  }, [boardTotalPx, maxViewport])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch start
      const dx = e.touches[1].clientX - e.touches[0].clientX
      const dy = e.touches[1].clientY - e.touches[0].clientY
      pinchRef.current = { startDist: Math.hypot(dx, dy), startScale: scale }
      panRef.current = null
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan start (only when zoomed)
      panRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startTx: translate.x,
        startTy: translate.y,
      }
    }
  }, [scale, translate])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault()
      const dx = e.touches[1].clientX - e.touches[0].clientX
      const dy = e.touches[1].clientY - e.touches[0].clientY
      const dist = Math.hypot(dx, dy)
      const newScale = Math.max(minScale, Math.min(maxScale, pinchRef.current.startScale * (dist / pinchRef.current.startDist)))
      setScale(newScale)
      setTranslate(prev => clampTranslate(prev.x, prev.y, newScale))
    } else if (e.touches.length === 1 && panRef.current && scale > 1) {
      const dx = e.touches[0].clientX - panRef.current.startX
      const dy = e.touches[0].clientY - panRef.current.startY
      const newT = clampTranslate(panRef.current.startTx + dx, panRef.current.startTy + dy, scale)
      setTranslate(newT)
    }
  }, [scale, clampTranslate])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      pinchRef.current = null
      panRef.current = null

      // Double-tap to zoom
      const now = Date.now()
      if (now - lastTapRef.current < 300) {
        if (scale > 1) {
          setScale(1)
          setTranslate({ x: 0, y: 0 })
        } else {
          setScale(2)
        }
      }
      lastTapRef.current = now
    }
  }, [scale])

  return (
    <div className="gradient-board rounded-xl p-2 shadow-board">
      <div
        ref={containerRef}
        className="overflow-hidden rounded-lg relative"
        style={{ width: maxViewport, height: maxViewport }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: pinchRef.current || panRef.current ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          {children}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-1.5">
        <button
          onClick={() => { const s = Math.min(maxScale, scale + 0.5); setScale(s); setTranslate(clampTranslate(translate.x, translate.y, s)) }}
          className="text-xs px-2 py-0.5 rounded bg-white/20 text-white/70"
        >+</button>
        <span className="text-[10px] text-white/50">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => { const s = Math.max(minScale, scale - 0.5); setScale(s); setTranslate(clampTranslate(translate.x, translate.y, s)) }}
          className="text-xs px-2 py-0.5 rounded bg-white/20 text-white/70"
        >-</button>
      </div>
    </div>
  )
}
