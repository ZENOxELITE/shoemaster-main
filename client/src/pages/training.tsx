import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";

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

export default function TrainingPage() {
  const [, setLocation] = useLocation();
  
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products", "category", "training"],
    queryFn: async () => {
      const response = await fetch("/api/products/category/Training");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  return (
    <div className="min-h-screen bg-neutral">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-orange-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-black mb-6">Training Shoes</h1>
            <p className="text-xl lg:text-2xl max-w-3xl mx-auto">
              Dominate your workouts with our high-performance training footwear. 
              Built for strength, stability, and explosive movements in the gym.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold text-primary">Training Collection</h2>
              <button 
                onClick={() => setLocation("/products")}
                className="text-secondary hover:text-orange-600 font-semibold transition-colors duration-200"
              >
                View All Products →
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
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
              <div className="text-center py-20">
                <div className="text-6xl mb-4">💪</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Training Shoes Found</h3>
                <p className="text-gray-600 mb-8">
                  We're currently updating our training collection. Check back soon for the latest gym shoes!
                </p>
                <button 
                  onClick={() => setLocation("/products")}
                  className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
                >
                  Browse All Products
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-primary mb-16">Why Choose Our Training Shoes?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🏋️</div>
                <h3 className="text-xl font-semibold mb-3">Stability</h3>
                <p className="text-gray-600">Enhanced stability for heavy lifts and compound movements with reinforced support.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Performance</h3>
                <p className="text-gray-600">Optimized for explosive movements, plyometrics, and high-intensity training.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🦶</div>
                <h3 className="text-xl font-semibold mb-3">Grip</h3>
                <p className="text-gray-600">Superior traction on gym floors for safe and confident movement during workouts.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
