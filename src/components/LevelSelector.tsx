import { X, Lock, Check } from 'lucide-react'
import { type PuzzleLevel } from '../data/patterns'

interface LevelSelectorProps {
  levels: PuzzleLevel[]
  currentLevel: PuzzleLevel
  beadColors: Record<string, string>
  unlockedUpTo: number
  completedLevels: string[]
  onSelect: (level: PuzzleLevel) => void
  onClose: () => void
}

export function LevelSelector({
  levels, currentLevel, beadColors,
  unlockedUpTo, completedLevels,
  onSelect, onClose
}: LevelSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm">
      <div className="bg-card rounded-3xl p-5 shadow-card w-full max-w-md animate-celebrate max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">选择关卡</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {levels.map((level) => {
            const isUnlocked = level.order <= unlockedUpTo
            const isCompleted = completedLevels.includes(level.id)
            const isCurrent = currentLevel.id === level.id

            return (
              <button
                key={level.id}
                onClick={() => isUnlocked && onSelect(level)}
                disabled={!isUnlocked}
                className={`
                  relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200
                  ${!isUnlocked
                    ? 'opacity-50 grayscale cursor-not-allowed'
                    : 'hover:shadow-card hover:scale-[1.02]'
                  }
                  ${isCurrent
                    ? 'bg-primary/10 ring-2 ring-primary'
                    : isUnlocked ? 'bg-muted/50 hover:bg-muted' : 'bg-muted/30'
                  }
                `}
              >
                {/* Completed badge */}
                {isCompleted && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}

                {/* Locked overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl bg-black/10">
                    <Lock size={20} className="text-muted-foreground" />
                  </div>
                )}

                <div
                  className="grid gap-0 w-full aspect-square max-w-[100px]"
                  style={{ gridTemplateColumns: `repeat(${Math.min(level.size, 20)}, minmax(0, 1fr))` }}
                >
                  {/* Show a 20x20 sample for preview (downsample large grids) */}
                  {getPreviewGrid(level).map((row, rowIdx) =>
                    row.map((color, colIdx) => (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className="aspect-square rounded-full"
                        style={{
                          backgroundColor: color ? (beadColors[color] || '#ccc') : 'transparent',
                        }}
                      />
                    ))
                  )}
                </div>
                <div className="text-center">
                  <span className="text-xs font-medium text-foreground block">
                    {level.icon} {level.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {level.theme} · {level.size}x{level.size}
                    {' · '}{'★'.repeat(level.difficulty)}{'☆'.repeat(5 - level.difficulty)}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/** Downsample large grids to 20x20 for preview thumbnails */
function getPreviewGrid(level: PuzzleLevel): (string | null)[][] {
  const { grid, size } = level
  if (size <= 20) return grid

  const previewSize = 20
  const step = size / previewSize
  const result: (string | null)[][] = []
  for (let r = 0; r < previewSize; r++) {
    const row: (string | null)[] = []
    for (let c = 0; c < previewSize; c++) {
      const sr = Math.floor(r * step)
      const sc = Math.floor(c * step)
      row.push(grid[sr]?.[sc] ?? null)
    }
    result.push(row)
  }
  return result
}
