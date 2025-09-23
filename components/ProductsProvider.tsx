"use client";
import { useEffect } from "react";
import { useProductsStore } from "@/store/useProductsStore";

export default function ProductsProvider() {
  const fetchProducts = useProductsStore((s) => s.fetchProducts);
  useEffect(() => {
    fetchProducts("/data.json");
  }, [fetchProducts]);

  return null;
}
