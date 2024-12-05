import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import productRoutes from "./routes/products.route.js";

dotenv.config();

const app = express();
app.use(express.json()); // allows us to accept JSON data in body

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}...`);
});
