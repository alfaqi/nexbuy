import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "../store/product";

export default function SearchPage() {
  const { searchResults, isLoading, error, searchProducts } = useProductStore();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query, searchProducts]);

  if (isLoading) return <Loading />;
  if (error)
    return <Error error={error} onRetry={() => searchProducts(query)} />;

  return (
    <Container maxW="container.xl" py={12}>
      <VStack gap={8}>
        <Text fontSize={30} fontWeight={"bold"} textAlign={"center"}>
          Search Results for "{query}"
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
          {searchResults.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {searchResults.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products found for "{query}". Try refining your search.
          </Text>
        )}
      </VStack>
    </Container>
  );
}
