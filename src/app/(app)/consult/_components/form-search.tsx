'use client'

import { SearchCpfAction } from '@/actions/search-cpf'
import { cn } from '@/lib/utils'
import { SearchCpfSchema } from '@/schemas/search-cpf'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputMask } from '@react-input/mask'
import { useAction } from 'next-safe-action/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuLoaderCircle } from 'react-icons/lu'
import type { z } from 'zod'

export function FormSearchCpf() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof SearchCpfSchema>>({
    resolver: zodResolver(SearchCpfSchema),
  })

  const router = useRouter()
  const searchParams = useSearchParams() // Obtendo parâmetros atuais da URL

  const [messageError, setMessageError] = useState<string | undefined>(
    undefined
  )

  const { execute, isPending } = useAction(SearchCpfAction, {
    onSuccess({ data, input }) {
      if (data?.success === true) {
        const cpf = input.cpf
  
        // Criando um novo objeto de parâmetros, preservando os existentes
        const params = new URLSearchParams(searchParams.toString())
        params.set('cpf', cpf) // Adicionando/Atualizando o CPF
  
        // Redirecionar para /verification com os parâmetros atualizados
        router.push(`/verification?${params.toString()}`)
      } else {
        setMessageError(data?.message)
      }
    },
  })
  
  const onSubmit = (data: z.infer<typeof SearchCpfSchema>) => {
    execute(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
      <div className="space-y-1">
        <label htmlFor="cpf" className="text-sm font-semibold text-[#333333]">
          CPF
        </label>

        <InputMask
          mask="___.___.___-__"
          replacement={{ _: /\d/ }}
          {...register('cpf')}
          type="tel"
          id="cpf"
          placeholder="Digite seu CPF"
          className="w-full h-10 px-3 border text-base placeholder:font-light text-black rounded focus:ring-0 focus:border-transparent placeholder:italic"
        />

        {errors.cpf && (
          <p className="text-red-500 text-xs">{errors.cpf.message}</p>
        )}

        {messageError && errors.cpf === undefined && (
          <p className="text-red-500 text-xs">{messageError}</p>
        )}
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className={cn(
            'inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 w-full bg-[#1351B4] hover:bg-[#1351B4]/90 text-white py-2 rounded-full text-sm font-medium'
          )}
        >
          {isSubmitting || isPending ? (
            <LuLoaderCircle className="size-4 animate-spin" />
          ) : (
            'Consultar indenização'
          )}
        </button>
      </div>
    </form>
  )
}
