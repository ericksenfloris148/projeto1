import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function handleUtmTracking(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const utmParams = {
    utm_source: searchParams.get('utm_source'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
    utm_content: searchParams.get('utm_content'),
    utm_term: searchParams.get('utm_term'),
    src: searchParams.get('src'),
    sck: searchParams.get('sck'),
  }

  const hasUtmParams = Object.values(utmParams).some(param => param !== null)

  if (hasUtmParams) {
    const response = NextResponse.next()
    response.cookies.set('utm_tracking', JSON.stringify(utmParams), {
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
    return response
  }

  return null
}

export async function middleware(request: NextRequest) {
  const utmResponse = handleUtmTracking(request)
  if (utmResponse) return utmResponse

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
