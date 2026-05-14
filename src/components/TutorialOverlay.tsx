import { useState } from 'react'

interface TutorialOverlayProps {
  onComplete: () => void
}

const STEPS = [
  {
    title: '观察底色',
    desc: '每个格子的底色就是正确答案颜色',
    icon: '🎨',
    visual: 'target',
  },
  {
    title: '找出错位',
    desc: '珠子颜色和底色不一致 = 放错了位置',
    icon: '🔍',
    visual: 'wrong',
  },
  {
    title: '抽出珠子',
    desc: '点击棋盘上的珠子，将它抽到下方托盘',
    icon: '👆',
    visual: 'extract',
  },
  {
    title: '放回正确位置',
    desc: '选中托盘珠子，点击对应底色的空格放入',
    icon: '✅',
    visual: 'place',
  },
]

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const [step, setStep] = useState(0)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full p-6 flex flex-col items-center gap-4">
        {/* Step indicator */}
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-purple-500' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Visual demo */}
        <div className="w-full h-32 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
          <TutorialVisual type={current.visual} />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-2xl mb-1">{current.icon}</p>
          <h3 className="text-lg font-bold text-gray-800">{current.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{current.desc}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full mt-2">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium"
            >
              上一步
            </button>
          )}
          <button
            onClick={() => {
              if (isLast) {
                localStorage.setItem('bead-puzzle-tutorial-done', '1')
                onComplete()
              } else {
                setStep(s => s + 1)
              }
            }}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium"
          >
            {isLast ? '开始游戏' : '下一步'}
          </button>
        </div>

        {/* Skip */}
        <button
          onClick={() => {
            localStorage.setItem('bead-puzzle-tutorial-done', '1')
            onComplete()
          }}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          跳过教程
        </button>
      </div>
    </div>
  )
}

function TutorialVisual({ type }: { type: string }) {
  const cellSize = 28
  const beadSize = 22

  const Cell = ({ bg, bead, highlight }: { bg: string; bead?: string; highlight?: string }) => (
    <div
      className={`flex items-center justify-center border border-black/5 ${highlight || ''}`}
      style={{ width: cellSize, height: cellSize, backgroundColor: `${bg}40` }}
    >
      {bead && (
        <div
          className="rounded-full shadow-bead"
          style={{
            width: beadSize,
            height: beadSize,
            background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, ${bead} 0%, ${bead} 65%, rgba(0,0,0,0.2) 100%)`,
          }}
        />
      )}
    </div>
  )

  if (type === 'target') {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-0">
          <Cell bg="#DC2626" bead="#DC2626" />
          <Cell bg="#2563EB" bead="#2563EB" />
          <Cell bg="#16A34A" bead="#16A34A" />
        </div>
        <p className="text-xs text-gray-400">底色 = 正确颜色</p>
      </div>
    )
  }

  if (type === 'wrong') {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-0">
          <Cell bg="#DC2626" bead="#DC2626" />
          <Cell bg="#2563EB" bead="#16A34A" highlight="ring-2 ring-red-400" />
          <Cell bg="#16A34A" bead="#2563EB" highlight="ring-2 ring-red-400" />
        </div>
        <p className="text-xs text-gray-400">珠子颜色 ≠ 底色 → 错位!</p>
      </div>
    )
  }

  if (type === 'extract') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-0">
          <Cell bg="#DC2626" bead="#DC2626" />
          <Cell bg="#2563EB" bead="#16A34A" highlight="animate-pulse ring-2 ring-yellow-400" />
          <Cell bg="#16A34A" bead="" />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">↓ 抽到托盘</span>
          <div
            className="w-5 h-5 rounded-full shadow-bead"
            style={{ background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, #16A34A 0%, #16A34A 65%, rgba(0,0,0,0.2) 100%)` }}
          />
        </div>
      </div>
    )
  }

  // place
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-0">
        <Cell bg="#DC2626" bead="#DC2626" />
        <Cell bg="#2563EB" bead="" highlight="animate-pulse ring-2 ring-green-400" />
        <Cell bg="#16A34A" bead="#16A34A" />
      </div>
      <div className="flex items-center gap-1">
        <div
          className="w-5 h-5 rounded-full shadow-bead ring-2 ring-purple-400"
          style={{ background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, #2563EB 0%, #2563EB 65%, rgba(0,0,0,0.2) 100%)` }}
        />
        <span className="text-xs text-gray-400">选中 → 点空格放入</span>
      </div>
    </div>
  )
}
