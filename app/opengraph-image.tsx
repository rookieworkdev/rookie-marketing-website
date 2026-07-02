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
        background: 'linear-gradient(128deg, #093CDF 20%, #8D0FF9 80%)',
      }}
    >
      <div
        style={{
          fontSize: 140,
          fontWeight: 900,
          fontStyle: 'normal',
          letterSpacing: -2,
          color: '#ffffff',
        }}
      >
        {SITE_NAME}
      </div>
    </div>,
    size
  )
}
