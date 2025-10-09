"use client";
import { Check, Download } from "lucide-react";
import { useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import { toPng } from "html-to-image";
import {
  generateOrderNum,
  getFormattedDate,
  getFormattedTime,
} from "@/lib/utils";
import Link from "next/link";
type ReceiptProps = {
  formData: { name: string; phone: string; email?: string; address: string };
};
export default function Receipt({ formData }: ReceiptProps) {
  const { items, totalCost, clearCart } = useCartStore();
  const receiptRef = useRef<HTMLDivElement>(null);
  // convert receipt to image and download
  const handleDownload = async () => {
    if (!receiptRef.current) return;

    try {
      const dataUrl = await toPng(receiptRef.current);
      const link = document.createElement("a");
      link.download = `clothora-receipt-${generateOrderNum()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="mx-auto max-w-[768px] py-8 space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-y-2 mt-8 text-center items-center justify-center">
          <Check className="text-green-700 text-xl size-16 bg-green-200 rounded-full p-4" />
          <h2 className="text-2xl font-light mt-2">
            Order Placed successfully!
          </h2>
          <p className="text-neutral-500 text-sm">
            Screenshot or download your receipt below
          </p>
          {/* receipt */}
        </div>
        <section
          ref={receiptRef}
          className="pt-8 bg-background flex flex-col items-center justify-center px-8  border border-neutral-200 shadow-md"
        >
          <div className="space-y-2 text-center">
            <h1 className="font-bold text-2xl">Clothora</h1>
            <h3 className="text-neutral-700">Premium Fashion Store</h3>
            <h4 className="text-neutral-500 text-sm">ORDER RECEIPT</h4>
          </div>

          {/* order id */}
          <div className="text-sm border-t w-full border-dashed border-neutral-300 my-4 py-4">
            <div className="flex justify-between">
              <p className="text-neutral-500">Order #:</p>
              <p className="black">{generateOrderNum().toUpperCase()}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-neutral-500">Date: </p>
              <p className="text-sm">
                {getFormattedDate()} at {getFormattedTime()}{" "}
              </p>
            </div>
          </div>
          {/* customer details */}
          <div className="text-sm border-t w-full border-dashed border-neutral-300 my-4 py-4">
            <h6 className="text-neutral-500">CUSTOMER</h6>
            <div className="flex flex-col mt-2">
              <p className="text-black">{formData.name} </p>
              <p className="text-neutral-500">{formData.phone}</p>
              <p className="text-neutral-500">{formData.address}</p>
            </div>
          </div>

          {/* item details */}
          <div className="text-sm border-t w-full border-dashed border-neutral-300 my-4 py-4">
            <h6 className="text-neutral-500">ITEMS</h6>
            <ul className="mt-2 space-y-2">
              {items.map((item) => (
                <li
                  className="flex justify-between"
                  key={`receipt-${item.id}-${item.color}-${item.size}`}
                >
                  {/* product name/size/qty */}
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-neutral-500">{`${item.color} / Size ${item.size} / Qty: ${item.quantity}`}</span>
                  </div>
                  {/* price per product */}
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Total cost */}
          <div className="text-sm border-t w-full border-dashed border-neutral-300 my-4 py-4">
            <div className="flex justify-between">
              <h3 className="text-lg text-black font-semibold">TOTAL</h3>
              <span className="text-lg text-black font-medium">
                ${totalCost()}
              </span>
            </div>
          </div>

          {/* greetings */}
          <div className="text-sm text-neutral-300 border-t text-center space-y-1 w-full border-dashed border-neutral-300 my-4 py-4">
            <p className="text-neutral-500">Thank you for your order!</p>
            <p className="text-neutral-500">
              Please send this receipt to our Facebook page
            </p>
            <p className="text-neutral-500">@Clothora.fashion</p>
          </div>
        </section>

        <div className="flex w-full gap-4">
          <button
            onClick={handleDownload}
            className="w-1/2 flex items-center hover-utility cursor-pointer hover:bg-neutral-200 justify-center py-2 gap-4 border border-neutral-200"
          >
            {" "}
            <Download /> <span>Download Receipt</span>
          </button>
          <Link
            onClick={clearCart}
            href="/"
            className="w-1/2 bg-black hover-utility cursor-pointer hover:bg-black/80 text-white text-center py-2"
          >
            New Order
          </Link>
        </div>
      </div>
    </div>
  );
}
