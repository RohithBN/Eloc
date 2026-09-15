'use client'

import { useState } from 'react'

interface SettingsProps {
  prepTime: number
  speakTime: number
  onPrepTimeChange: (time: number) => void
  onSpeakTimeChange: (time: number) => void
}

export default function Settings({
  prepTime,
  speakTime,
  onPrepTimeChange,
  onSpeakTimeChange,
}: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full flex items-center justify-center transition-all shadow-2xl hover:scale-105"
        title="Settings"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 w-72 shadow-2xl animate-slideUp">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Configuration</h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-medium text-zinc-300">Prep Time</label>
                <span className="text-xs text-zinc-500">{Math.floor(prepTime / 60)}m {prepTime % 60}s</span>
              </div>
              <input
                type="range"
                min="30"
                max="600"
                step="30"
                value={prepTime}
                onChange={(e) => onPrepTimeChange(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex gap-2 mt-3">
                {[1, 3, 5].map((min) => (
                  <button
                    key={min}
                    onClick={() => onPrepTimeChange(min * 60)}
                    className="flex-1 py-1 text-[10px] uppercase tracking-wider font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded transition-colors"
                  >
                    {min}m
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-medium text-zinc-300">Speaking Time</label>
                <span className="text-xs text-zinc-500">{Math.floor(speakTime / 60)}m {speakTime % 60}s</span>
              </div>
              <input
                type="range"
                min="30"
                max="600"
                step="30"
                value={speakTime}
                onChange={(e) => onSpeakTimeChange(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex gap-2 mt-3">
                {[1, 2, 5].map((min) => (
                  <button
                    key={min}
                    onClick={() => onSpeakTimeChange(min * 60)}
                    className="flex-1 py-1 text-[10px] uppercase tracking-wider font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded transition-colors"
                  >
                    {min}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}