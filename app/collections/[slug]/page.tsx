"use client";
import { useState, useMemo } from "react";
import Filters from "@/components/Filters";
import ProductList from "@/components/ProductList";
import { useProductsStore } from "@/store/useProductsStore";
import { filterProducts, Filters as FiltersType } from "@/lib/utils";
import { useParams } from "next/navigation";
import { capitalizeTitle, normalizeStringCategory } from "@/lib/utils";

export default function Page() {
  const [filters, setFilters] = useState<FiltersType>({
    priceRange: [0, 500],
    colors: [],
    sizes: [],
  });
  const params = useParams<{ slug: string }>();
  const { products } = useProductsStore();

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = filterProducts(products, filters);

    if (params.slug !== "all-collections") {
      result = result.filter(
        (p) => p.category === normalizeStringCategory(params.slug)
      );
    }
    console.log(params.slug);
    return result;
  }, [products, filters, params.slug]);

  return (
    <div className="custom-container grid grid-cols-1 lg:grid-cols-[20%_80%] gap-4">
      <div className="mt-8 w-full">
        <Filters
          title={capitalizeTitle(params.slug)}
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
