import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";
import CreateModal from "../Modals/CreateModal";
import SearchBar from "../SearchBar";
import UserInfo from "./UserInfo";
import { useColorMode } from "../ui/color-mode";
import { useUserStore } from "@/store/users";

export default function TopNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useUserStore();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        align={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
        >
          <Link to="/">Product Store</Link>
        </Text>
        <HStack gap={2} alignItems={"center"}>
          <SearchBar />
          <CreateModal />
          <Button onClick={toggleColorMode} aria-label="Toggle Dark Mode">
            {colorMode === "light" ? <BsMoon /> : <BsSun />}
          </Button>
          {user && <UserInfo />}
        </HStack>
      </Flex>
    </Container>
  );
}
