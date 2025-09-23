import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function ShopButton() {
  return (
    <Link
      href={"/collections"}
      className="flex flex-row gap-x-4 px-6 text-nowrap py-3 bg-black text-white  hover-utility hover:bg-black/80 "
    >
      Shop Collection
      <ArrowRight className="size-5 mt-1 text-white" />
    </Link>
  );
}
