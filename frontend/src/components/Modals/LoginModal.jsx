import { Button, DialogTrigger, useDisclosure } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";
import LoginForm from "../auth/LoginForm";
import { FiLogIn } from "react-icons/fi";

export default function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
