'use client'

import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'

export function LoaderComponent() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalTime = 100000

    const interval = 1000

    const increment = (interval / totalTime) * 100

    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return Math.min(prevProgress + increment, 100)
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return <>{progress < 100 && <Progress className="h-3" value={progress} />}</>
}
