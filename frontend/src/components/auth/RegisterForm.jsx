import { useState } from "react";
import {
  Input,
  Button,
  VStack,
  Heading,
  FieldHelperText,
  Text,
} from "@chakra-ui/react";
import { useUserStore } from "@/store/users";
import { Fieldset, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { toaster } from "../ui/toaster";
import CryptoJS from "crypto-js";

const RegisterForm = ({ onSuccess }) => {
  const { createUser } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const hashPassword = (password) => {
    // Hash the password using SHA-256 (or any other secure hashing algorithm)
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
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
    const userData = { ...formData, password: hashedPassword };

    const result = await createUser(userData);
    console.log("result:", result);

    setIsSubmitting(false);

    if (result.success) {
      toaster.create({
        title: "Registration Successful",
        description: "You have been registered successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onSuccess?.({ name: userData.name, email: userData.email }); // Call the onSuccess callback if provided
    } else {
      toaster.create({
        title: "Registration Failed",
        description: result.message || "An error occurred during registration.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} gap={4}>
      <Stack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={4}>
          Register Form
        </Heading>
        <Text size={"lg"} textAlign={"center"} color={"gray.600"} mb={8}>
          Please provide your details below.
        </Text>
      </Stack>

      <Field label="Name" error={errors.name}>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          isInvalid={!!errors.name}
        />
      </Field>

      <Field label="Email Address" required error={errors.email}>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          isInvalid={!!errors.email}
        />
      </Field>

      <Field label="Password" required error={errors.password}>
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          isInvalid={!!errors.password}
        />
      </Field>

      <Button
        type="submit"
        colorPalette="blue"
        w={"full"}
        disabled={isSubmitting}
      >
        Register
      </Button>
    </VStack>
  );
};

export default RegisterForm;
