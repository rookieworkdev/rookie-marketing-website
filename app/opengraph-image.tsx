import { ImageResponse } from 'next/og'

import { SITE_NAME } from '@/lib/seo'

export const alt = SITE_NAME

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #16a34a, #fde047)',
      }}
    >
      <div
        style={{
          fontSize: 140,
          fontWeight: 900,
          fontStyle: 'italic',
          letterSpacing: 8,
          color: '#000000',
        }}
      >
        {SITE_NAME}
      </div>
    </div>,
    size
  )
}
