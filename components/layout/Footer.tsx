// Footer.tsx
"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Handbag,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { navs } from "@/data/navs";
export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-200 ">
      <div className="custom-container py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <div className={`flex flex-row items-center gap-2`}>
            <Handbag className="size-6" />
            <Link href={"/"} className="font-bold">
              <h1 className="text-3xl">Clothora</h1>
            </Link>
          </div>

          <p className="text-gray-600 text-sm">
            Premium fashion for the modern minimalist. Quality pieces that
            transcend trends.
          </p>
          <div className="flex gap-3 text-gray-600">
            <Facebook className="hover:text-black cursor-pointer hover-utility" />
            <Instagram className="hover:text-black cursor-pointer hover-utility" />
            <Twitter className="hover:text-black cursor-pointer hover-utility" />
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-xl opacity-90 mb-4">Shop</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            {navs.map((nav) => (
              <li key={nav.label} className="hover:text-black hover-utility">
                <Link href={nav.href}>{nav.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-xl opacity-90 mb-4">Customer Care</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Size Guide</li>
            <li>Care Instructions</li>
            <li>Returns & Exchanges</li>
            <li>Shipping Info</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl opacity-90 mb-4">Contact Us</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="flex gap-2 items-center">
              {" "}
              <Mail className="size-4" /> hello@minimalist.com
            </li>
            <li className="flex gap-2 items-center">
              {" "}
              <Phone className="size-4" /> +1 (555) 123-4567
            </li>
            <li className="flex gap-2 items-center">
              {" "}
              <MapPin className="size-4" /> 123 Fashion District, New York, NY
              10001
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="custom-container border-t border-gray-200 mt-8 py-4 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm px-6">
        <span>© 2024 Clothora. All rights reserved.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="hover:text-black cursor-pointer hover-utility">
            Privacy Policy
          </span>
          <span className="hover:text-black cursor-pointer hover-utility">
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}
