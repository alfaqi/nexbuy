import { Text, Box, Button } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { toaster } from "../ui/toaster";
import { Avatar } from "../ui/avatar";
import { useUserStore } from "@/store/users";

const UserInfo = () => {
  const { handleLogout } = useAuth();
  const { user } = useUserStore();

  const handleLogoutClick = () => {
    handleLogout();
    toaster.create({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="plain" size="sm" background={"transparent"}>
          <Avatar size="sm" />
        </Button>
      </MenuTrigger>

      <MenuContent align="start" minWidth="200px">
        <Box px={4} py={2}>
          <Text fontWeight="bold">{user?.name || "user?.name"}</Text>
          <Text fontSize="sm" color="gray.600">
            {user?.email || "user?.email"}
          </Text>
        </Box>
        <MenuSeparator />
        <MenuItem value="My Profile" as={Link} to="/profile">
          My Profile
        </MenuItem>
        <MenuSeparator />

        <MenuItem
          value="Log Out"
          color="fg.error"
          _hover={{ bg: "bg.error", color: "fg.error" }}
          onClick={handleLogoutClick}
        >
          Log Out
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default UserInfo;
