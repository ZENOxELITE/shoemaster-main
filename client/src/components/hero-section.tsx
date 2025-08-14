import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Step Into
              <span className="gradient-text block">Excellence</span>
            </h2>
            <p className="text-xl lg:text-2xl mb-8 text-gray-300 leading-relaxed">
              Discover the perfect blend of style, comfort, and performance with our premium athletic footwear collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setLocation("/products")}
                className="bg-secondary hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline"
                onClick={() => setLocation("/products")}
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                View Collection
              </Button>
            </div>
          </div>
          <div className="animate-slide-up">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Premium athletic sneaker" 
                className="w-full h-auto animate-float drop-shadow-2xl rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-3xl transform scale-75 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
