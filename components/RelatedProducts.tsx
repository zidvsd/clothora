"use client";
import { useProductsStore } from "@/store/useProductsStore";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function RelatedProducts() {
  const params = useParams();
  const { slug, productId } = params;
  const { products } = useProductsStore();

  // Only show related items from same category excluding current product
  const relatedItems = products
    ?.filter((p) => p.category === slug && p.id !== productId)
    .slice(0, 4);

  if (!relatedItems || relatedItems.length === 0) return null;

  return (
    <div className="py-8">
      <h1 className="text-3xl">You Might Also Like</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-6">
        {relatedItems.map((item) => (
          <Link
            href={`/collections/${item.category}/${item.id}`}
            key={item.id}
            className="p-2 rounded-md group"
          >
            <div className="relative w-full h-[300px] md:h-[350px]">
              {/* Main Image */}
              <Image
                src={item.images.main}
                alt={item.name}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  item.images.hover ? "group-hover:opacity-0" : ""
                }`}
              />

              {/* Hover Image (if exists) */}
              {item.images.hover ? (
                <Image
                  src={item.images.hover}
                  alt={`${item.name} hover`}
                  fill
                  className="object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              ) : (
                // White overlay if no hover image
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
              )}
            </div>
            <h2 className="mt-2 font-medium">{item.name}</h2>
            <p className="text-neutral-600">${item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
