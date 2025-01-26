import { Flex, Box, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";

const RegisterPage = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleRegistrationSuccess = async (email, password) => {
    console.log("Registration successful!");
    await handleRegister(email, password);
    navigate("/shop");
  };

  return (
    <Flex minH="100vh" align="center" justify="center" p={4}>
      <Box p={8} borderRadius="md" boxShadow="md" maxW="lg" width="full">
        <RegisterForm onSuccess={handleRegistrationSuccess} />
        <Text mt={4} textAlign="center" color="gray.600">
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="blue.500">
            Login here
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
