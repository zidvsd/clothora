"use client";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
export default function ViewLatestButton() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      const section = document.getElementById("latest-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <button
      onClick={scrollToSection}
      className="cursor-pointer gap-x-4 px-6 text-nowrap py-3 bg-transparent border border-neutral-200 text-black font-light  hover-utility hover:bg-black/10 "
    >
      View Latest
    </button>
  );
}
