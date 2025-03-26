'use client'

import { env } from '@/lib/env'
import { Standard } from '@typebot.io/nextjs'
import { useCallback, useRef } from 'react'

interface UtmTracking {
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
}

interface TypebotProps {
  cpf?: string
  nome?: string
  sexo?: string
  nascimento?: string
  mae?: string
  utmTracking?: UtmTracking
}

export function Typebot({ cpf, nome, sexo, nascimento, mae, utmTracking }: TypebotProps) {
  const attemptRef = useRef(0)

  const parseUtmTracking = useCallback(
    (utmData: string | UtmTracking | undefined): UtmTracking => {
      if (!utmData) return {}

      try {
        if (typeof utmData === 'object') return utmData
        return JSON.parse(utmData)
      } catch (error) {
        console.error('Erro ao fazer parse das UTMs:', error)
        return {}
      }
    },
    []
  )

  const buildCheckoutUrl = useCallback(() => {
    const params = new URLSearchParams()
    const utmData = parseUtmTracking(utmTracking)

    for (const [key, value] of Object.entries(utmData)) {
      if (value && value !== 'null') {
        params.append(key, value)
      }
    }

    const queryString = params.toString()
    return queryString
      ? `${env.NEXT_PUBLIC_CHECKOUT_URL}?${queryString}`
      : env.NEXT_PUBLIC_CHECKOUT_URL
  }, [utmTracking, parseUtmTracking])

  return (
    <Standard
      apiHost={env.NEXT_PUBLIC_TYPEBOT_URL}
      typebot={env.NEXT_PUBLIC_TYPEBOT_SLUG}
      className="rounded-lg"
      style={{ width: '100%', height: '600px' }}
      prefilledVariables={{
        cpf,
        nome,
        sexo,
        nascimento,
        mae
      }}
      /*
      onEnd={() => {
        setTimeout(() => {
          if (attemptRef.current === 1) {
            const checkoutUrl = buildCheckoutUrl()

            window.location.href = checkoutUrl
          }
          attemptRef.current++
        }, 2000)
      }}
      */
    />
  )
}
