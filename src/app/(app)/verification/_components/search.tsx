'use client'

import Money from '@/assets/imgs/10.webp'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LuLoaderCircle } from 'react-icons/lu'
import { useSearchParams } from 'next/navigation' // Importação necessária

export function SearchComponent({ cpf }: { cpf: string }) {
  const searchParams = useSearchParams() // Captura os parâmetros atuais da URL
  const [message, setMessage] = useState<string>(
    'Calculando o valor da sua indenização...'
  )
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const messages = [
      'Buscando valores em contas inativas...',
      'Buscando valores em contas INSS...',
      'Buscando valores em contas FGTS...',
      'Buscando valores em contas PIS...',
      'Buscando valores em contas de CPF...',
      'Buscando valores em contas de CNPJ...',
      'Buscando valores em contas de seguro desemprego...',
    ]

    let currentIndex = 0
    const timer = setInterval(() => {
      setMessage(messages[currentIndex])
      currentIndex = (currentIndex + 1) % messages.length
    }, 12500)

    setTimeout(() => {
      setMessage('R$ 5.960,50 de indenização pronto para ser liberado')
      setLoading(true)
      clearInterval(timer)
    }, 100000)

    return () => clearInterval(timer)
  }, [])

  // Criar uma nova URL preservando os parâmetros existentes e adicionando o CPF
  const params = new URLSearchParams(searchParams.toString()) // Clona os parâmetros existentes
  params.set('cpf', cpf) // Adiciona ou atualiza o CPF na URL

  return (
    <>
      <div className="flex items-center gap-3">
        <Image src={Money} alt="" width="24" height="24" className="size-5" />
        <div className="flex items-center">
          <p className={`${loading ? '' : 'animate-pulse'}`}>{message}</p>
          {!loading && <LuLoaderCircle className="size-4 animate-spin ml-2" />}
        </div>
      </div>

      {loading && (
        <Link
          href={`/chat?${params.toString()}`} // Redirecionando com os parâmetros preservados
          className={cn(
            'inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full mt-2 bg-[#1351B4] hover:bg-[#1351B4]/90 text-white py-2 rounded-full text-sm font-medium'
          )}
        >
          Quero receber minha indenização
        </Link>
      )}
    </>
  )
}
