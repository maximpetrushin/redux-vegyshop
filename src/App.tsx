import { useEffect } from 'react';
import {useAppDispatch} from "./store/hooks.ts";
import ProductList from './components/ProductList/ProductList'
import Header from './components/Header/Header'
import {fetchProducts} from "./store/productSlice.ts";


function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    return (
        <>
            <Header />
            <ProductList/>
        </>
    )

}

export default App
