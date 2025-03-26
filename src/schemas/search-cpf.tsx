import { z } from 'zod'

export type ResponseError = {
  message: string
}

export type ResponseData = {
  status: number,
  dadosBasicos: {
    cpf: string
    nome: string
    sexo: string
    nascimento: string
    mae: string
  }
}

const validateCPF = (cpf: string): boolean => {
  const cleanedCPF = cpf.replace(/[^\d]/g, '')

  if (cleanedCPF.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cleanedCPF)) return false

  const calculateDigit = (slice: number, factor: number): number => {
    const sum = Array.from(
      { length: slice },
      (_, i) => Number.parseInt(cleanedCPF.substring(i, i + 1)) * (factor - i)
    ).reduce((acc, curr) => acc + curr, 0)

    let remainder = (sum * 10) % 11
    remainder = remainder === 10 || remainder === 11 ? 0 : remainder

    return remainder
  }

  const firstDigit = calculateDigit(9, 10)
  if (firstDigit !== Number.parseInt(cleanedCPF.substring(9, 10))) return false

  const secondDigit = calculateDigit(10, 11)
  if (secondDigit !== Number.parseInt(cleanedCPF.substring(10, 11)))
    return false

  return true
}

export const SearchCpfSchema = z.object({
  cpf: z
    .string()
    .min(11, 'CPF deve ter 11 dígitos.')
    .max(14, 'CPF informado inválido. (ERL0000400)')
    .refine(cpf => validateCPF(cpf), {
      message: 'CPF informado inválido. (ERL0000400)',
    }),
})
