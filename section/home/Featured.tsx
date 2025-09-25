"use client";
import ViewAllButton from "@/components/buttons/ViewAllButton";
import FeaturedCards from "@/components/FeaturedCards";
import { motion } from "motion/react";
import { containerVariant } from "@/lib/animate/animate";
export default function Featured() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="custom-container py-16 "
    >
      <h2 className="text-3xl lg:text-4xl font-light  ">Featured Items</h2>
      <div className="flex flex-col md:flex-row justify-between gap-2 items-start mt-2">
        <p className=" text-neutral-600 max-w-md text-left ">
          Curated essentials for the modern wardrobe
        </p>
        <div className="self-start">
          <ViewAllButton />
        </div>
      </div>

      <div className="mt-8">
        <FeaturedCards />
      </div>
    </motion.div>
  );
}
