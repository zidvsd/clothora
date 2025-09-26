"use client";
import { motion } from "motion/react";
import CategoryCards from "@/components/CategoryCards";
export default function Category() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="custom-container py-16 "
    >
      <h2 className="text-3xl lg:text-4xl font-light  text-center">
        Shop by Category
      </h2>
      <div className="mt-8">
        <CategoryCards />
      </div>
    </motion.div>
  );
}
