import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";

// Define Product type locally
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  brand: string;
  featured: boolean;
  badge?: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

export default function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const response = await fetch("/api/products/featured");
      if (!response.ok) {
        throw new Error("Failed to fetch featured products");
      }
      return response.json();
    },
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-primary mb-4">Featured Products</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Discover our most popular athletic footwear, designed for peak performance and unmatched style.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl card-shadow animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No featured products found.</p>
          </div>
        )}
      </div>
    </section>
  );
}