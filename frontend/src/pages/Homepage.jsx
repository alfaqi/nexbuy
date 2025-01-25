import Error from "../components/Error";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import withAuth from "../hoc/withAuth";

 function Homepage() {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("Products:", products);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} onRetry={fetchProducts} />;

  return (
    <Container maxw="container.xl" py={12}>
      <VStack gap={8}>
        <Text fontSize={30} fontWeight={"bold"} textAlign={"center"}>
          Current Products
        </Text>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          w={"full"}
          gap={10}
        >
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </SimpleGrid>
        {products.length == 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products found{" "}
            <Link to="/create">
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default withAuth(Homepage); // Wrap with withAuth
