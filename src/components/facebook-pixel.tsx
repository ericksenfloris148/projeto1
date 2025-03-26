'use client'

import Script from 'next/script'

interface FacebookPixelProps {
  pixel: string
}

export function FacebookPixel({ pixel }: FacebookPixelProps) {
  return (
    <Script id="utmify-pixel" strategy="afterInteractive">
      {`
          window.pixelId = "${pixel}";
          var a = document.createElement("script");
          a.setAttribute("async", "");
          a.setAttribute("defer", "");
          a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
          document.head.appendChild(a);
        `}
    </Script>
  )
}
