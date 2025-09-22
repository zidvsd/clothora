"use client";

import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
interface SearchTabProps {
  isOpen: boolean;
  closeSearch: () => void;
}

export default function SearchTab({ isOpen, closeSearch }: SearchTabProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
        onClick={closeSearch} // clicking outside closes search
      />

      {/* Search bar */}
      <motion.section
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 w-full bg-background z-50 shadow-md border-b-neutral-200 border-b "
      >
        <div className="custom-container py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <Search className="text-neutral-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full text-black focus:outline-none"
            />
          </div>
          <button className="hover-utility cursor-pointer hover:bg-neutral-300 p-2 rounded-full ">
            <X onClick={closeSearch} className="cursor-pointer " />
          </button>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
