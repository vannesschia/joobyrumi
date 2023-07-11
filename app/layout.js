import './globals.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Inter, Rubik } from 'next/font/google'

const rubik = Rubik({ 
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-rubik"
})

export const metadata = {
  title: 'JoobyRumi',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${rubik.variable}`}>
      <body className="flex flex-col h-screen">
        <Navbar className="flex"/>
        {children}
        <Footer className="flex"/>
      </body>
    </html>
  )
}
