import './globals.css'

// Root layout is a pass-through — [locale]/layout.tsx provides <html> and <body>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
