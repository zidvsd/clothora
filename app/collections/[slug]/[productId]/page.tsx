export default function ProductPage({
  params,
}: {
  params: { slug: string; productId: string };
}) {
  return (
    <div className="custom-container">
      <h1>Product Page</h1>
      <p>Category: {params.slug}</p>
      <p>Product ID: {params.productId}</p>
    </div>
  );
}
