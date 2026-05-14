import { type TraySlotBead } from '../App'

interface BeadTrayProps {
  tray: (TraySlotBead | null)[]
  selectedIdx: number | null
  onSlotClick: (idx: number) => void
  beadColors: Record<string, string>
}

export function BeadTray({ tray, selectedIdx, onSlotClick, beadColors }: BeadTrayProps) {
  const slotSize = 36
  const beadSize = 26

  return (
    <div className="w-full bg-card border-t border-border/50 px-3 pb-5 pt-3">
      {/* Label */}
      <p className="text-[10px] text-center text-muted-foreground mb-2 font-medium tracking-widest uppercase">
        拼 豆
      </p>

      {/* Fixed grid of tray slots */}
      <div className="flex justify-center flex-wrap gap-[5px]">
        {tray.map((slot, idx) => {
          const isSelected = selectedIdx === idx
          const hasBead = slot !== null

          return (
            <button
              key={idx}
              onClick={() => onSlotClick(idx)}
              disabled={!hasBead}
              className={`
                flex items-center justify-center rounded-lg transition-all duration-150
                border-2
                ${isSelected
                  ? 'border-primary bg-primary/10 scale-110 shadow-palette'
                  : hasBead
                    ? 'border-border/50 bg-muted/20 hover:border-primary/40'
                    : 'border-dashed border-border/30 bg-muted/5'
                }
              `}
              style={{ width: slotSize, height: slotSize }}
            >
              {hasBead && (
                <div
                  className="rounded-full shadow-bead relative overflow-hidden"
                  style={{
                    width: beadSize,
                    height: beadSize,
                    background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45) 0%, transparent 50%), radial-gradient(circle at 50% 50%, ${beadColors[slot.color] || '#ccc'} 0%, ${beadColors[slot.color] || '#ccc'} 65%, rgba(0,0,0,0.2) 100%)`,
                  }}
                >
                  <div className="absolute top-[10%] left-[15%] w-[22%] h-[18%] rounded-full bg-white/50 blur-[0.5px]" />
                  <div className="absolute bottom-[15%] right-[18%] w-[10%] h-[10%] rounded-full bg-white/20" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Hint text */}
      <p className="text-[9px] text-center text-muted-foreground mt-2">
        点击棋盘珠子抽出 · 点击底部珠子放入空位
      </p>
    </div>
  )
}
