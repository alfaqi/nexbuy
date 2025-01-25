import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi"; // Using react-icons for the error icon

const Error = ({ error, onRetry }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Full viewport height
      gap={4}
      textAlign="center"
    >
      <FiAlertCircle size={"24"} color="red.500" />
      <Text fontSize="xl" fontWeight="bold" color="gray.700">
        Oops! Something went wrong.
      </Text>
      <Text fontSize="md" color="gray.500">
        {error || "Please try again later."}
      </Text>
      {onRetry && (
        <Button colorPalette="blue" mt={4} onClick={onRetry} aria-label="Retry">
          Retry
        </Button>
      )}
    </Flex>
  );
};

export default Error;
