import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./components/Navs/TopNav";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";
import UserListPage from "./pages/users/UserListPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <Box minH={"100vh"}>
      <TopNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserListPage />} />
      </Routes>
    </Box>
  );
}

export default App;
