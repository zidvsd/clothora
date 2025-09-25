import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ViewAllButton() {
  return (
    <Link
      href="/collections"
      className="group flex flex-row items-center gap-2   hover-utility hover:opacity-80 transition"
    >
      <span>View All</span>
      <ArrowRight className=" transition group-hover:translate-x-1 group-hover:opacity-80" />
    </Link>
  );
}
