"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { containerVariant } from "@/lib/animate/animate";
import { navs } from "@/data/navs";
import Link from "next/link";

export default function CategoryCards() {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5"
    >
      {navs.map((product, index) => (
        <motion.div
          key={product.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link
            href={product.href}
            className="group text-neutral-600 h-[480px] flex flex-col"
          >
            {/* Image wrapper */}
            <div className="relative h-[420px] w-full overflow-hidden">
              {/* Image container (we scale this via group-hover) */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  fill
                  src={product.img}
                  alt={product.label}
                  className="object-cover hover-utility transform-gpu group-hover:scale-110"
                />
              </div>
              {/* Text container */}
              <div className="absolute bottom-1/2 left-1/2  -translate-x-1/2 translate-y-1/2 z-10 text-center">
                <h3 className="text-2xl text-white">{product.label}</h3>
              </div>
              {/* Gradient white overlay (always visible) */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none"></div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
