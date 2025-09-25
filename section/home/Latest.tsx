"use client";
import Carousel from "@/components/ui/Carousel";
export default function Latest() {
  
  return (
    <div className="bg-neutral-background">
      <div
        id="latest-section"
        className="flex flex-col items-center justify-center space-y-2 custom-container py-24"
      >
        <h2 className="text-3xl lg:text-4xl font-light text-center ">
          New Arrivals
        </h2>
        <p className="text-center text-neutral-600">
          Fresh additions to our collection{" "}
        </p>

        <div className="mt-8 w-full">
          <Carousel />
        </div>
      </div>
    </div>
  );
}
