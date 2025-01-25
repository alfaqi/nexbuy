import { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
    navigate("/dashboard");
  };

  return (
    <VStack as="form" onSubmit={onSubmit}>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </VStack>
  );
};

export default LoginPage;