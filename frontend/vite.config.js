import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import the path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_REACT_APP_BACKEND_BASEURL: JSON.stringify(
      process.env.VITE_REACT_APP_BACKEND_BASEURL
    ),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
