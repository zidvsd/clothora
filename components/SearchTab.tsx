"use client";

import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useProductsStore } from "@/store/useProductsStore";
import Link from "next/link";
import Image from "next/image";
interface SearchTabProps {
  isOpen: boolean;
  closeSearch: () => void;
}
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: {
    main: string;
    hover?: string;
  };
}
export default function SearchTab({ isOpen, closeSearch }: SearchTabProps) {
  const { products } = useProductsStore();
  const [value, setValue] = useState("");
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (val: string) => {
    const query = val.toLowerCase();
    const filtered = products?.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    setMatchedProducts(filtered || []);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
        inputRef.current?.blur();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeSearch]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={closeSearch}
      />

      {/* Search Section */}
      <motion.section
        key="search-bar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 w-full bg-white z-50 shadow-md border-b border-neutral-200"
      >
        <div className="custom-container py-4 mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full">
            <Search className="text-neutral-500" />
            <input
              onChange={(e) => {
                const newValue = e.target.value;
                setValue(newValue);
                handleSearch(newValue); // ✅ fixed: pass newValue not old value
              }}
              value={value}
              ref={inputRef}
              type="text"
              placeholder="Search for products..."
              className="w-full text-black placeholder:text-neutral-400 focus:outline-none"
            />
          </div>
          <button
            onClick={closeSearch}
            className="hover:bg-neutral-200 p-2 rounded-full transition"
          >
            <X className="text-neutral-600" />
          </button>
        </div>

        {/* Search Results */}
        {value && (
          <div className="border-t border-neutral-200">
            <div className="max-h-[60vh] custom-container overflow-y-auto">
              {/* Results count */}
              {matchedProducts.length !== 0 ? (
                <div className=" py-2">
                  <span className="text-neutral-400 text-sm font-light">
                    {matchedProducts.length} results
                  </span>
                </div>
              ) : null}

              {matchedProducts.length > 0 ? (
                matchedProducts.map((p, index) => (
                  <Link
                    href={`/collections/${p.category}/${p.id}`}
                    key={`${p.id}-${index}`}
                    className="flex items-center gap-4 px-6 py-3 hover:bg-neutral-200 hover-utility"
                    onClick={closeSearch}
                  >
                    {/* Image */}
                    <div className="relative w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden ">
                      <Image
                        src={p.images.main}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-black truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-neutral-500 capitalize">
                        {p.category}
                      </p>
                      <span className="text-sm text-neutral-600 whitespace-nowrap">
                        ${p.price}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="px-6 py-3 text-sm text-center text-neutral-500">
                  No results found for &quot;
                  <span className="font-medium">{value}</span>&quot;
                </p>
              )}
            </div>
          </div>
        )}
      </motion.section>
    </AnimatePresence>
  );
}
