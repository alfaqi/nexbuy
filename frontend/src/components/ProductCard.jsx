import { useProductStore } from "../store/product";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { MdDelete, MdEdit } from "react-icons/md";
import { toaster } from "./ui/toaster";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  const [open, setOpen] = useState(false);

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
          <IconButton
            onClick={() => setOpen(!open)}
            colorPalette={"blue"}
            _hover={{ rounded: "full" }}
          >
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
      <UpdateModal product={product} open={open} setOpen={setOpen} />
    </Box>
  );
}

const UpdateModal = ({ product, open, setOpen }) => {
  const [update_product, setUpdate_product] = useState(product);
  const { updateProduct } = useProductStore();
  const handleUpdateProduct = async (id) => {
    console.log(product);
    const { success, message } = await updateProduct(id, update_product);
    const title = success === true ? "Success" : "Error";
    const type = success === true ? "success" : "error";

    toaster.create({
      title: title,
      description: message,
      type: type,
    });
    setOpen(false);
  };
  return (
    <DialogRoot open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={update_product.name}
              onChange={(e) =>
                setUpdate_product({ ...update_product, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={update_product.price}
              onChange={(e) =>
                setUpdate_product({ ...update_product, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={update_product.image}
              onChange={(e) =>
                setUpdate_product({ ...update_product, image: e.target.value })
              }
            />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button onClick={() => handleUpdateProduct(product._id)}>
            Update
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
