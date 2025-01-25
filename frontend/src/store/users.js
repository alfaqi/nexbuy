import { create } from "zustand";

const HOST = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
console.log("HOST:", HOST);

export const useUserStore = create((set) => ({
  users: [],
  searchResults: [], // Renamed to avoid conflict
  isLoading: false, // Added loading state
  error: null, // Added error state

  // Set users directly
  setUsers: (users) => set({ users }),

  // Set search results
  setSearchResults: (searchResults) => set({ searchResults }),

  // Create a new user
  createUser: async (newUser) => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      return { success: false, message: "Please fill in all fields." };
    }

    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (data.success) {
        set((state) => ({
          users: [...state.users, data.data],
          isLoading: false,
        }));
        return { success: true, message: "User created successfully." };
      } else {
        set({
          isLoading: false,
          error: data.message || "Error creating user.",
        });
        return {
          success: false,
          message: data.message || "Error creating user.",
        };
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Fetch all users
  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/users`);
      const data = await res.json();

      if (data.success) {
        set({ users: data.data, isLoading: false });
      } else {
        set({
          isLoading: false,
          error: data.message || "Error fetching users.",
        });
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        set((state) => ({
          users: state.users.filter((user) => user._id !== id),
          isLoading: false,
        }));
        return { success: true, message: "User deleted successfully." };
      } else {
        set({
          isLoading: false,
          error: data.message || "Error deleting user.",
        });
        return {
          success: false,
          message: data.message || "Error deleting user.",
        };
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Update a user
  updateUser: async (id, user) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (data.success) {
        set((state) => ({
          users: state.users.map((u) => (u._id === id ? data.data : u)),
          isLoading: false,
        }));
        return { success: true, message: "User updated successfully." };
      } else {
        set({
          isLoading: false,
          error: data.message || "Error updating user.",
        });
        return {
          success: false,
          message: data.message || "Error updating user.",
        };
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Search users
  searchUsers: async (query) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/users/search?query=${query}`);
      const data = await res.json();

      if (data.success) {
        set({ searchResults: data.data, isLoading: false });
      } else {
        set({
          isLoading: false,
          error: data.message || "Error searching users.",
        });
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
    }
  },
}));
