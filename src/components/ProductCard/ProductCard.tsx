import { Card, Image, Text, Stack, Group, ActionIcon, Button } from '@mantine/core';
import {useCounter} from "@mantine/hooks";
import {ShoppingCartIcon} from "@phosphor-icons/react";
import {useAppDispatch} from "../../store/hooks.ts";
import {handleAddToCart} from "../../store/cartSlice.ts";


type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
}

type ProductCardProps = {
    product: Product;
}



function ProductCard({product}: ProductCardProps) {

    const dispatch = useAppDispatch();

    const cartIcon = <ShoppingCartIcon size={20}/>

    const [qty, {increment, decrement}] = useCounter(1, {min: 1});


    return (

        <Card
            w={302}
            h={414}
            p={16}
            radius={16}
        >

            <Stack gap={16}>
                <Image
                    src={product.image}
                    alt={product.name}
                    height={276}
                    w="100%"/>
                <Group justify='space-between'>
                    <Text>{product.name}</Text>
                    <Group>
                        <ActionIcon variant="light" color="qtyButton" disabled={qty === 1} onClick={decrement}>-</ActionIcon>
                        <Text>{qty}</Text>
                        <ActionIcon variant="light" color="qtyButton" onClick={increment}>+</ActionIcon>
                    </Group>
                </Group>
                <Group justify='space-between'>
                    <Text fw='bold'>{'$ ' + product.price}</Text>
                    <Button
                        onClick={() => dispatch(handleAddToCart({product, qty}))}
                        color='cartButton'
                        variant='light'
                        rightSection={cartIcon}
                    >
                        Add to cart
                    </Button>
                </Group>
            </Stack>

        </Card>

    )
}

export default ProductCard;