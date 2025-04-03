import { Suspense } from 'react'; // Importando o Suspense
import { CircularProgressBar } from '@/components/circle-progress-bar'
import CircleQuestion from '@/assets/imgs/circle-question-solid.svg'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Fila de espera',
}

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#1351B4] p-5">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <Suspense fallback={<div>Carregando...</div>}>
          {/* Colocando Suspense para envolver qualquer lógica assíncrona */}

          <h2 className="text-xl font-bold text-[#1351B4] mb-5 leading-tight">
            Sua vez está chegando
          </h2>

          <p className="text-[#606060] text-sm font-medium text-center leading-relaxed mb-10">
            Você está numa sala de espera virtual e vamos liberar o seu acesso
            para realizar sua consulta, aguarde.
          </p>

          <CircularProgressBar />

          <div className="flex items-center justify-center pt-16">
            <button
              type="button"
              className="text-[#1351B4] hover:text-[#1351B4]/90 text-lg hover:underline flex items-center justify-center gap-3"
            >
              <div className="relative size-4">
                <Image alt="logo" fill priority src={CircleQuestion} />
              </div>
              <span className="text-[#1351B4] font-medium text-xs">
                Está com dúvidas e precisa de ajuda?
              </span>
            </button>
          </div>
        </Suspense>
      </div>
    </div>
  )
}
