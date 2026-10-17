
import { MantineProvider } from '@mantine/core';
import { configureStore } from '@reduxjs/toolkit';
import { render as testingLibraryRender } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import productReducer from '../store/productSlice';
import cartReducer from '../store/cartSlice';

export function render(ui: ReactNode) {
    const store = configureStore({
        reducer: {
            products: productReducer,
            cart: cartReducer,
        },
    });

    return {
        ...testingLibraryRender(ui, {
            wrapper: ({ children }) => (
                <MantineProvider>
                    <Provider store={store}>
                        {children}
                    </Provider>
                </MantineProvider>
            ),
        }),
        store,
    };
}