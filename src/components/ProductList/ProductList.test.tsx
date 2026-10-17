import { screen, act } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { render } from '../../test-utils/render.tsx';
import ProductList from './ProductList';
import { fetchProducts } from '../../store/productSlice';

describe('Product list', () => {
    it('Отображает лоадер во время загрузки данных из API', () => {
        const { store } = render(<ProductList />);

        act(() => {
            store.dispatch(fetchProducts.pending('request-id'));
        });

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('Отображает элементы на странице после загрузки API', () => {
        const products = [
            {
                id: 1,
                name: 'Broccoli - 1 Kg',
                price: 120,
                image: 'broccoli.jpg',
                category: 'vegetables',
            },
            {
                id: 2,
                name: 'Carrots - 1 Kg',
                price: 80,
                image: 'carrots.jpg',
                category: 'vegetables',
            },
        ];

        const { store } = render(<ProductList />);

        act(() => {
            store.dispatch(
                fetchProducts.fulfilled(products, 'request-id')
            );
        });

        expect(screen.getByText('Broccoli - 1 Kg')).toBeInTheDocument();
        expect(screen.getByText('Carrots - 1 Kg')).toBeInTheDocument();
    });
});