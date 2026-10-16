import { Box, Group, Pill, Button, Popover, ScrollArea } from "@mantine/core";
import {ShoppingCartIcon} from "@phosphor-icons/react";
import CartModal from "../CartModal/CartModal";
import {useAppSelector} from "../../store/hooks.ts";


function Header() {


    const cartIcon = <ShoppingCartIcon size={20}/>;

    const cart = useAppSelector(item => item.cart.cart)

    const total = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0)

    return (
        <Box
            top={0}
            bg="white"
            h={59}
            px={20}
            pos="sticky"
            style={{zIndex: 1000000,}}
        >
            <Group justify="space-between" h='100%'>
                <Group>
                    <Pill
                        bg='light-gray'
                        pos="relative"
                        fz={20}
                        fw={600}
                        px={10}
                        pr={80}>
                        Vegetable
                        <Pill
                            bg='green'
                            pos='absolute'
                            c='white'
                            px={10}
                            fz={20}
                            right={0}>
                            SHOP
                        </Pill>
                    </Pill>
                </Group>
                <Group>
                    <Popover
                        position='bottom-end'
                        offset={{mainAxis: 20}}
                        withOverlay
                        overlayProps={{zIndex: 10001, blur: '3px'}}
                        zIndex={10002}
                    >
                        <Popover.Target>
                            <Button
                                color='cartButton'
                                variant='filled'
                                rightSection={cartIcon}
                            >
                                <Group gap={8}>
                                    {cart.length !== 0 &&
                                        (<Pill>{cart.length} / ${total}</Pill>)}
                                    Cart
                                </Group>
                            </Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <ScrollArea.Autosize mah={300} maw={400} mx="auto">
                                <CartModal/>
                            </ScrollArea.Autosize>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
            </Group>

        </Box>
    )
}

export default Header;