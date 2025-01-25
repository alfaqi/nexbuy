import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { BsMoon, BsPlusSquare, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";
import CreateModal from "../Modals/CreateModal";

export default function TopNav() {
  const colorMode = "";

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
          // bgGradient={"linear(to-r, cyan.400, blue.500)"}
          // bgGradient="to-r" gradientFrom="red.200" gradientTo="blue.200"
          // bgClip={"text"}
        >
          <Link to="/">Product Store </Link>
        </Text>
        <HStack gap={2} alignItems={"center"}>
          {/* <Link to="/create">
            <Button>
              <BsPlusSquare size={20} />
            </Button>
          </Link> */}
          <CreateModal />
          <Button>{colorMode === "light" ? <BsMoon /> : <BsSun />}</Button>
        </HStack>
      </Flex>
    </Container>
  );
}
