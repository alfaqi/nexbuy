import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import TopNav from "./components/Navs/TopNav";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <Box minH={"100vh"}>
      <TopNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
