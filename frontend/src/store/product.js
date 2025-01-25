import { create } from "zustand";

const HOST = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
console.log("HOST:", HOST);

export const useProductStore = create((set) => ({
  products: [],
  searchResults: [], // Renamed to avoid conflict
  isLoading: false, // Added loading state
  error: null, // Added error state

  // Set products directly
  setProducts: (products) => set({ products }),

  // Set search results
  setSearchResults: (searchResults) => set({ searchResults }),

  // Create a new product
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();

      if (data.success) {
        set((state) => ({
          products: [...state.products, data.data],
          isLoading: false,
        }));
        return { success: true, message: "Product created successfully." };
      } else {
        set({
          isLoading: false,
          error: data.message || "Error creating product.",
        });
        return {
          success: false,
          message: data.message || "Error creating product.",
        };
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/products`);
      const data = await res.json();

      if (data.success) {
        set({ products: data.data, isLoading: false });
      } else {
        set({
          isLoading: false,
          error: data.message || "Error fetching products.",
        });
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
          isLoading: false,
        }));
        return { success: true, message: "Product deleted successfully." };
      } else {
        set({
          isLoading: false,
          error: data.message || "Error deleting product.",
        });
        return {
          success: false,
          message: data.message || "Error deleting product.",
        };
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Update a product
  updateProduct: async (id, product) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();

      if (data.success) {
        set((state) => ({
          products: state.products.map((p) => (p._id === id ? data.data : p)),
          isLoading: false,
        }));
        return { success: true, message: "Product updated successfully." };
      } else {
        set({
          isLoading: false,
          error: data.message || "Error updating product.",
        });
        return {
          success: false,
          message: data.message || "Error updating product.",
        };
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
      return { success: false, message: "Network error. Please try again." };
    }
  },

  // Search products
  searchProducts: async (query) => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${HOST}/api/products/search?query=${query}`);
      const data = await res.json();

      if (data.success) {
        set({ searchResults: data.data, isLoading: false });
      } else {
        set({
          isLoading: false,
          error: data.message || "Error searching products.",
        });
      }
    } catch (error) {
      set({ isLoading: false, error: "Network error. Please try again." });
    }
  },
}));
