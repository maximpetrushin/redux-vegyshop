import {Box, Text, Group, Image, ActionIcon, Stack, Divider} from "@mantine/core";
import emptyCartImage from '../../assets/cart_empty.svg'
import {useAppSelector, useAppDispatch} from "../../store/hooks.ts";
import { handleCartQty} from "../../store/cartSlice.ts";


function CartModal() {

    const cart = useAppSelector(store => store.cart.cart);

    const dispatch = useAppDispatch();

    const total = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0)

    return (
        <Stack>
            {cart.length !== 0 ? (
                <>
                {cart.map(item =>
                    <Box key={item.product.id}>
                        <Group justify='space-between'>
                            <Group>
                                <Image
                                    w={80}
                                    fit={"contain"}
                                    src={item.product.image}
                                />
                                <Stack gap={4}>
                                    <Text>{item.product.name}</Text>
                                    <Text>{"$" + item.product.price * item.qty}</Text>
                                </Stack>
                            </Group>
                            <Group>
                                <ActionIcon
                                    variant="light"
                                    color="qtyButton"
                                    onClick={() => dispatch(handleCartQty({
                                        productId: item.product.id,
                                        newQty: item.qty - 1,
                                    }))}
                                >
                                    -
                                </ActionIcon>

                                <Text>{item.qty}</Text>

                                <ActionIcon
                                    variant="light"
                                    color="qtyButton"
                                    onClick={() => dispatch(handleCartQty({
                                        productId: item.product.id,
                                        newQty: item.qty + 1,
                                    }))}
                                >
                                    +
                                </ActionIcon>
                            </Group>
                        </Group>
                        <Divider/>
                    </Box>
                )}
                    <Box>
                        <Group justify='space-between'>
                            <Text>TOTAL:</Text>
                            <Text>{'$' + total}</Text>
                        </Group>
                    </Box>
                </>
            ) : (
                <Stack align='center'>
                    <Image src={emptyCartImage} w={118}/>
                    <Text c='gray'>You cart is empty!</Text>
                </Stack>)}
        </Stack
            >
    )
}


export default CartModal;