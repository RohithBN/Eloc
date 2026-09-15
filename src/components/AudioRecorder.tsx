'use client'

import { useEffect, useRef, useState } from 'react'

interface AudioRecorderProps {
  isRecording: boolean
  onRecordingComplete?: (blob: Blob) => void
}

export default function AudioRecorder({
  isRecording,
  onRecordingComplete,
}: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // BUG FIX: Store the callback in a ref so it doesn't trigger endless re-renders
  const onCompleteRef = useRef(onRecordingComplete)
  useEffect(() => {
    onCompleteRef.current = onRecordingComplete
  }, [onRecordingComplete])

  useEffect(() => {
    const initRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        streamRef.current = stream
        const mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          onCompleteRef.current?.(blob)
          chunksRef.current = []
        }

        mediaRecorderRef.current = mediaRecorder
        setIsInitialized(true)
      } catch (err) {
        setError('Microphone access denied. Please allow microphone access.')
        console.error('Failed to initialize recorder:', err)
      }
    }

    initRecorder()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, []) // <-- BUG FIX: Empty dependency array prevents mic from resetting every second

  useEffect(() => {
    if (!isInitialized || !mediaRecorderRef.current) return

    if (isRecording) {
      if (mediaRecorderRef.current.state === 'inactive') {
        chunksRef.current = []
        mediaRecorderRef.current.start()
      }
    } else {
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [isRecording, isInitialized])

  if (error) {
    return (
      <div className="bg-red-950/40 border border-red-900 text-red-400 px-4 py-3 rounded-xl text-sm">
        {error}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 text-sm h-6">
      {isRecording ? (
        <>
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulseGlow"></div>
          <span className="text-zinc-300 font-medium tracking-wide">Recording active...</span>
        </>
      ) : (
        <span className="text-zinc-600">Mic standby</span>
      )}
    </div>
  )
}