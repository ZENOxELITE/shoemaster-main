import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET routes - matching your PHP API structure
  app.get("/api", async (req, res) => {
    try {
      const { action } = req.query;
      
      if (!action) {
        return res.status(400).json({ 
          success: false, 
          message: 'Action parameter required' 
        });
      }

      switch (action) {
        case 'products':
          const products = await storage.getProducts();
          res.json({ success: true, data: products });
          break;
        
        case 'featured':
          const featuredProducts = await storage.getFeaturedProducts();
          res.json({ success: true, data: featuredProducts });
          break;
        
        case 'categories':
          const categories = await storage.getCategories();
          res.json({ success: true, data: categories });
          break;
        
        case 'cart':
          const sessionId = req.headers['x-session-id'] as string || 'default-session';
          const cartItems = await storage.getCartItems(sessionId);
          res.json({ success: true, data: cartItems });
          break;
        
        case 'product':
          const productId = req.query.id;
          if (!productId) {
            return res.status(400).json({ 
              success: false, 
              message: 'Product ID required' 
            });
          }
          const id = parseInt(productId as string);
          if (isNaN(id)) {
            return res.status(400).json({ 
              success: false, 
              message: 'Invalid Product ID' 
            });
          }
          const product = await storage.getProduct(id);
          if (!product) {
            return res.status(404).json({ 
              success: false, 
              message: 'Product not found' 
            });
          }
          res.json({ success: true, data: product });
          break;
        
        default:
          res.status(400).json({ 
            success: false, 
            message: 'Unknown action' 
          });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error: ' + (error as Error).message 
      });
    }
  });

  // POST routes - matching your PHP API structure
  app.post("/api", async (req, res) => {
    try {
      const { action } = req.body;
      
      if (!action) {
        return res.status(400).json({ 
          success: false, 
          message: 'Action parameter required' 
        });
      }

      switch (action) {
        case 'add_to_cart':
          const { product_id, quantity = 1, size = '', color = '' } = req.body;
          
          if (!product_id) {
            return res.status(400).json({ 
              success: false, 
              message: 'Product ID required' 
            });
          }

          const sessionId = req.headers['x-session-id'] as string || 'default-session';
          const cartItem = await storage.addToCart({
            productId: parseInt(product_id),
            quantity: parseInt(quantity),
            size,
            color,
            sessionId
          });
          
          res.json({ 
            success: true, 
            message: 'Item added to cart',
            data: cartItem
          });
          break;
        
        default:
          res.status(400).json({ 
            success: false, 
            message: 'Unknown action' 
          });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Error: ' + (error as Error).message 
      });
    }
  });

  // Additional RESTful routes for enhanced functionality
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (_req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Cart management routes
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string || 'default-session';
      const cartItems = await storage.getCartItems(sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string || 'default-session';
      const { productId, quantity = 1, size = '', color = '' } = req.body;
      
      if (!productId) {
        return res.status(400).json({ message: "Product ID required" });
      }
      
      const cartItem = await storage.addToCart({
        productId: parseInt(productId),
        quantity: parseInt(quantity),
        size,
        color,
        sessionId
      });
      
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (isNaN(id) || typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Invalid data" });
      }
      
      const updatedItem = await storage.updateCartItem(id, quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      const success = await storage.removeFromCart(id);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string || 'default-session';
      await storage.clearCart(sessionId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
