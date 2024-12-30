import { useProductStore } from "../store/product";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { toaster } from "./ui/toaster";

export default function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (id) => {
    console.log("Product ID:", id);

    const { success, message } = await deleteProduct(id);

    const title = success === true ? "Success" : "Error";
    const type = success === true ? "success" : "error";

    toaster.create({
      title: title,
      description: message,
      type: type,
    });
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
          ${product.price}
        </Text>
        <HStack gap={2}>
          <IconButton colorPalette={"blue"} _hover={{ rounded: "full" }}>
            <MdEdit />
          </IconButton>
          <IconButton
            colorPalette={"red"}
            onClick={() => handleDeleteProduct(product._id)}
            _hover={{ rounded: "full" }}
          >
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
}
