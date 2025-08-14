// import { useParams, useLocation } from "wouter";
// import { useState } from "react";
// import { mockProducts } from "@/lib/mock-data";
// import { useCart } from "@/hooks/use-cart";
// import { useToast } from "@/hooks/use-toast";
// import Navigation from "@/components/navigation";
// import Footer from "@/components/footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ArrowLeft, ShoppingCart } from "lucide-react";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [, setLocation] = useLocation();
//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");

//   const product = mockProducts.find(p => p.id === parseInt(id as string));

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-neutral">
//         <Navigation />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-primary mb-4">Product not found</h1>
//             <Button onClick={() => setLocation("/products")}>
//               Back to Products
//             </Button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const handleAddToCart = async () => {
//     if (!selectedSize || !selectedColor) {
//       toast({
//         title: "Please select options",
//         description: "Please select both size and color before adding to cart.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       await addToCart({
//         productId: product.id,
//         size: selectedSize,
//         color: selectedColor,
//         quantity: 1,
//       });

//       toast({
//         title: "Added to cart!",
//         description: `${product.name} has been added to your cart.`,
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add item to cart. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-neutral">
//       <Navigation />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Button 
//           variant="ghost" 
//           onClick={() => setLocation("/products")}
//           className="mb-6"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Products
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Image */}
//           <div className="relative">
//             <img 
//               src={product.imageUrl} 
//               alt={product.name}
//               className="w-full aspect-square object-cover rounded-2xl"
//             />
//             {product.badge && (
//               <Badge className={`absolute top-4 right-4 ${
//                 product.badge === "New" ? "bg-success" : 
//                 product.badge === "Popular" ? "bg-accent" : 
//                 "bg-secondary"
//               } text-white`}>
//                 {product.badge}
//               </Badge>
//             )}
//           </div>

//           {/* Product Details */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-4xl font-black text-primary mb-2">{product.name}</h1>
//               <p className="text-xl text-neutral-600 mb-4">{product.description}</p>
//               <div className="text-3xl font-black text-primary">${product.price}</div>
//             </div>

//             {/* Size Selection */}
//             <div>
//               <label className="block text-sm font-medium text-primary mb-2">
//                 Size
//               </label>
//               <Select value={selectedSize} onValueChange={setSelectedSize}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {product.sizes.map((size) => (
//                     <SelectItem key={size} value={size}>
//                       {size}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Color Selection */}
//             <div>
//               <label className="block text-sm font-medium text-primary mb-2">
//                 Color
//               </label>
//               <Select value={selectedColor} onValueChange={setSelectedColor}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select color" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {product.colors.map((color) => (
//                     <SelectItem key={color} value={color}>
//                       {color}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Add to Cart Button */}
//             <Button 
//               onClick={handleAddToCart}
//               className="w-full bg-secondary hover:bg-orange-600 text-white py-3 text-lg font-semibold"
//               size="lg"
//             >
//               <ShoppingCart className="h-5 w-5 mr-2" />
//               Add to Cart
//             </Button>

//             {/* Product Info */}
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="font-semibold text-primary mb-4">Product Details</h3>
//                 <div className="space-y-2 text-sm text-neutral-600">
//                   <div className="flex justify-between">
//                     <span>Category:</span>
//                     <span className="font-medium">{product.category}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Available Sizes:</span>
//                     <span className="font-medium">{product.sizes.join(", ")}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Available Colors:</span>
//                     <span className="font-medium">{product.colors.join(", ")}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
// import { useParams, useLocation } from "wouter";
// import { useState, useMemo } from "react";
// import { mockProducts } from "@/lib/mock-data";
// import { useCart } from "@/hooks/use-cart";
// import { useToast } from "@/hooks/use-toast";
// import Navigation from "@/components/navigation";
// import Footer from "@/components/footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ArrowLeft, ShoppingCart } from "lucide-react";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [, setLocation] = useLocation();
//   const { addToCart } = useCart();
//   const { toast } = useToast();

//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");

//   // Find product by matching stringified IDs to handle both numeric & string cases
//   const product = useMemo(
//     () => mockProducts.find((p) => String(p.id) === String(id)),
//     [id]
//   );

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-neutral">
//         <Navigation />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
//           <h1 className="text-2xl font-bold text-primary mb-4">
//             Product not found
//           </h1>
//           <Button onClick={() => setLocation("/products")}>
//             Back to Products
//           </Button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const handleAddToCart = async () => {
//     if (!selectedSize || !selectedColor) {
//       toast({
//         title: "Please select options",
//         description: "Please select both size and color before adding to cart.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       await addToCart({
//         productId: product.id,
//         size: selectedSize,
//         color: selectedColor,
//         quantity: 1,
//       });

