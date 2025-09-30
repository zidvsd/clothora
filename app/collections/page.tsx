"use client";
import { useState, useMemo } from "react";
import Filters from "@/components/Filters";
import ProductList from "@/components/ProductList";
import { useProductsStore } from "@/store/useProductsStore";
import { filterProducts, Filters as FiltersType } from "@/lib/utils";

export default function Page() {
  const [filters, setFilters] = useState<FiltersType>({
    priceRange: [0, 500],
    colors: [],
    sizes: [],
  });

  const { products } = useProductsStore();
  const filteredProducts = useMemo(() => {
    return products ? filterProducts(products, filters) : [];
  }, [products, filters]);

  return (
    <div className="custom-container grid grid-cols-1 lg:grid-cols-[20%_80%] gap-4">
      <div className="mt-8 w-full">
        <Filters
          title="All Collections"
          filters={filters}
          setFilters={setFilters}
          productCount={filteredProducts.length}
        />
      </div>

      <div className="w-full pt-4 lg:pt-0">
        <ProductList
          title="All Collections"
          filters={filters}
          setFilters={setFilters}
          products={filteredProducts} // pass directly
        />
      </div>
    </div>
  );
}
