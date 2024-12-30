import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_REACT_APP_BACKEND_BASEURL: JSON.stringify(
      process.env.VITE_REACT_APP_BACKEND_BASEURL
    ),
  },
});
