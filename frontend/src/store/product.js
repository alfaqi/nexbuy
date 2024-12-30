import { create } from "zustand";

const HOST = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
console.log("aaa:", HOST);

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch(`${HOST}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    if (data.success) {
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully." };
    } else return { success: false, message: "Error" };
  },
  fetchProducts: async () => {
    const res = await fetch(`${HOST}/api/products`);
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`${HOST}/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
      return { success: true, message: "Product deleted successfully." };
    } else return { success: false, message: "Error" };
  },
  updateProduct: async (id, product) => {
    const res = await fetch(`${HOST}/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    if (data.success) {
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data.data : p)),
      }));
      return { success: true, message: "Product updated successfully." };
    } else return { success: false, message: "Error" };
  },
}));
