import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { type PuzzleLevel } from '../data/patterns'
import { Sparkles, ArrowRight, RotateCcw, Trophy } from 'lucide-react'

interface CelebrationOverlayProps {
  level: PuzzleLevel
  isAllComplete: boolean
  onNextLevel: () => void
  onReplay: () => void
}

export function CelebrationOverlay({ level, isAllComplete, onNextLevel, onReplay }: CelebrationOverlayProps) {
  useEffect(() => {
    const duration = isAllComplete ? 5000 : 3000
    const end = Date.now() + duration
    const colors = ['#EF4444', '#EC4899', '#FBBF24', '#22C55E', '#3B82F6', '#A855F7']

    const frame = () => {
      confetti({
        particleCount: isAllComplete ? 5 : 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      })
      confetti({
        particleCount: isAllComplete ? 5 : 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    confetti({
      particleCount: isAllComplete ? 200 : 100,
      spread: isAllComplete ? 100 : 70,
      origin: { y: 0.6 },
      colors,
    })
  }, [isAllComplete])

  if (isAllComplete) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
        <div className="bg-card rounded-3xl p-8 shadow-card max-w-sm w-full text-center animate-celebrate">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Trophy size={44} className="text-white" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            全部通关！
          </h2>
          <p className="text-muted-foreground mb-6">
            恭喜你完成了全部10个关卡！你是拼豆大师！
          </p>

          <button
            onClick={onReplay}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-border transition-colors"
          >
            <RotateCcw size={16} />
            <span>重新挑战</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm">
      <div className="bg-card rounded-3xl p-8 shadow-card max-w-sm w-full text-center animate-celebrate">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
          <Sparkles size={36} className="text-primary-foreground" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          拼图完成！
        </h2>
        <p className="text-muted-foreground mb-2">
          你成功完成了「{level.icon} {level.name}」！超级解压～
        </p>
        <p className="text-xs text-muted-foreground mb-6">
          第 {level.order}/10 关
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onNextLevel}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-card hover:opacity-90 transition-opacity"
          >
            <span>下一关</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={onReplay}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-border transition-colors"
          >
            <RotateCcw size={16} />
            <span>再玩一次</span>
          </button>
        </div>
      </div>
    </div>
  )
}
