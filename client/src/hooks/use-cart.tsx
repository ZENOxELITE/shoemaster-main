
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types locally
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

interface CartItem {
  id: number;
  productId: number;
  size: string;
  color: string;
  quantity: number;
  sessionId: string;
  product: Product; // Include product data
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'sessionId' | 'product'> & { product: Product }) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from backend on mount
  useEffect(() => {
    loadCartFromBackend();
  }, []);

  const loadCartFromBackend = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cart', {
        headers: {
          'x-session-id': 'local-session'
        }
      });
      
      if (response.ok) {
        const cartItems = await response.json();
        setItems(cartItems);
      }
    } catch (error) {
      console.error('Error loading cart from backend:', error);
      // Fallback to localStorage if backend fails
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'id' | 'sessionId' | 'product'> & { product: Product }) => {
    try {
      setIsLoading(true);
      
      // Add to backend first
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': 'local-session'
        },
        body: JSON.stringify({
          productId: item.productId,
          size: item.size,
          color: item.color,
          quantity: item.quantity
        })
      });

      if (response.ok) {
        const newCartItem = await response.json();
        // Update local state with the new item from backend
        setItems(prevItems => {
          const existingItem = prevItems.find(
            (cartItem) => 
              cartItem.productId === item.productId && 
              cartItem.size === item.size && 
              cartItem.color === item.color
          );

          if (existingItem) {
            return prevItems.map(cartItem => 
              cartItem.id === existingItem.id 
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            );
          } else {
            return [...prevItems, { ...newCartItem, product: item.product }];
          }
        });
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Fallback to local state if backend fails
      const existingItem = items.find(
        (cartItem) => 
          cartItem.productId === item.productId && 
          cartItem.size === item.size && 
          cartItem.color === item.color
      );

      if (existingItem) {
        setItems(items.map(cartItem => 
          cartItem.id === existingItem.id 
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        ));
      } else {
        const newItem: CartItem = {
          id: Date.now(),
          sessionId: 'local-session',
          productId: item.productId,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          product: item.product
        };
        setItems([...items, newItem]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      setIsLoading(true);
      
      // Remove from backend first
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'x-session-id': 'local-session'
        }
      });

      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        throw new Error('Failed to remove from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Fallback to local state if backend fails
      setItems(items.filter(item => item.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    try {
      setIsLoading(true);
      
      // Update in backend first
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': 'local-session'
        },
        body: JSON.stringify({ quantity })
      });

      if (response.ok) {
        setItems(items.map(item => 
          item.id === id ? { ...item, quantity } : item
        ));
      } else {
        throw new Error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      // Fallback to local state if backend fails
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      
      // Clear in backend first
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'x-session-id': 'local-session'
        }
      });

      if (response.ok) {
        setItems([]);
      } else {
        throw new Error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Fallback to local state if backend fails
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isLoading,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
