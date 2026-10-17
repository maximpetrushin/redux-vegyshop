import { screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { render } from '../../test-utils/render.tsx';
import ProductCard from './ProductCard';
import userEvent from '@testing-library/user-event';

describe('Product card', () => {
    it('Отображает информацию о товаре', () => {
        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        render(<ProductCard product={product} />);

        expect(screen.getByText('Broccoli - 1 Kg')).toBeInTheDocument();
        expect(screen.getByText('$ 120')).toBeInTheDocument();
    });

    it('Изменяет количество товара кнопками "+" и "-"', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        render(<ProductCard product={product} />);

        const plusButton = screen.getByRole('button', { name: '+' });
        const minusButton = screen.getByRole('button', { name: '-' });

        expect(screen.getByText('1')).toBeInTheDocument();

        await user.click(plusButton);

        expect(screen.getByText('2')).toBeInTheDocument();

        await user.click(minusButton);

        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('При значении товара "1" кнопка "-" неактивна', () => {
        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        render(<ProductCard product={product} />);

        const minusButton = screen.getByRole('button', { name: '-' });

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(minusButton).toBeDisabled();
    });

    it('Добавляет товар в корзину в выбранном количестве', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const { store } = render(<ProductCard product={product} />);

        const addToCartButton = screen.getByRole('button', {
            name: 'Add to cart',
        });

        await user.click(addToCartButton);

        expect(store.getState().cart.cart).toEqual([
            { product, qty: 1 },
        ]);

        await user.click(screen.getByRole('button', { name: '+' }));
        await user.click(addToCartButton);

        expect(store.getState().cart.cart).toEqual([
            { product, qty: 3 },
        ]);
    });
});