import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";

export default function CreatePage() {
  const { createProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleAddProduct = async () => {
    try {
      setIsCreating(true);
      const { success, message } = await createProduct(newProduct);
      console.log("message:", message);

      const title = success === true ? "Success" : "Error";
      const type = success === true ? "success" : "error";

      toaster.create({
        title: title,
        description: message,
        type: type,
      });
      setNewProduct({ name: "", price: "", image: "" });
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error.message,
        type: "error",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Container maxWidth={"container.sm"}>
      <VStack spaceY={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spaceY={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              w={"full"}
              colorScheme={"light"}
              onClick={handleAddProduct}
              disabled={isCreating}
            >
              {isCreating ? "Adding the product..." : "Add Product"}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
