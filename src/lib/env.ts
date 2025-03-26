import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABIT_API_KEY: z.string().min(1),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_CHECKOUT_URL: z.string().url(),
    NEXT_PUBLIC_TYPEBOT_URL: z.string().url(),
    NEXT_PUBLIC_TYPEBOT_SLUG: z.string().min(1),
    NEXT_PUBLIC_FACEBOOK_PIXEL: z.string(),
    NEXT_PUBLIC_CLARITY: z.string(),
    NEXT_PUBLIC_XTRACKY: z.string(),
    NEXT_PUBLIC_KWAIBYPASS: z.string(),
  },
  runtimeEnv: {
    DATABIT_API_KEY: process.env.DATABIT_API_KEY,
    NEXT_PUBLIC_CHECKOUT_URL: process.env.NEXT_PUBLIC_CHECKOUT_URL,
    NEXT_PUBLIC_TYPEBOT_URL: process.env.NEXT_PUBLIC_TYPEBOT_URL,
    NEXT_PUBLIC_TYPEBOT_SLUG: process.env.NEXT_PUBLIC_TYPEBOT_SLUG,
    NEXT_PUBLIC_FACEBOOK_PIXEL: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL,
    NEXT_PUBLIC_CLARITY: process.env.NEXT_PUBLIC_CLARITY,
    NEXT_PUBLIC_XTRACKY: process.env.NEXT_PUBLIC_XTRACKY,
    NEXT_PUBLIC_KWAIBYPASS: process.env.NEXT_PUBLIC_KWAIBYPASS,
  },
  emptyStringAsUndefined: true,
})
