'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface CircularProgressBarProps {
  size?: number
  strokeWidth?: number
  circleColor?: string
  progressColor?: string
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size = 350,
  strokeWidth = 12,
  circleColor = 'text-[#E5F0FF]',
  progressColor = 'text-[#1351B4]',
}) => {
  const [timeLeft, setTimeLeft] = useState(9)
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (timeLeft <= 0) return

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId)

          // Criar uma string com os parâmetros para a próxima página
          const params = new URLSearchParams(searchParams).toString()

          router.push(`/consult?${params}`)
          return 0
        }
        return prevTime - 1
      })

      setProgress(prevProgress => {
        const newProgress = prevProgress + 100 / 9
        return Math.min(newProgress, 100)
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timeLeft, router, searchParams])

  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const progressOffset = circumference - (progress / 100) * circumference

  const formatTime = (seconds: number) => {
    return `0:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <title>Circular ProgressBar</title>
        <circle
          className={`${circleColor} stroke-current`}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
        <circle
          className={`${progressColor} stroke-current`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: progressOffset,
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex max-w-[200px] mx-auto flex-col items-center justify-center text-xs gap-6 font-medium text-zinc-500">
        <p className="text-center font-bold text-base text-[#1351B4]">
          Você poderá iniciar a consulta em
        </p>
        <h2 className="text-[#1351B4] font-black text-5xl">
          {formatTime(timeLeft)}
        </h2>
        <p className="text-center font-medium text-sm">
          Aguarde até o círculo azul se formar por completo.
        </p>
      </div>
    </div>
  )
}

export { CircularProgressBar }
