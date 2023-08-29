import IntroAnimation from '@/components/pages/home/IntroAnimation'
import QueryProviders from '@/components/providers/QueryProviders'
import YGOProvider from '@/components/providers/YGOProvider'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
 
export const metadata = {
  title: 'Dean Kudou',
  description: 'I write these words in steel, for anything not set in metal cannot be trusted.',
}

const inter = Inter({weight:'400', subsets:['latin']})

export default function RootLayout({ 
  children, 
  modal, 
}:{ 
  children: React.ReactNode, 
  modal: React.ReactNode,
}){

  return (
    <html lang='en'>
      <body className={cn('antialiased scroll-smooth no-scrollbar bg-background text-foreground ', inter.className)}>
        <QueryProviders>
          {modal}
          <YGOProvider/>
          <IntroAnimation/>
          {children}
          <Toaster/>
        </QueryProviders>
      </body>
    </html>
  )
}
