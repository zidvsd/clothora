import { create } from "zustand";
type Colors = {
  name: string;
  hex: string;
};
type Images = {
  main: string;
  hover: string;
};
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  sizes: string[];
  colors: Colors[];
  images: Images;
  inStock: boolean;
  featured: boolean;
};
type ProductsState = {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
  fetchProducts: (url: string) => Promise<void>;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: null,
  loading: false,
  error: null,

  fetchProducts: async (url: string) => {
    if (get().products) return;
    set({ loading: true, error: null });
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      set({ products: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
