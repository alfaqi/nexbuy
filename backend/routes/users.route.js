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
router.post("/", createUser); // Create a user
router.get("/", getAllUsers); // Get all users
router.get("/:id", getUserById); // Get a user by ID
router.put("/:id", updateUser); // Update a user
router.delete("/:id", deleteUser); // Delete a user

export default router;
