import { create } from "zustand";
export type ProductType = {
  name: string;
  price: number;
  image: string;
};
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products: any[]) => set({ products }),
  addProduct: async (newProduct: ProductType) => {
    if (!newProduct.name) {
      return { success: false, message: "Please fill all fields" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state: any) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product added successfully" };

  },
}));
