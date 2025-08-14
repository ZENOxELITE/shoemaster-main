import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ShoppingCart, Menu } from "lucide-react";
import CartSidebar from "./cart-sidebar";
import { useCart } from "@/hooks/use-cart";

export default function Navigation() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Running", href: "/category/running" },
    { label: "Lifestyle", href: "/category/lifestyle" },
    { label: "Training", href: "/category/training" },
  ];

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => setLocation("/")}
                className="text-2xl font-black text-primary hover:text-secondary transition-colors duration-200"
              >
                STRIDE
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => setLocation(link.href)}
                  className="text-primary hover:text-secondary transition-colors duration-200 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="relative hidden sm:block">
                <Input
                  type="text"
                  placeholder="Search shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 rounded-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </form>
              
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCart(true)}
                className="relative text-primary hover:text-secondary transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Button>
              
              {/* Mobile Menu Button */}
              <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-8">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="text"
                        placeholder="Search shoes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </form>
                    
                    {/* Mobile Navigation Links */}
                    {navigationLinks.map((link) => (
                      <Button
                        key={link.href}
                        variant="ghost"
                        onClick={() => {
                          setLocation(link.href);
                          setShowMobileMenu(false);
                        }}
                        className="justify-start text-primary hover:text-secondary"
                      >
                        {link.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar open={showCart} onOpenChange={setShowCart} />
    </>
  );
}
