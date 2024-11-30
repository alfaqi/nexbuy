import { Route, Routes } from "react-router-dom";
import { CreatePage } from "./pages/createpage";
import { Homepage } from "./pages/homepage";
import { LoginForm } from "./components/login-form";

function App() {
  return (
    <div>
      <div className="h-screen p-8">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/add" element={<CreatePage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
