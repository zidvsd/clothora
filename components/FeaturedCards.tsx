"use client";
import { useProductsStore } from "@/store/useProductsStore";
import Image from "next/image";
import { motion } from "motion/react";
import { containerVariant } from "@/lib/animate/animate";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FeaturedCards() {
  const { loading, products } = useProductsStore();
  const filteredProductsFeatured = products
    ?.filter((product) => product.featured)
    .slice(0, 4);
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="  grid grid-cols-1 gap-4
    md:grid-cols-2 md:gap-4
    lg:grid-cols-4 lg:gap-5"
    >
      {loading
        ? // Skeletons while loading
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-2 h-[480px]">
              <Skeleton height={420} />
              <Skeleton width="80%" />
              <Skeleton width="40%" />
            </div>
          ))
        : filteredProductsFeatured?.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link
                href={`/collections/${product.category}/${product.id}`}
                className="group text-neutral-600 h-[480px] flex flex-col"
              >
                {/* Image wrapper */}
                <div className="relative h-[420px] w-full overflow-hidden">
                  {/* Default image */}
                  <Image
                    fill
                    src={product.images.main}
                    alt={product.name}
                    className={`object-cover transition-all duration-300 ${
                      product.images.hover
                        ? "group-hover:opacity-0"
                        : "group-hover:brightness-90"
                    }`}
                  />
                  {/* Hover image */}
                  {product.images.hover && (
                    <Image
                      fill
                      src={product.images.hover}
                      alt={product.name}
                      className="object-cover transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:brightness-90"
                    />
                  )}
                </div>
                {/* Text below image */}
                <h3 className="mt-2">{product.name}</h3>
                <h3 className="text-sm text-neutral-600">${product.price}</h3>
              </Link>
            </motion.div>
          ))}
    </motion.div>
  );
}
