import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { DeleteModal } from "./Modals/DeleteModal";
import { UpdateModal } from "./Modals/UpdateModal";
import { useUserStore } from "@/store/users";
import LoginModal from "./Modals/LoginModal";

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();

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
          {user ? (
            <>
              <IconButton
                onClick={() => {
                  setOpen(true);
                }}
                colorPalette={"blue"}
                _hover={{ rounded: "full" }}
              >
                <MdEdit />
              </IconButton>
              <DeleteModal productID={product._id} />
            </>
          ) : (
            <>
              <LoginModal />
            </>
          )}
        </HStack>
      </Box>
      <UpdateModal product={product} open={open} setOpen={setOpen} />
    </Box>
  );
}
