"use client";

import { useKeenSlider } from "keen-slider/react";
import { useProductsStore } from "@/store/useProductsStore";

import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";

export default function Carousel() {
  const { products, loading, error, fetchProducts } = useProductsStore();
  const filteredProductsLatest = products?.filter(
    (product) => product.featured === true
  );

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
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

  return (
    <div ref={sliderRef} className="keen-slider w-full h-[300px]">
      {filteredProductsLatest?.map((product, index) => (
        <div key={index} className="text-neutral-600 keen-slider__slide">
          <h3>{product.name}</h3>
          <h3>${product.price}</h3>
        </div>
      ))}
    </div>
  );
}
