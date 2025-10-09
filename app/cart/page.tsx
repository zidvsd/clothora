"use client";
import { CartItem, useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, totalCost } =
    useCartStore();

  if (items.length === 0) {
    return (
      <section className="max-w-[1280px] h-screen flex flex-col gap-4 items-center justify-center mx-auto text-center py-8">
        <ShoppingBag className="size-16 text-neutral-600 font-bold" />
        <h2 className="text-3xl font-medium">Your cart is empty</h2>
        <p className="text-xl">Add items to get started</p>
        <Link
          className="text-white bg-black py-2 px-4 hover-utility hover:bg-black/80"
          href={"/"}
        >
          Continue Shopping
        </Link>
      </section>
    );
  }
  //

  return (
    <section className="custom-container py-8">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <ul className="flex flex-col gap-6">
        {items.map((item) => (
          <li
            key={`${item.id}-${item.size}-${item.color}`}
            className="flex items-start justify-between border border-neutral-200 p-4 shadow-md"
          >
            {/* Product Image */}
            <Link
              href={`/collections/${item.category}/${item.id}`}
              className="relative w-32 h-32 flex-shrink-0"
            >
              <Image
                src={item.images.main}
                alt={item.name}
                fill
                className="object-cover "
              />
            </Link>

            {/* Product Info */}
            <div className="flex-1 px-4">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-neutral-600">
                {item.colors[0]?.name || item.color} / Size {item.size}
              </p>
              <p className="text-sm text-neutral-700 mt-1">${item.price}</p>
            </div>

            {/* Quantity Selector & Remove */}
            <div className="flex items-center gap-2 self-center">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item.id,
                    item.size,
                    item.color,
                    Number(e.target.value)
                  )
                }
                className="border border-neutral-300 px-4 py-1 rounded text-sm"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeItem(item.id, item.size, item.color)}
                className="text-accent-foreground p-2 cursor-pointer  hover:bg-neutral-200 hover-utility"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* total section */}

      <section className="py-4 mt-8 border-t  border-neutral-200 space-y-8">
        <div className="flex justify-between">
          <p>Total</p>
          <p>${totalCost()}</p>
        </div>
        <div className="flex justify-between gap-4">
          {/* clear cart */}
          <button
            onClick={clearCart}
            className="py-2 px-4 border border-neutral-200 hover-utility cursor-pointer hover:bg-neutral-200 text-nowrap"
          >
            Clear Cart
          </button>

          {/* get receipt */}
          <Link
            href={"/checkout"}
            className="text-center cursor-pointer px-4 py-2 w-full bg-black text-white border border-neutral-2"
          >
            Checkout
          </Link>
        </div>
      </section>
    </section>
  );
}
