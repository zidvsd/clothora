// lib/utils.ts (or lib/filterProducts.ts)
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  colors: { hex: string }[];
  sizes: string[];
  images: { main: string };
  inStock: boolean;
}

export interface Filters {
  priceRange: number[];
  colors: string[];
  sizes: string[];
}

export function filterProducts(products: Product[], filters: Filters) {
  return products.filter((product) => {
    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    const matchesColor =
      filters.colors.length > 0
        ? product.colors.some((c) => filters.colors.includes(c.hex))
        : true;

    const matchesSize =
      filters.sizes.length > 0
        ? product.sizes.some((s) => filters.sizes.includes(s))
        : true;

    return matchesPrice && matchesColor && matchesSize;
  });
}
export function capitalizeTitle(str: string) {
  return str
    .split("-")
    .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
    .join(" ");
}
export function normalizeStringCategory(str: string) {
  const exceptions = ["pants", "jeans", "sleeveless", "shorts", "jackets"];

  if (exceptions.includes(str)) {
    return str;
  }
  return str.endsWith("s") ? str.slice(0, -1) : str;
}
