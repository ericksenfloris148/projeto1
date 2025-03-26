'use client'

import { useEffect } from 'react'

export function KwaiBypass({ whitepage }: { whitepage: string }) {
  useEffect(() => {
    // Função para verificar se o parâmetro existe na URL
    function getQueryParam(param: string) {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.has(param)
    }

    // Redireciona se "CampaignID" não estiver presente
    if (!getQueryParam('CampaignID')) {
      window.location.href = whitepage
    }
  }, [whitepage]) // Garante que o efeito roda quando 'whitepage' muda

  return null // Não precisa renderizar nada
}