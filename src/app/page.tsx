'use client'

import { useState, useEffect } from 'react'
import TopicDisplay from '@/components/TopicDisplay'
import Timer from '@/components/Timer'
import AudioRecorder from '@/components/AudioRecorder'
import Settings from '@/components/Settings'

type Stage = 'topic' | 'prep' | 'speaking' | 'review'

const DEEP_TOPICS = [
  "The paradox of choice: Does having endless options paralyze our ability to be happy?",
  "If human lifespans were doubled to 160 years, how would society and relationships fundamentally change?",
  "The morality of artificial intelligence: Should machines be programmed to make ethical decisions?",
  "Is absolute privacy a fundamental human right, or a modern illusion in the digital age?",
  "The attention economy: How the commodification of our focus is altering human cognition.",
  "Should humanity prioritize colonizing other planets, or focus entirely on preserving Earth?",
  "Intelligence vs. Wisdom: Why technological advancement doesn't always equal human progress.",
  "The death of boredom: What do we lose when we are constantly stimulated and entertained?",
  "Is the pursuit of happiness a flawed goal? Should we seek meaning and responsibility instead?",
  "The impact of instantaneous global communication on deep, meaningful human connections."
]

export default function Home() {
  const [stage, setStage] = useState<Stage>('topic')
  const [topic, setTopic] = useState<string | null>(null)
  const [isLoadingTopic, setIsLoadingTopic] = useState(false)
  const [prepTime, setPrepTime] = useState(5 * 60)
  const [speakTime, setSpeakTime] = useState(60)
  const [prepSeconds, setPrepSeconds] = useState(prepTime)
  const [speakSeconds, setSpeakSeconds] = useState(speakTime)
  const [isPrepRunning, setIsPrepRunning] = useState(false)
  const [isSpeakRunning, setIsSpeakRunning] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)

  // BUG FIX: Stable interval hooks that don't reset themselves every second
  useEffect(() => {
    if (!isPrepRunning) return
    const interval = setInterval(() => {
      setPrepSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [isPrepRunning])

  useEffect(() => {
    if (!isSpeakRunning) return
    const interval = setInterval(() => {
      setSpeakSeconds((prev) => (prev > 0 ? prev - 1 : 0))
      setRecordingTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isSpeakRunning])

  // Manage Auto-Transitions securely
  useEffect(() => {
    if (stage === 'prep' && prepSeconds === 0 && isPrepRunning) {
      setIsPrepRunning(false)
      setStage('speaking')
      setSpeakSeconds(speakTime)
      setIsSpeakRunning(true) // Automatically start mic
    }
  }, [stage, prepSeconds, isPrepRunning, speakTime])

  useEffect(() => {
    if (stage === 'speaking' && speakSeconds === 0 && isSpeakRunning) {
      handleFinishSpeaking() // Force stop if timer hits 0
    }
  }, [stage, speakSeconds, isSpeakRunning])

  const generateTopic = () => {
    setIsLoadingTopic(true)
    setTimeout(() => {
      let randomTopic = topic;
      while (randomTopic === topic) {
        randomTopic = DEEP_TOPICS[Math.floor(Math.random() * DEEP_TOPICS.length)]
      }
      setTopic(randomTopic)
      setIsLoadingTopic(false)
    }, 600)
  }

  const startSession = () => {
    setStage('prep')
    setPrepSeconds(prepTime)
    setSpeakSeconds(speakTime)
    setRecordingTime(0)
    setAudioBlob(null)
  }

  const handleFinishSpeaking = () => {
    setIsSpeakRunning(false) // This kills the microphone instantly
    
    // Safety Net: Just in case the mic takes too long to save, force the screen to 'review' anyway
    setTimeout(() => {
      setStage((prev) => (prev === 'speaking' ? 'review' : prev))
    }, 1500)
  }

  const handleAudioComplete = (blob: Blob) => {
    setAudioBlob(blob)
    setStage('review') // Proceed to review once the blob is saved
  }

  const downloadRecording = () => {
    if (!audioBlob) return
    const url = URL.createObjectURL(audioBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `speech-${new Date().getTime()}.webm`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetSession = () => {
    setStage('topic')
    setTopic(null)
    setPrepSeconds(prepTime)
    setSpeakSeconds(speakTime)
    setRecordingTime(0)
    setAudioBlob(null)
    setIsPrepRunning(false)
    setIsSpeakRunning(false)
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-black">
      
      <div className="absolute inset-0 bg-grid-pattern bg-grid-mask pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />

      <Settings
        prepTime={prepTime}
        speakTime={speakTime}
        onPrepTimeChange={setPrepTime}
        onSpeakTimeChange={setSpeakTime}
      />

      <div className="max-w-2xl w-full z-10">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-sm">
            Master your pitch.
          </h1>
          <p className="text-zinc-400 text-lg">Elevate your presentation skills with guided practice.</p>
        </div>

        {stage === 'topic' && (
          <div className="space-y-10">
            <TopicDisplay
              topic={topic}
              onGenerateTopic={generateTopic}
              isLoading={isLoadingTopic}
            />
            {topic && (
              <div className="flex justify-center animate-slideUp">
                <button
                  onClick={startSession}
                  className="px-8 py-4 bg-white text-black hover:bg-zinc-200 font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105"
                >
                  Begin Practice Session
                </button>
              </div>
            )}
          </div>
        )}

        {stage === 'prep' && (
          <div className="space-y-8 animate-slideUp">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-8 text-center shadow-2xl">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 font-medium text-xl mb-3">{topic}</p>
              <p className="text-zinc-500 text-sm">Organize your thoughts. Preparation is key.</p>
            </div>
            <Timer
              seconds={prepSeconds}
              isRunning={isPrepRunning}
              onStart={() => setIsPrepRunning(true)}
              onStop={() => setIsPrepRunning(false)}
              onReset={() => setPrepSeconds(prepTime)}
              initialSeconds={prepTime}
              label="Preparation Phase"
            />
          </div>
        )}

        {stage === 'speaking' && (
          <div className="space-y-8 animate-slideUp">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400 font-medium text-xl mb-4">{topic}</p>
              <AudioRecorder
                isRecording={isSpeakRunning}
                onRecordingComplete={handleAudioComplete}
              />
            </div>
            <Timer
              seconds={speakSeconds}
              isRunning={isSpeakRunning}
              onStart={() => setIsSpeakRunning(true)}
              onStop={handleFinishSpeaking} // Swapped simple pause for explicit Finish Early
              onReset={() => {
                setSpeakSeconds(speakTime)
                setRecordingTime(0)
                setAudioBlob(null)
              }}
              initialSeconds={speakTime}
              label="Speaking Phase"
              stopLabel="Finish Speech"
            />
          </div>
        )}

        {stage === 'review' && (
          <div className="space-y-8 animate-slideUp">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 rounded-3xl p-10 text-center shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Session Complete</h2>
              <p className="text-zinc-400 mb-8">
                You held the floor for{' '}
                <span className="text-white font-medium">
                  {Math.floor(recordingTime / 60)}m {recordingTime % 60}s
                </span>
              </p>

              {audioBlob ? (
                <div className="bg-black/50 border border-zinc-800 rounded-2xl p-6 mb-8 animate-fadeIn">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Your Recording</p>
                  <audio controls className="w-full mb-6 filter invert grayscale opacity-90" src={URL.createObjectURL(audioBlob)} />
                  <button
                    onClick={downloadRecording}
                    className="w-full px-6 py-3 bg-zinc-100 hover:bg-white text-black font-semibold rounded-xl transition-colors"
                  >
                    Download Audio
                  </button>
                </div>
              ) : (
                <div className="bg-zinc-900/50 rounded-2xl p-6 mb-8 border border-zinc-800 border-dashed">
                  <p className="text-zinc-500 text-sm">Processing audio... if it doesn't appear, your mic may have failed.</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetSession}
                className="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-semibold rounded-full transition-colors shadow-lg"
              >
                Back to Topic Selection
              </button>
              <button
                onClick={() => {
                  setStage('prep')
                  setPrepSeconds(prepTime)
                  setSpeakSeconds(speakTime)
                  setRecordingTime(0)
                  setAudioBlob(null)
                  setIsSpeakRunning(false)
                }}
                className="px-8 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-semibold rounded-full transition-colors"
              >
                Retry Same Topic
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}