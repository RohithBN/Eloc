'use client'

interface TopicDisplayProps {
  topic: string | null
  onGenerateTopic: () => void
  isLoading?: boolean
}

export default function TopicDisplay({
  topic,
  onGenerateTopic,
  isLoading = false,
}: TopicDisplayProps) {
  return (
    <div className="w-full max-w-2xl animate-slideUp">
      <div className="text-center mb-10">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">
          Speaking Prompt
        </p>

        {topic ? (
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/80 rounded-3xl p-10 md:p-14 mb-8 shadow-2xl transition-all hover:border-zinc-500/80 relative overflow-hidden group min-h-[200px] flex items-center justify-center">
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
            
            {/* Decorative Quotes */}
            <div className="absolute top-4 left-6 text-7xl font-serif text-white/5 select-none z-0">"</div>
            <div className="absolute bottom-[-1rem] right-6 text-7xl font-serif text-white/5 select-none z-0 rotate-180">"</div>

            {/* Gradient Text */}
            <h2 className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500 leading-relaxed relative z-10 text-center tracking-tight">
              {topic}
            </h2>
          </div>
        ) : (
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-700/60 border-dashed rounded-3xl p-12 mb-8 h-48 flex items-center justify-center relative overflow-hidden group transition-all hover:border-zinc-500 hover:bg-zinc-900/60">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-zinc-400 font-medium relative z-10 text-lg">Generate a topic to begin.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onGenerateTopic}
          disabled={isLoading}
          className="relative group flex items-center justify-center px-8 py-3.5 bg-white hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-bold rounded-full transition-all duration-300 min-w-[220px] shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-105"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Prompt'
          )}
        </button>
      </div>
    </div>
  )
}