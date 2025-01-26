import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./components/Navs/TopNav";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";
import UserListPage from "./pages/users/UserListPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Box minH={"100vh"}>
      <TopNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/users" element={<UserListPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Box>
  );
}

export default App;
