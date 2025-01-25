import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// User routes
router.post("/users", createUser); // Create a user
router.get("/users", getAllUsers); // Get all users
router.get("/users/:id", getUserById); // Get a user by ID
router.put("/users/:id", updateUser); // Update a user
router.delete("/users/:id", deleteUser); // Delete a user

export default router;
