"use client";
import { use } from "react";
export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return (
    <div
      className="custom-container
    "
    >
      <h1>{slug}</h1>
    </div>
  );
}
