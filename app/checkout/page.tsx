"use client";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Check, Download } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Receipt from "@/components/Receipt";
import {
  getFormattedDate,
  getFormattedTime,
  generateOrderNum,
} from "@/lib/utils";
export default function Page() {
  const { items, totalCost, clearCart } = useCartStore();

  // Input states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Error messages
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on typing
  };

  // Form validation
  const validateForm = () => {
    const newErrors = { name: "", phone: "", address: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number (10–11 digits).";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return; // stop if invalid

    toast.success(
      "Order placed successfully! You can now screenshot your receipt"
    );

    setTimeout(() => {
      setOrderPlaced(true);
    }, 1000);
  };

  if (orderPlaced) {
    return <Receipt formData={formData} />;
  }
  return (
    <div className="bg-neutral-light min-h-screen">
      <div className="mx-auto max-w-[768px] py-8 space-y-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-light mb-6">Checkout</h2>

        <form onSubmit={handleSubmit}>
          <section className="bg-background p-6 border border-neutral-200 shadow-md">
            <h2 className="text-lg mb-4">Customer Information</h2>

            {/* Full Name */}
            <label className="block mb-2">
              <span className="text-sm font-medium">Full Name *</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-2 block w-full border ${
                  errors.name ? "border-red-500" : "border-neutral-200"
                } p-2 text-sm`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </label>

            {/* Phone */}
            <label className="block mb-2">
              <span className="text-sm font-medium">Phone Number *</span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`mt-2 block w-full border ${
                  errors.phone ? "border-red-500" : "border-neutral-200"
                } p-2 text-sm`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </label>

            {/* Email */}
            <label className="block mb-2">
              <span className="text-sm font-medium">Email (Optional)</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full border border-neutral-200 p-2 text-sm"
              />
            </label>

            {/* Address */}
            <label className="block">
              <span className="text-sm font-medium">Delivery Address *</span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`mt-2 block w-full border ${
                  errors.address ? "border-red-500" : "border-neutral-200"
                } p-2 text-sm`}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </label>
          </section>

          {/* Order Summary */}
          <section className="flex flex-col bg-background p-6 border border-neutral-200 mt-6">
            <h2 className="text-lg mb-4">Order Summary</h2>
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex text-sm justify-between pb-2 border-b border-neutral-200"
                >
                  <span>
                    {item.name} ({item.color}, {item.size}) x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-4">
              <h3 className="font-semibold text-lg">Total Amount</h3>
              <span className="font-semibold">${totalCost()}</span>
            </div>
          </section>

          {/* Submit */}
          <button
            type="submit"
            className="hover-utility py-2 cursor-pointer hover:bg-black/80 w-full text-center bg-black text-white mt-6"
          >
            Place Order
          </button>

          <p className="text-center text-neutral-500 text-sm mt-2">
            Note: This will generate a receipt for you to screenshot and send to
            our Facebook page.
          </p>
        </form>
      </div>
    </div>
  );
}
