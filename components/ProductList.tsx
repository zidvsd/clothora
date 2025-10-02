"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { fadeInUp, containerVariant } from "@/lib/animate/animate";
import "react-loading-skeleton/dist/skeleton.css";
import { Product } from "@/lib/utils";

interface ProductListProps {
  title: string;
  products: Product[];
}

export default function ProductList({ products, title }: ProductListProps) {
  return (
    <section className="py-8">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full gap-4 grid grid-cols-2 lg:grid-cols-3 border-t border-neutral-200 lg:border-none"
      >
        {products.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-y-2">
                <Skeleton height={256} />
                <Skeleton width="70%" />
                <Skeleton width="40%" />
              </div>
            ))
          : products.map((product) => (
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
    </section>
  );
}
