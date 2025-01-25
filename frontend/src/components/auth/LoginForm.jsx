import { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    const a = await handleLogin(email, password);
    console.log("A:", a);

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  };

  return (
    <VStack>
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
      <Button onClick={onSubmit}>Login</Button>
    </VStack>
  );
};

export default LoginForm;
