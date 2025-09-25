type Props = {
  params: { slug: string; productId: string };
};

export default function ProductPage({ params }: Props) {
  return (
    <div className="custom-container">Product Page {params.productId};</div>
  );
}
