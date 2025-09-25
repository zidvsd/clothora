"use client";
import React from "react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  return (
    <div className="custom-container">
      <h1>{slug}</h1>
    </div>
  );
}
