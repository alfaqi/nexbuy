import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import TopNav from "./components/Navs/TopNav";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Box minH={"100vh"}>
      <TopNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Box>
  );
}

export default App;
