import { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../components/ui/dialog";
import { useProductStore } from "../store/product";
import { Button, Input, VStack } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";

export const UpdateModal = ({ product, open, setOpen }) => {
  const [update_product, setUpdate_product] = useState(product);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProduct } = useProductStore();

  const handleUpdateProduct = async (id) => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      console.log("Error:", error);

      toaster.create({
        title: "Error",
        description: error.message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
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
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={() => handleUpdateProduct(product._id)}
            disabled={isLoading}
          >
            Update
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
