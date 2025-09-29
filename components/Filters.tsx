"use client";
import { motion, AnimatePresence } from "motion/react";
import { useToggle } from "@/hooks/useToggle";
import React, { useState, useEffect } from "react";
import { Funnel } from "lucide-react";
import { fadeInUpLoop } from "@/lib/animate/animate";
import filterData from "@/data/filters.json";

interface FiltersProps {
  filters: {
    priceRange: number[];
    colors: string[];
    sizes: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      priceRange: number[];
      colors: string[];
      sizes: string[];
    }>
  >;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  const sidebar = useToggle(false);
  const toggleSize = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        sidebar.setTrue();
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebar]);
  return (
    <div>
      <button
        onClick={sidebar.toggle}
        className="lg:hidden flex gap-2 items-center"
      >
        <Funnel className="size-4" />
        <span className="text-sm">Filters</span>
      </button>

      <AnimatePresence>
        {sidebar.state && (
          <motion.div
            key="filters"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUpLoop}
            className="flex flex-col"
          >
            <h3 className="mt-4 lg:mt-0 ">FILTERS</h3>

            {/* price range */}
            <div className="flex flex-col gap-2 w-full mt-6">
              <label htmlFor="price" className="text-sm font-medium">
                Price
              </label>
              <input
                id="price"
                type="range"
                max="500"
                value={filters.priceRange[1]}
                step={10}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], Number(e.target.value)],
                  }))
                }
                className="w-full accent-black"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            {/* colors */}
            <div className="flex flex-col gap-2 mt-8">
              <span className="text-sm font-medium">Colors</span>
              <ul className="grid grid-cols-5 w-full gap-2 mt-4 place-items-start">
                {filterData.colors.map((color, index) => (
                  <li key={index}>
                    <button
                      onClick={() => toggleColor(color)}
                      style={{ backgroundColor: color }}
                      className={`cursor-pointer rounded-full size-8 border transition 
                        ${
                          filters.colors.includes(color)
                            ? "ring-2 ring-black"
                            : "border-neutral-200"
                        }`}
                    ></button>
                  </li>
                ))}
              </ul>
            </div>
            {/* sizes */}
            <div className="flex flex-col gap-2 mt-8">
              <span className="text-sm font-medium">Sizes</span>
              <ul className="grid grid-cols-3 gap-2 w-full">
                {filterData.sizes.map((size, index) => (
                  <li key={index} className="w-full">
                    <button
                      onClick={() => toggleSize(size)}
                      className={`rounded-md cursor-pointer w-full border py-3 text-sm text-center transition 
                        ${
                          filters.sizes.includes(size)
                            ? "bg-black text-white border-black"
                            : "border-neutral-300 text-black hover:bg-black hover:text-white"
                        }`}
                    >
                      {size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
