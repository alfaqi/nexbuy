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
import LoginForm from "../auth/LoginForm";
import { FiLogIn } from "react-icons/fi";

export default function LoginModal() {
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
          <FiLogIn size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <LoginForm />
        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
