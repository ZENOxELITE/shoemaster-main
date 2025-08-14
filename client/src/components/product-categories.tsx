import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

// Define Category type locally
interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export default function ProductCategories() {
  const [, setLocation] = useLocation();
  
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
  });

  return (
    <section className="py-20 bg-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-primary mb-4">Shop by Category</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Find the perfect shoe for every activity and lifestyle.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
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
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="group cursor-pointer"
                onClick={() => setLocation(`/category/${category.slug}`)}
              >
                <div className="relative overflow-hidden rounded-2xl card-shadow bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">{category.name}</h3>
                    <p className="text-neutral-600 mb-4">{category.description}</p>
                    <button className="text-secondary hover:text-orange-600 font-semibold transition-colors duration-200 flex items-center">
                      Shop {category.name} <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Categories will be loaded from the database when the backend is connected.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Run the seed script to populate the database with sample categories.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
