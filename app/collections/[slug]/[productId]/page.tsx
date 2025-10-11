"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useParams } from "next/navigation";
import { useProductsStore } from "@/store/useProductsStore";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import RelatedProducts from "@/components/RelatedProducts";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/lib/utils";
export default function ProductPage() {
  const { products } = useProductsStore();
  const { productId } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number
  ) => {
    addItem(product, size, color, quantity);
  };
  const product = products?.find((p) => p.id === productId);

  // local state for selected options
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product?.sizes[0] || ""
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.colors[0].name || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="custom-container py-8">
      {/* breadcrumbs */}
      <Breadcrumbs />

      {/* item details */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-8">
        {/* Image gallery */}
        <div className="grid grid-rows-[500px_300px] md:grid-rows-[600px_350px] gap-4">
          {/* Main Image */}
          <div className="relative w-full h-full row-span-1">
            <Image
              src={product.images.main}
              alt={product.name}
              fill
              className="object-cover "
              priority
            />
          </div>

          {/* Second row: hover image + main image again */}
          <div className="grid grid-cols-2 gap-4 row-span-1">
            {/* First image: hover or main fallback */}
            <div className="relative w-full h-full">
              <Image
                src={product.images.hover || product.images.main}
                alt={`${product.name} hover`}
                fill
                className="object-cover "
              />
            </div>

            {/* Second image: main image */}
            <div className="relative w-full h-full">
              <Image
                src={product.images.main}
                alt={`${product.name} main`}
                fill
                className="object-cover "
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl ">{product.name}</h1>
          <p className="mt-2 text-xl text-neutral-800">${product.price}</p>
          <p className="mt-2 text-neutral-500">{product.description}</p>

          {/* Colors */}
          <div className="mt-6">
            <h2 className="font-medium mb-2">Colors</h2>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  style={{ backgroundColor: c.hex }}
                  className={`cursor-pointer rounded-full size-8 border hover-utility
                    ${
                      selectedColor === c.name
                        ? "ring-2 ring-black"
                        : "border-neutral-200"
                    }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <h2 className="font-medium mb-2">Available Sizes</h2>
            <div className="flex gap-2 w-full">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={` cursor-pointer px-8 border py-3 text-sm text-center hover-utility 
                    ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-neutral-300 text-black hover:bg-black hover:text-white"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* quantity */}
          <div className="mt-6">
            <h2 className="font-medium mb-2">Quantity</h2>
            <div className="flex gap-8 w-full items-center">
              <button
                className="py-2 px-4 border border-neutral-200 text-neutral-700 hover-utility hover:border-black"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                className="py-2 px-4 border border-neutral-200 text-neutral-700 hover-utility hover:border-black"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              if (product && selectedSize && selectedColor) {
                toast.success("Successfully added product."),
                  handleAddToCart(
                    product,
                    selectedSize,
                    selectedColor,
                    quantity
                  );
              }
            }}
            className="cursor-pointer mt-8 px-6 py-3 w-full bg-black text-white  hover:bg-neutral-800 hover-utility"
          >
            Add to Cart
          </button>

          {/* policies */}
          <div className="pt-6 flex flex-col gap-2 text-sm text-neutral-700 border-t mt-6 border-neutral-200">
            <span>Free shipping on orders over $100 </span>
            <span>30-day return policy </span>
            <span>Made from sustainable materials</span>
          </div>
        </div>
      </div>

      <div className="py-8">
        <RelatedProducts />
      </div>
    </div>
  );
}
