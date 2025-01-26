import { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { hashPassword } from "@/utils/utils";
import { toaster } from "../ui/toaster";
import { Field } from "../ui/field";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

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

        // Navigate to /shop only if the current path is /login
        if (location.pathname === "/login") {
          navigate("/shop");
        }
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
    <VStack as="form" w={"md"} onSubmit={handleSubmit} gap={4}>
      <Field label="Email">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field label="Password">
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      <Button type="submit" disabled={isSubmitting} w={"full"}>
        Login
      </Button>
    </VStack>
  );
};

export default LoginForm;
