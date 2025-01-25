import { useState } from "react";
import {
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/users";
import { toaster } from "../ui/toaster";
import CryptoJS from "crypto-js"; // Import crypto-js

const LoginForm = ({ onSuccess }) => {
  const { login } = useUserStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  const hashPassword = (password) => {
    // Hash the password using SHA-256 (or any other secure hashing algorithm)
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Hash the password before sending it
    const hashedPassword = hashPassword(formData.password);
    const loginData = { ...formData, password: hashedPassword };

    const result = await login(loginData);
    setIsSubmitting(false);

    if (result.success) {
      toaster.create({
        title: "Login Successful",
        description: "You have been logged in successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSuccess?.(); // Call the onSuccess callback if provided
    } else {
      toaster.create({
        title: "Login Failed",
        description: result.message || "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
