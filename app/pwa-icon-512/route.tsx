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
        background: 'linear-gradient(to right, #16a34a, #fde047)',
        borderRadius: 100,
      }}
    >
      <span
        style={{
          fontFamily: 'Inter',
          fontSize: 320,
          fontWeight: 700,
          color: '#000000',
          marginLeft: 20,
        }}
      >
        R
      </span>
    </div>,
    {
      width: 512,
      height: 512,
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
