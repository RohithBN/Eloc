'use client'

interface TimerProps {
  seconds: number
  isRunning: boolean
  onStart: () => void
  onStop: () => void
  onReset: () => void
  initialSeconds: number
  label: string
  stopLabel?: string // NEW PROP
}

export default function Timer({
  seconds,
  isRunning,
  onStart,
  onStop,
  onReset,
  initialSeconds,
  label,
  stopLabel
}: TimerProps) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const progress = ((initialSeconds - seconds) / initialSeconds) * 100

  return (
    <div className="w-full max-w-md mx-auto animate-slideUp">
      <div className="text-center mb-10">
        <p className="text-xs font-bold text-zinc-600 uppercase tracking-[0.2em] mb-8">
          {label}
        </p>
        <div className="relative w-56 h-56 mx-auto mb-8 drop-shadow-2xl">
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="90" fill="none" stroke="#18181b" strokeWidth="4" />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray={`${(progress / 100) * 565.48} 565.48`}
              strokeLinecap="round"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-light tracking-tighter text-white tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-full transition-colors min-w-[8rem]"
          >
            Start
          </button>
        ) : (
          <button
            onClick={onStop}
            className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-full transition-colors min-w-[8rem] border border-zinc-700"
          >
            {stopLabel || 'Pause'}
          </button>
        )}
        <button
          onClick={onReset}
          className="px-8 py-3 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 font-medium rounded-full transition-colors min-w-[8rem] border border-zinc-800"
        >
          Reset
        </button>
      </div>
    </div>
  )
}