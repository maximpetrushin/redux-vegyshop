import { screen, act } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { render } from '../../test-utils/render.tsx';
import CartModal from './CartModal';
import userEvent from '@testing-library/user-event';
import { handleAddToCart } from '../../store/cartSlice';

describe('Cart modal', () => {
    it('Отображает сообщение о пустой корзине', () => {
        render(<CartModal />);

        expect(screen.getByText('You cart is empty!')).toBeInTheDocument();
    });

    it('Отображает товар в корзине', () => {
        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const { store } = render(<CartModal />);

        act(() => {
            store.dispatch(handleAddToCart({ product, qty: 2 }));
        });

        expect(screen.getByText('Broccoli - 1 Kg')).toBeInTheDocument();
        expect(screen.getAllByText('$240')).toHaveLength(2);
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('Уменьшает количество товара кнопкой "-"', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const { store } = render(<CartModal />);

        act(() => {
            store.dispatch(handleAddToCart({ product, qty: 2 }));
        });

        await user.click(screen.getByRole('button', { name: '-' }));

        expect(store.getState().cart.cart[0].qty).toBe(1);
    });

    it('Увеличивает количество товара кнопкой "+"', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const { store } = render(<CartModal />);

        act(() => {
            store.dispatch(handleAddToCart({ product, qty: 2 }));
        });

        await user.click(screen.getByRole('button', { name: '+' }));

        expect(store.getState().cart.cart[0].qty).toBe(3);
    });

    it('Отображает общую стоимость товаров в корзине', () => {
        const product1 = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const product2 = {
            id: 2,
            name: 'Carrots - 1 Kg',
            price: 80,
            image: 'carrots.jpg',
            category: 'vegetables',
        };

        const { store } = render(<CartModal />);

        act(() => {
            store.dispatch(handleAddToCart({ product: product1, qty: 2 }));
            store.dispatch(handleAddToCart({ product: product2, qty: 3 }));
        });

        expect(screen.getByText('TOTAL:')).toBeInTheDocument();
        expect(screen.getByText('$480')).toBeInTheDocument();
    });

    it('Удаляет товар из корзины при уменьшении количества до нуля', async () => {
        const user = userEvent.setup();

        const product = {
            id: 1,
            name: 'Broccoli - 1 Kg',
            price: 120,
            image: 'broccoli.jpg',
            category: 'vegetables',
        };

        const { store } = render(<CartModal />);

        act(() => {
            store.dispatch(handleAddToCart({ product, qty: 1 }));
        });

        await user.click(screen.getByRole('button', { name: '-' }));

        expect(store.getState().cart.cart).toHaveLength(0);
    });
});