import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function GET() {
  const interBold = await readFile(join(process.cwd(), 'app/fonts/Inter-Bold.otf'))

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(128deg, #093CDF 20%, #8D0FF9 80%)',
        borderRadius: 40,
      }}
    >
      <span
        style={{
          fontFamily: 'Inter',
          fontSize: 120,
          fontWeight: 700,
          color: '#ffffff',
          marginLeft: 8,
        }}
      >
        P
      </span>
    </div>,
    {
      width: 192,
      height: 192,
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
