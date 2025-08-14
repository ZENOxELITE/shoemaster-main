import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CollectionsBanner() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">New Collections</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Explore our latest seasonal collections featuring cutting-edge technology and innovative designs that push the boundaries of athletic footwear.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-secondary text-3xl mb-4">🏃</div>
                <h3 className="text-2xl font-bold mb-2">Running Collection</h3>
                <p className="text-gray-300 mb-4">Engineered for speed and endurance</p>
                <Button 
                  variant="ghost" 
                  onClick={() => setLocation("/category/running")}
                  className="text-secondary hover:text-orange-400 hover:bg-white/10 p-0"
                >
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-secondary text-3xl mb-4">🏀</div>
                <h3 className="text-2xl font-bold mb-2">Basketball Collection</h3>
                <p className="text-gray-300 mb-4">Dominate the court with style</p>
                <Button 
                  variant="ghost" 
                  onClick={() => setLocation("/category/training")}
                  className="text-secondary hover:text-orange-400 hover:bg-white/10 p-0"
                >
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800" 
              alt="Athletic shoes collection" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
