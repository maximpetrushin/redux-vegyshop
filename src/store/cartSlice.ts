import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

type Product = {
    id: number
    name: string
    price: number
    image: string
    category: string
}

type CartItem = {
    product: Product,
    qty: number
}

type CartState = {
    cart: CartItem[]
}

type UpdateCartQty = {
    productId: number,
    newQty: number
}

const initialState: CartState = {
    cart: []
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        handleAddToCart: (state: CartState, action: PayloadAction<CartItem>) => {
            const {product, qty} = action.payload
            const cartItem = state.cart.find(item => item.product.id === product.id)
            if (cartItem) {
                cartItem.qty += qty
            } else {
                state.cart.push(action.payload)
            }
        },
        handleCartQty: (state: CartState, action: PayloadAction<UpdateCartQty>) => {
            const {productId, newQty} = action.payload
            if (newQty === 0) {
                state.cart = state.cart.filter(item => item.product.id !== productId)
            } else {
                const cartItem = state.cart.find(item => item.product.id === productId)
                if (cartItem) {
                    cartItem.qty = newQty
                }
            }
        }
    }
})

export default cartSlice.reducer;

export const {handleAddToCart, handleCartQty} = cartSlice.actions;