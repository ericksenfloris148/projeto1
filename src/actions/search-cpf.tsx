'use server'
import { env } from '@/lib/env'
import httpFetch from '@/lib/http-fetch'
import { actionClient } from '@/lib/safe-action'
import {
  type ResponseData,
  type ResponseError,
  SearchCpfSchema,
} from '@/schemas/search-cpf'
import { cookies } from 'next/headers'

export const SearchCpfAction = actionClient
  .schema(SearchCpfSchema)
  .action(async ({ parsedInput: { cpf } }) => {
    try {
      const formattedCpf = cpf.replace(/[.\-]/g, '')

      const databitkey = env.DATABIT_API_KEY

      const [err, data] = await httpFetch<ResponseData, ResponseError>({
        baseURL: 'https://anonimobusca.online',
        url: `/api?token=${databitkey}&type=cpftype&query=${formattedCpf}`,
        method: 'GET',
      })

      //console.log('API Response:', data)

      if (err) {
        console.error('Erro ao buscar CPF:', err)
        return {
          success: false,
          message: 'Erro ao buscar CPF. Tente novamente mais tarde.',
          data: null,
        }
      }

      if (!data || !data.dadosBasicos) {
        console.error('Dados básicos não encontrados:', data)
        return {
          success: false,
          message: 'CPF não encontrado ou resposta inválida.',
          data: null,
        }
      }

      const { dadosBasicos } = data

      const cookieStore = await cookies()

      cookieStore.set('cpf', cpf, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      })

      cookieStore.set('name', dadosBasicos.nome, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      })

      cookieStore.set('nascimento', dadosBasicos.nascimento, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      })

      cookieStore.set('sexo', dadosBasicos.sexo, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      })

      cookieStore.set('mae', dadosBasicos.mae, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      })

      cookieStore.set('cpfFormated', formattedCpf, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
      })

      return {
        success: true,
        message: 'Redirecionando...',
        data: null,
      }
    } catch (err) {
      console.error('Action Error - {SearchCPF} :', err)
      return {
        success: false,
        message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        data: null,
      }
    }
  })
