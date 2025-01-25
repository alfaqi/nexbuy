import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../../store/product";
import { toaster } from "../ui/toaster";

export function DeleteModal({ productID }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async () => {
    try {
      console.log("productID:", productID);
      const { success, message } = await deleteProduct(productID);

      const title = success === true ? "Success" : "Error";
      const type = success === true ? "success" : "error";

      toaster.create({
        title: title,
        description: message,
        type: type,
      });
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Error while deleting the product",
        type: "error",
      });
    } finally {
      onClose();
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <IconButton
          colorPalette="red"
          onClick={onOpen}
          _hover={{ rounded: "full" }}
        >
          <MdDelete />
        </IconButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
        </DialogHeader>

        <DialogBody>This action cannot be undone.</DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>

          <Button colorPalette="red" onClick={()=>handleDeleteProduct()}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
