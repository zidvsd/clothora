"use client";
import { motion, AnimatePresence } from "motion/react";
import { useToggle } from "@/hooks/useToggle";
import { useState, useEffect } from "react";
import { Funnel } from "lucide-react";
import { fadeInUpLoop } from "@/lib/animate/animate";
import filterData from "@/data/filters.json";

export default function Filters() {
  const filters = useToggle(false);
  const [price, setPrice] = useState(0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        filters.setTrue(); // always open on desktop
      }
      // ❌ don't auto-close on mobile, let the button control it
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [filters]);
  return (
    <div>
      <button
        onClick={filters.toggle}
        className="lg:hidden flex gap-2 items-center"
      >
        <Funnel className="size-4" />
        <span className="text-sm">Filters</span>
      </button>

      <AnimatePresence>
        {filters.state && (
          <motion.div
            key="filters"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUpLoop}
            className="flex flex-col"
          >
            <h3 className="mt-4">FILTERS</h3>

            {/* price range */}
            <div className="flex flex-col gap-2 w-full mt-8">
              <label htmlFor="price" className="text-sm font-medium">
                Price
              </label>
              <input
                id="price"
                type="range"
                max="500"
                value={price}
                step={10}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-black"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${price}</span>
                <span>$500</span>
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
                      className={`cursor-pointer hover-utility hover:opacity-75 rounded-full size-8 border transition 
                        ${
                          selectedColors.includes(color)
                            ? "ring-1 ring-black"
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
                      className={`hover-utility hover:bg-black cursor-pointer hover:text-white rounded-md w-full border py-3 text-sm text-center transition 
            ${
              selectedSizes.includes(size)
                ? "bg-black text-white border-black"
                : "border-neutral-300 text-black"
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
