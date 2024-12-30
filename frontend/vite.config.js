import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

const HOST = process.env.HOST;
console.log("HOST:", HOST);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: HOST,
      },
    },
  },
});
