"use client";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useProductsStore } from "@/store/useProductsStore";
import Link from "next/link";
import { containerVariant } from "@/lib/animate/animate";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { carouselContainer, container, item } from "@/lib/animate/animate";
import { useEffect } from "react";
export default function Carousel() {
  const { products } = useProductsStore();
  const filteredProductsLatest = products?.filter(
    (product) => product.latest === true
  );
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    mode: "free",
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 20,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 4,
          spacing: 20,
        },
      },
    },
  });

  useEffect(() => {
    if (instanceRef.current) {
      setTimeout(() => {
        instanceRef.current?.update();
      }, 100); // delay to wait for motion animations
    }
  }, [instanceRef, filteredProductsLatest]);

  return (
    <div className="relative w-full">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider w-full">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          animate="show"
          viewport={{ once: true, amount: 0.6 }}
          className="w-full flex"
        >
          {filteredProductsLatest?.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="keen-slider__slide"
            >
              <Link
                href={`/collections/${product.category}/${product.id}`}
                key={index}
                className="group text-neutral-600 h-[480px]  flex flex-col"
              >
                {/* Image wrapper */}
                <div className="relative h-[420px] w-full overflow-hidden">
                  {/* Default image */}
                  <Image
                    fill
                    src={product.images.main}
                    alt={product.name}
                    className={`object-cover transition-all duration-300 ${
                      product.images.hover
                        ? "group-hover:opacity-0"
                        : "group-hover:scale-110"
                    }`}
                  />
                  {/* Hover image (only if available) */}
                  {product.images.hover && (
                    <Image
                      fill
                      src={product.images.hover}
                      alt={product.name}
                      className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                  )}
                </div>
                {/* Text below image */}
                <h3 className="mt-2">{product.name}</h3>
                <h3 className="text-sm text-neutral-600">${product.price}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Prev Button */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="hidden cursor-pointer xl:flex absolute top-1/2 -left-6 -translate-y-1/2 p-2 bg-white shadow-md rounded-full hover:bg-neutral-100"
      >
        <ChevronLeft className="h-6 w-6 text-black" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => instanceRef.current?.next()}
        className="hidden cursor-pointer xl:flex absolute top-1/2 -right-6 -translate-y-1/2 p-2 bg-white shadow-md rounded-full hover:bg-neutral-100"
      >
        <ChevronRight className="h-6 w-6 text-black" />
      </button>
    </div>
  );
}
