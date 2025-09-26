"use client";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animate/animate";
import SubscribeButton from "./buttons/SubscribeButton";
export default function Cta() {
  return (
    <div className="bg-neutral-background">
      <motion.div
        {...fadeInUp}
        className="custom-container text-center py-24 space-y-4"
      >
        <h2 className="text-3xl lg:text-4xl font-light  ">Stay in Touch </h2>
        <p className=" text-neutral-600 max-w-md w-full mx-auto ">
          Be the first to know about new collections and exclusive offers{" "}
        </p>
        <div className="mt-8 flex justify-center ">
          <form className="flex flex-col  sm:flex-row gap-2 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-2 py-3 text-sm sm:px-4 sm:py-2 sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <SubscribeButton />
          </form>
        </div>
      </motion.div>
    </div>
  );
}
