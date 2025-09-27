"use client";
import Filters from "@/components/Filters";
import { useProductsStore } from "@/store/useProductsStore";
export default function Collections() {
  const { products } = useProductsStore();
  return (
    <section
      className="custom-container py-8
    "
    >
      <h1 className="text-3xl lg:text-4xl font-light  text-left">
        All Collections
      </h1>
      <h3 className="text-neutral-500 mt-2">{products?.length} products</h3>

      <div className="grid grid-cols-1 lg:grid-cols-[20%_80%]">
        <div className="mt-8">
          <Filters />
        </div>
      </div>
    </section>
  );
}
