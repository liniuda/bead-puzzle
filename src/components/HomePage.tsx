import { useState } from 'react'

interface HomePageProps {
  onStart: () => void
}

export function HomePage({ onStart }: HomePageProps) {
  const [pressing, setPressing] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 px-4">
      {/* Decorative beads */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 w-6 h-6 rounded-full bg-red-400 opacity-40 animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-20 right-12 w-5 h-5 rounded-full bg-yellow-400 opacity-40 animate-bounce" style={{ animationDelay: '0.3s' }} />
        <div className="absolute top-40 left-16 w-4 h-4 rounded-full bg-green-400 opacity-40 animate-bounce" style={{ animationDelay: '0.6s' }} />
        <div className="absolute bottom-32 right-8 w-6 h-6 rounded-full bg-blue-400 opacity-40 animate-bounce" style={{ animationDelay: '0.9s' }} />
        <div className="absolute bottom-20 left-10 w-5 h-5 rounded-full bg-purple-400 opacity-40 animate-bounce" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-60 right-20 w-4 h-4 rounded-full bg-pink-400 opacity-40 animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-48 right-24 w-3 h-3 rounded-full bg-orange-400 opacity-40 animate-bounce" style={{ animationDelay: '0.4s' }} />
        <div className="absolute top-32 left-32 w-3 h-3 rounded-full bg-teal-400 opacity-40 animate-bounce" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Bead grid decoration */}
        <div className="grid grid-cols-5 gap-1.5 mb-2">
          {['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6',
            '#FF9F43', '#54A0FF', '#FF6B81', '#2ED573', '#A29BFE',
            '#FD79A8', '#FDCB6E', '#00CEC9', '#6C5CE7', '#E17055',
            '#81ECEC', '#FAB1A0', '#74B9FF', '#55EFC4', '#DFE6E9',
            '#E84393', '#00B894', '#0984E3', '#FDCB6E', '#D63031',
          ].map((color, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full shadow-sm"
              style={{
                backgroundColor: color,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 leading-relaxed">
          <span className="block text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            海妍女士
          </span>
          <span className="block mt-1 text-xl text-gray-600">
            拼豆闯关体验
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center max-w-xs">
          将错位的彩色珠子归位，完成10关像素画拼图挑战
        </p>

        {/* Start button */}
        <button
          className={`
            mt-4 px-10 py-3.5 rounded-full text-white font-semibold text-lg
            bg-gradient-to-r from-pink-500 to-purple-600
            shadow-lg shadow-purple-200
            transition-all duration-200
            ${pressing ? 'scale-95 shadow-md' : 'hover:scale-105 hover:shadow-xl hover:shadow-purple-300'}
            active:scale-95
          `}
          onPointerDown={() => setPressing(true)}
          onPointerUp={() => setPressing(false)}
          onPointerLeave={() => setPressing(false)}
          onClick={onStart}
        >
          开始游戏
        </button>

        {/* Level info */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
          <span>20 关卡</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>20x20 ~ 55x55</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>逐级解锁</span>
        </div>
      </div>
    </div>
  )
}
