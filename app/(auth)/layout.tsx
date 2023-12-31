import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css';

export const metadata = {
  title: 'Threads',
  description: 'A NextJs 13 meta thread app'
}

const inter = Inter({ subsets: ["latin"] });//font

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (<ClerkProvider>
    <html lang="en">
      <body className={`$(inter.className) bg-dark-1`}>
        {children}
      </body>
    </html>
  </ClerkProvider>
  )
}