//       toast({
//         title: "Added to cart!",
//         description: `${product.name} has been added to your cart.`,
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to add item to cart. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-neutral">
//       <Navigation />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Button
//           variant="ghost"
//           onClick={() => setLocation("/products")}
//           className="mb-6"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Products
//         </Button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Image */}
//           <div className="relative">
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className="w-full aspect-square object-cover rounded-2xl"
//             />
//             {product.badge && (
//               <Badge
//                 className={`absolute top-4 right-4 ${
//                   product.badge === "New"
//                     ? "bg-success"
//                     : product.badge === "Popular"
//                     ? "bg-accent"
//                     : "bg-secondary"
//                 } text-white`}
//               >
//                 {product.badge}
//               </Badge>
//             )}
//           </div>

//           {/* Product Details */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-4xl font-black text-primary mb-2">
//                 {product.name}
//               </h1>
//               <p className="text-xl text-neutral-600 mb-4">
//                 {product.description}
//               </p>
//               <div className="text-3xl font-black text-primary">
//                 ${product.price}
//               </div>
//             </div>

//             {/* Size Selection */}
//             <div>
//               <label className="block text-sm font-medium text-primary mb-2">
//                 Size
//               </label>
//               <Select value={selectedSize} onValueChange={setSelectedSize}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select size" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {product.sizes.map((size) => (
//                     <SelectItem key={size} value={size}>
//                       {size}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Color Selection */}
//             <div>
//               <label className="block text-sm font-medium text-primary mb-2">
//                 Color
//               </label>
//               <Select value={selectedColor} onValueChange={setSelectedColor}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select color" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {product.colors.map((color) => (
//                     <SelectItem key={color} value={color}>
//                       {color}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Add to Cart Button */}
//             <Button
//               onClick={handleAddToCart}
//               className="w-full bg-secondary hover:bg-orange-600 text-white py-3 text-lg font-semibold"
//               size="lg"
//             >
//               <ShoppingCart className="h-5 w-5 mr-2" />
//               Add to Cart
//             </Button>

//             {/* Product Info */}
//             <Card>
//               <CardContent className="p-6">
//                 <h3 className="font-semibold text-primary mb-4">
//                   Product Details
//                 </h3>
//                 <div className="space-y-2 text-sm text-neutral-600">
//                   <div className="flex justify-between">
//                     <span>Category:</span>
//                     <span className="font-medium">{product.category}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Available Sizes:</span>
//                     <span className="font-medium">
//                       {product.sizes.join(", ")}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Available Colors:</span>
//                     <span className="font-medium">
//                       {product.colors.join(", ")}
//                     </span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;       // backend sends DECIMAL as string
  imageUrl: string;
  category: string;
  brand: string;
  featured: boolean;
  badge?: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Product) => {
        if (!cancelled) setProduct(data);
      })
      .catch(() => {
        if (!cancelled) setError("Product not found");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Select both size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart({
        productId: product.id,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      });
      toast({ title: "Added to cart!", description: `PKR{product.name} added to your cart.` });
    } catch {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse text-primary">Loading product…</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-neutral">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Product not found</h1>
            <Button onClick={() => setLocation("/products")}>Back to Products</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => setLocation("/products")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-cover rounded-2xl" />
            {product.badge && (
              <Badge
                className={`absolute top-4 right-4 ${
                  product.badge === "New" ? "bg-success" :
                  product.badge === "Popular" ? "bg-accent" : "bg-secondary"
                } text-white`}
              >
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-black text-primary mb-2">{product.name}</h1>
              <p className="text-xl text-neutral-600 mb-4">{product.description}</p>
              <div className="text-3xl font-black text-primary">PKR{product.price}</div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                <SelectContent>
                  {product.sizes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger><SelectValue placeholder="Select color" /></SelectTrigger>
                <SelectContent>
                  {product.colors.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-secondary hover:bg-orange-600 text-white py-3 text-lg font-semibold"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary mb-4">Product Details</h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex justify-between"><span>Category:</span><span className="font-medium">{product.category}</span></div>
                  <div className="flex justify-between"><span>Available Sizes:</span><span className="font-medium">{product.sizes.join(", ")}</span></div>
                  <div className="flex justify-between"><span>Available Colors:</span><span className="font-medium">{product.colors.join(", ")}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
