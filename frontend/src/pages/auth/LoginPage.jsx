import LoginForm from "@/components/auth/LoginForm";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" p={4}>
      <Box p={8} borderRadius="md" boxShadow="md" maxW="lg" width="full">
        <LoginForm />
        <Text mt={4} textAlign="center" color="gray.600">
          Do not have an account?{" "}
          <Link as={RouterLink} to="/register" color="blue.500">
            Create now
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
