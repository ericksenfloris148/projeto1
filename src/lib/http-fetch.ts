export type RequestConfig<TData = unknown> = {
  baseURL?: string
  url?: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  params?: object
  data?: TData | FormData
  responseType?:
    | 'arrayBuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
  signal?: AbortSignal
  headers?: HeadersInit
}

export type ResponseConfig<TData = unknown, TError = unknown> =
  | [TError, null]
  | [null, TData]

export const httpFetch = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData, TError>> => {
  const response = await fetch(`${config.baseURL}${config.url}`, {
    method: config.method.toUpperCase(),
    body: JSON.stringify(config.data),
    signal: config.signal,
    headers: config.headers,
  })

  const data = await response.json()

  if (!response.ok) {
    return [data, null]
  }

  return [null, data]
}

export default httpFetch
