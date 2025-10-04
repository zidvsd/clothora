"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Breadcrumbs() {
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);
  return (
    <nav className="text-sm text-neutral-600 mb-4">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="text-neutral-600 hover:underline">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/"); // cumulative path
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="capitalize text-black">{segment}</span>
              ) : (
                <Link
                  href={href}
                  className="capitalize text-neutral-600 hover:underline"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
