import { Inter } from 'next/font/google'
import "@/styles/globals.css";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
 
const App = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
    <Component {...pageProps} />
    </main>
  )

}

export default App;