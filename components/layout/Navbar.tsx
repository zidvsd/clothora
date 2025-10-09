"use client";

import { Handbag, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { useToggle } from "@/hooks/useToggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import SearchTab from "../SearchTab";
import { navs } from "@/data/navs";
import { useCartStore } from "@/store/useCartStore";
import { container, item } from "@/lib/animate/animate";
export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const menu = useToggle(false);
  const search = useToggle(false);
  const pathname = usePathname(); // Current route

  // Determine active nav based on exact match
  const activeNav = navs.find((nav) => pathname === nav.href)?.href || "";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) menu.setFalse();
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [menu]);
  const handlePageChange = () => {
    menu.setFalse();
  };
  return (
    <section className="bg-background sticky top-0 z-50 border-b border-neutral-200 shadow-sm">
      <div className="relative py-4 w-full custom-container flex flex-row justify-between items-center">
        {/* Logo */}
        <div
          className={`select-none flex flex-row items-center gap-2 ${
            menu.state ? "hidden" : "flex"
          }`}
        >
          <Handbag className="size-6" />
          <Link href={"/"} className="font-bold">
            <h1 className="text-3xl">Clothora</h1>
          </Link>
        </div>
        {/* Desktop navigation */}
        <ul className="flex-row items-center gap-6 hidden lg:flex">
          {navs.map((nav) => (
            <li key={nav.href}>
              <Link
                href={nav.href}
                className={`
                  relative opacity-60 hover:opacity-100
                  after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-current after:transition-all after:duration-300
                  ${
                    activeNav === nav.href
                      ? "after:w-full opacity-100"
                      : "after:w-0"
                  }
                `}
              >
                {nav.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Right icons */}
        <div className="flex flex-row items-center gap-4">
          <button
            onClick={() => search.setTrue()}
            className="hover-utility cursor-pointer hover:bg-neutral-300 p-2 rounded-full"
          >
            <Search className="size-6" />
          </button>

          <Link
            href={"/cart"}
            className="hover-utility relative cursor-pointer hover:bg-neutral-300 p-2 rounded-full"
          >
            <ShoppingBag className="size-6 relative" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-semibold bg-black text-white rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={menu.toggle}
            className="hover-utility cursor-pointer hover:bg-neutral-300 p-2 rounded-full lg:hidden"
          >
            {menu.state ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
        {/* Mobile navigation */}
        <AnimatePresence>
          {menu.state && (
            <motion.div
              key="mobile-menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute w-full left-0 top-4 flex flex-col gap-y-8 pl-4 bg-white z-50"
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <Handbag className="size-6" />
                  <Link href={"/"} className="font-bold">
                    <h1 className="text-3xl">Clothora</h1>
                  </Link>
                </div>
                <button
                  className="hover-utility cursor-pointer hover:bg-neutral-300 p-2 rounded-full lg:hidden"
                  onClick={menu.toggle}
                >
                  <X className="size-6" />
                </button>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-8"
              >
                {navs.map((nav) => (
                  <motion.div key={nav.label} variants={item}>
                    <Link
                      onClick={handlePageChange}
                      href={nav.href}
                      className={`opacity-70 hover-utility hover:opacity-100 text-3xl ${
                        activeNav === nav.href ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      {nav.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {search.state && (
        <SearchTab
          isOpen={search.state}
          closeSearch={search.setFalse} // or search.toggle if you want toggle
        />
      )}{" "}
    </section>
  );
}
