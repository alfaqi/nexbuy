import { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { hashPassword } from "@/utils/utils";
import { toaster } from "../ui/toaster";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const hashedPassword = hashPassword(password);

      const loginStatus = await handleLogin(email, hashedPassword);
      if (loginStatus) {
        toaster.success({
          title: "Login Successful",
          description: "You have been logged in successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/dashboard");
      } else {
        toaster.error({
          title: "Login Failed",
          description: "An error occurred during login.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toaster.error({
        title: "Login Failed",
        description: "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VStack as="form" w={"md"} onSubmit={handleSubmit}>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </VStack>
  );
};

export default LoginForm;
