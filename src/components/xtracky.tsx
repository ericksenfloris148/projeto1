'use client'

import Script from 'next/script'

export function XtrackyScript({ token }: { token: string }) {
  return (
    <Script
      id="xtracky-script"
      strategy="afterInteractive"
      src="https://d1atmqbt05kisf.cloudfront.net/scripts/utm-handler.js"
      data-token={token}
      data-click-id-param="click_id"
    />
  )
}
