import LoginForm from "@/components/auth/LoginForm";
import { Flex } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" p={4}>
      <LoginForm />
    </Flex>
  );
};

export default LoginPage;
