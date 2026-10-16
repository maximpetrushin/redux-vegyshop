import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {Provider} from 'react-redux';
import {store} from './store/store' 
import { MantineProvider, createTheme } from '@mantine/core';
import type {MantineColorsTuple } from '@mantine/core';
import '@mantine/core/styles.css';

const cartButton:MantineColorsTuple = [
    "#eafbee",
    "#dbf2e0",
    "#b9e1c2",
    "#94d0a1",
    "#74c186",
    "#60b874",
    "#54b46a",
    "#449e59",
    "#398d4d",
    "#2a7a3f"
]

const qtyButton:MantineColorsTuple = [
    "#ecf6ff",
    "#e2e8ee",
    "#c8ced3",
    "#abb2b8",
    "#939aa1",
    "#868e96",
    "#7a848e",
    "#67727c",
    "#5a6570",
    "#485866"
]

const theme = createTheme({
    colors: {
        cartButton,
        qtyButton,
    },
    components: {
        Button: {
            defaultProps: {
                px: 40,
            }
        }
    }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <MantineProvider theme={theme}>
              <App />
          </MantineProvider>
      </Provider>
  </StrictMode>,
)
