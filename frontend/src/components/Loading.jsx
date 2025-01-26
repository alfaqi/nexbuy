import { Spinner, Flex, Text } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text mt={4} fontSize="lg" color="gray.600">
        Loading...
      </Text>
    </Flex>
  );
};

export default Loading;