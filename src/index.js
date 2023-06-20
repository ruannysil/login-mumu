import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import bgimage from './images/site_fundo.png'
import RoutesApp from './routes';


const colors = {
  text1: "#000",
  text2: "#fff"
}

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        height: "100vh",
        backgroundImage: `url(${bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff'
      }
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RoutesApp />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
