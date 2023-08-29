import IntroAnimation from '@/components/pages/home/IntroAnimation'
import QueryProviders from '@/components/providers/QueryProviders'
import YGOProvider from '@/components/providers/YGOProvider'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Inter } from 'next/font/google'
 
export const metadata = {
  title: 'Browse Yu-Gi-Oh! Cards',
  description: 'Access stats and effects of every card in the game!',
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
