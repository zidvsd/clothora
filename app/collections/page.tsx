"use client";
import Filters from "@/components/Filters";
import { useProductsStore } from "@/store/useProductsStore";
import { containerVariant } from "@/lib/animate/animate";
import Image from "next/image";
import { useState, useMemo } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animate/animate";
import "react-loading-skeleton/dist/skeleton.css";

export default function Collections() {
  const { products, loading } = useProductsStore();
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    colors: [] as string[],
    sizes: [] as string[],
  });

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      // price filter
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      // color filter

      const matchesColor =
        filters.colors.length > 0
          ? product.colors.some((c) => filters.colors.includes(c.hex))
          : true;

      const matchesSize =
        filters.sizes.length > 0
          ? product.sizes.some((s) => filters.sizes.includes(s))
          : true;

      return matchesPrice && matchesColor && matchesSize;
    });
  }, [products, filters]);

  return (
    <section
      className="custom-container py-8
    "
    >
      <h1 className="text-3xl lg:text-4xl font-light  text-left">
        All Collections
      </h1>
      <h3 className="text-neutral-500 mt-2">
        {loading
          ? "Loading products..."
          : `${filteredProducts?.length || 0} products`}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-[20%_80%] gap-4">
        <div className="mt-8">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full gap-4 grid grid-cols-2 lg:grid-cols-3 border-t border-neutral-200 pt-4 lg:border-none"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-y-2">
                  <Skeleton height={256} />
                  <Skeleton width="70%" />
                  <Skeleton width="40%" />
                </div>
              ))
            : filteredProducts?.map((product, index) => (
                <motion.div key={product.id} {...fadeInUp}>
                  <Link
                    href={`/collections/${product.category}/${product.id}`}
                    className="relative flex flex-col gap-y-2"
                  >
                    <div className="relative w-full h-64 sm:h-auto aspect-square">
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-neutral-600">
                      {product.name}
                    </span>
                    <span className="text-neutral-600 text-sm">
                      ${product.price}
                    </span>

                    {!product.inStock && (
                      <span className="absolute top-2 left-2 bg-orange-200 px-2 text-sm font-light">
                        Out of Stock
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
