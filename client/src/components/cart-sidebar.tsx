// import { useCart } from "@/hooks/use-cart";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { ShoppingCart, Plus, Minus, X } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// export default function CartSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
//   const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent className="w-full sm:max-w-md">
//         <SheetHeader>
//           <SheetTitle>Shopping Cart</SheetTitle>
//         </SheetHeader>

//         <div className="mt-6 space-y-4">
//           {items.length === 0 ? (
//             <p className="text-center text-gray-500 py-8">Your cart is empty</p>
//           ) : (
//             <>
//               {items.map((item) => (
//                 <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
//                   <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
//                     {item.product?.imageUrl ? (
//                       <img 
//                         src={item.product.imageUrl} 
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
//                         <span className="text-gray-500 text-xs">Image</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-medium text-sm truncate">
//                       {item.product?.name || `Product #${item.productId}`}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       Size: {item.size} | Color: {item.color}
//                     </p>
//                     <p className="font-semibold">
//                       ${item.product ? (parseFloat(item.product.price) * item.quantity).toFixed(2) : '0.00'}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span className="w-8 text-center text-sm">{item.quantity}</span>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}

//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-lg font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
//                 </div>
//                   <Button className="w-full" 
//                   Checkout
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
// import { useCart } from "@/hooks/use-cart";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { ShoppingCart, Plus, Minus, X } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// export default function CartSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
//   const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent className="w-full sm:max-w-md">
//         <SheetHeader>
//           <SheetTitle>Shopping Cart</SheetTitle>
//         </SheetHeader>

//         <div className="mt-6 space-y-4">
//           {items.length === 0 ? (
//             <p className="text-center text-gray-500 py-8">Your cart is empty</p>
//           ) : (
//             <>
//               {items.map((item) => (
//                 <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
//                   <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
//                     {item.product?.imageUrl ? (
//                       <img 
//                         src={item.product.imageUrl} 
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
//                         <span className="text-gray-500 text-xs">Image</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-medium text-sm truncate">
//                       {item.product?.name || Product #${item.productId}}
//                     </h4>
//                     <p className="text-sm text-gray-600">
//                       Size: {item.size} | Color: {item.color}
//                     </p>
//                     <p className="font-semibold">
//                       ${item.product ? (parseFloat(item.product.price) * item.quantity).toFixed(2) : '0.00'}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       disabled={item.quantity <= 1}
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span className="w-8 text-center text-sm">{item.quantity}</span>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}

//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-lg font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
//                 </div>
//                 <Button className="w-full">
//                   Checkout
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, Minus, X } from "lucide-react";

export default function CartSidebar({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    {item.product?.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.product?.name || `Product #${item.productId}`}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="font-semibold">
                      ${item.product ? (parseFloat(item.product.price) * item.quantity).toFixed(2) : '0.00'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
                </div>
                <Button className="w-full">
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
