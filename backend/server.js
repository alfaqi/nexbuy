import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/products.route.js";
import cors from "cors"

dotenv.config();
const app = express();
app.use(express.json()); // allows us to accept JSON data in body

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}...`);
});
