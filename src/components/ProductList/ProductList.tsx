import {Loader, Text, SimpleGrid, Container, Flex} from "@mantine/core";
import ProductCard from "../ProductCard/ProductCard";
import {useAppSelector} from "../../store/hooks.ts";




function ProductList() {

    const products = useAppSelector(state => state.products.products);

    const status = useAppSelector(state => state.products.status)

    if (status === 'loading') {
        return (
            <Container
                fluid
            >
                <Flex
                    justify="center"
                    align="center"
                    h='100vh'
                >
                    <Loader
                        color="gray"
                        size="xl"
                        type="bars"
                        data-testid="loader"
                    />
                </Flex>
            </Container>
        );
    }
    return (
           <Container
               fluid
               p={80}
               m='auto'
               bg='#f3f5fa'
           >
               <Text pb={60} fz={32} fw={600}> Catalog </Text>
               <SimpleGrid
                   cols={4}>
                   {products.map(product => (
                       <ProductCard key={product.id} product={product}/>
                   ))}
               </SimpleGrid>
           </Container>
    )
}

export default ProductList;