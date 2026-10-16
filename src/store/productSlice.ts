import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

type ProductsState = {
    products: Product[];
    status: Status;
    error: string | null;
}


export const fetchProducts = createAsyncThunk<Product[], void, {rejectValue: string}>(
    "products/fetchProducts",
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const products = await response.json();
            return products;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
            return rejectWithValue('Не удалось загрузить')
        }
}
)


const initialState: ProductsState = {
    products: [],
    status: 'idle',
    error: null,
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'success';
                state.error = null;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload ?? action.error.message ?? 'Не удалось загрузить';
            })
    }
})


export default productSlice.reducer;

