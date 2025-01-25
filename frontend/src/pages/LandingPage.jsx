import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$49.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A high-quality product for everyday use.",
  },
  {
    id: 2,
    name: "Product 2",
    price: "$79.99",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1904&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Premium product with advanced features.",
  },
  {
    id: 3,
    name: "Product 3",
    price: "$99.99",
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Luxury product for the discerning buyer.",
  },
];

export default function LandingPage() {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Box>
      {/* Hero Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        p={8}
        bg={bgColor}
      >
        <Box
          maxW={{ base: "100%", md: "50%" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading as="h1" size="2xl" mb={4} color={textColor}>
            Welcome to Our Product Store
          </Heading>
          <Text fontSize="xl" mb={6} color="gray.400">
            Discover high-quality products at unbeatable prices. Shop now and
            enjoy exclusive deals!
          </Text>
          <Button as={Link} to="/shop" colorPalette="blue" size="lg">
            Shop Now
          </Button>
        </Box>
        <Image
          src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hero Image"
          maxW={{ base: "100%", md: "40%" }}
          mt={{ base: 6, md: 0 }}
        />
      </Flex>

      {/* Featured Products Section */}
      <Box p={8}>
        <Heading as="h2" size="xl" textAlign="center" mb={8} color={textColor}>
          Featured Products
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {products.map((product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              boxShadow="md"
            >
              <Image src={product.image} alt={product.name} />
              <Box p={6}>
                <Heading as="h3" size="md" mb={2} color={textColor}>
                  {product.name}
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={4}>
                  {product.description}
                </Text>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  {product.price}
                </Text>
                <Button
                  as={Link}
                  to={`/product/${product.id}`}
                  colorScheme="blue"
                  width="full"
                >
                  View Details
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Call to Action Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        p={8}
        bg="blue.500"
        color="white"
        textAlign="center"
      >
        <Heading as="h2" size="xl" mb={4}>
          Ready to Shop?
        </Heading>
        <Text fontSize="lg" mb={6}>
          Join thousands of happy customers and start shopping today!
        </Text>
        <Button as={Link} to="/shop" colorScheme="whiteAlpha" size="lg">
          Explore Products
        </Button>
      </Flex>
    </Box>
  );
}
