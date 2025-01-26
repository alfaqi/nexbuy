import { useState } from "react";
import {
  Button,
  DialogTrigger,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";
import { IoAdd } from "react-icons/io5";
export default function CreateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createProduct } = useProductStore();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
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
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button onClick={onOpen}>
          <IoAdd size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4}>
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
            <Input
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
            />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isCreating}>
            Cancel
          </Button>
          <DialogActionTrigger asChild>
            <Button
              colorScheme={"light"}
              onClick={handleAddProduct}
              disabled={isCreating}
            >
              {isCreating ? "Adding the product..." : "Add Product"}
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
