"use client";
export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div
      className="custom-container
    "
    >
      <h1>{params.slug}</h1>
    </div>
  );
}
