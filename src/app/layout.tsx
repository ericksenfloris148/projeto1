import type { Metadata } from 'next'
import './globals.css'
import { ClarityScript } from '@/components/clarity'
import { FacebookPixel } from '@/components/facebook-pixel'
import { XtrackyScript } from '@/components/xtracky'
import { env } from '@/lib/env'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: {
    template: 'Atendimento - %s',
    absolute: 'Aetndimento',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className="antialiased">
        <ClarityScript id={env.NEXT_PUBLIC_CLARITY} />
        <XtrackyScript token={env.NEXT_PUBLIC_XTRACKY} />
        <FacebookPixel pixel={env.NEXT_PUBLIC_FACEBOOK_PIXEL} />
        <div className="w-full max-w-xl mx-auto">{children}</div>
        <Analytics/>
      </body>
    </html>
  )
}
