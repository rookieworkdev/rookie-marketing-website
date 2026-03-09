import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default async function AppleIcon() {
  // Load Inter Bold font from local file
  const interBold = await readFile(join(process.cwd(), 'app/fonts/Inter-Bold.otf'))

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #16a34a, #fde047)',
        borderRadius: 40,
      }}
    >
      <span
        style={{
          fontFamily: 'Inter',
          fontSize: 100,
          fontWeight: 700,
          color: '#000000',
          marginLeft: 8,
        }}
      >
        R
      </span>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
