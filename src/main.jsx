import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
// import theme from './theme/theme.ts'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode='light' />
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
