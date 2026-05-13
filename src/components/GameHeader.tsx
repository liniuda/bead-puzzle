import { RotateCcw, Grid3X3, Lightbulb } from 'lucide-react'
import { type PuzzleLevel } from '../data/patterns'

interface GameHeaderProps {
  level: PuzzleLevel
  progress: number
  beadsInTray: number
  onSelectLevel: () => void
  onReset: () => void
  onHint: () => void
}

export function GameHeader({ level, progress, beadsInTray, onSelectLevel, onReset, onHint }: GameHeaderProps) {
  return (
    <header className="w-full px-3 py-2.5 flex items-center justify-between bg-card/80 backdrop-blur-sm border-b border-border/30">
      <div className="flex items-center gap-2">
        <span className="text-lg">{level.icon}</span>
        <div className="leading-tight">
          <p className="text-xs font-bold text-foreground">{level.name}</p>
          <p className="text-[10px] text-muted-foreground">第{level.order}关 · 待放: {beadsInTray}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 max-w-[140px] mx-3">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] font-bold text-primary">{progress}%</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onHint}
          className="p-1.5 rounded-md bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition-colors"
          title="提示"
        >
          <Lightbulb size={15} />
        </button>
        <button
          onClick={onSelectLevel}
          className="p-1.5 rounded-md bg-muted/60 text-muted-foreground hover:bg-muted transition-colors"
        >
          <Grid3X3 size={15} />
        </button>
        <button
          onClick={onReset}
          className="p-1.5 rounded-md bg-muted/60 text-muted-foreground hover:bg-muted transition-colors"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </header>
  )
}
