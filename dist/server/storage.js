// import postgres from "postgres";
// // Database connection - using Neon PostgreSQL
// const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_HoqV7FbYO9Qr@ep-lively-lake-a1i1dmhz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
// const client = postgres(databaseUrl, {
//   ssl: 'require',
// });
// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   imageUrl: string;
//   category: string;
//   brand: string;
//   featured: boolean;
//   badge?: string;
//   sizes: string[];
//   colors: string[];
//   inStock: boolean;
// }
// export interface Category {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   slug: string;
// }
// export interface CartItem {
//   id: number;
//   productId: number;
//   size: string;
//   color: string;
//   quantity: number;
//   sessionId: string;
// }
// export interface CartItemWithProduct extends CartItem {
//   product: Product;
// }
// export interface IStorage {
//   getProducts(): Promise<Product[]>;
//   getProduct(id: number): Promise<Product | undefined>;
//   getFeaturedProducts(): Promise<Product[]>;
//   getProductsByCategory(category: string): Promise<Product[]>;
//   getCategories(): Promise<Category[]>;
//   getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
//   addToCart(item: Omit<CartItem, 'id'>): Promise<CartItem>;
//   updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
//   removeFromCart(id: number): Promise<boolean>;
//   clearCart(sessionId: string): Promise<boolean>;
// }
// export const storage: IStorage = {
//   getProducts: async () => {
//     const result = await client`SELECT * FROM products`;
//     return result.map(row => ({
//       ...row,
//       sizes: JSON.parse(row.sizes || '[]'),
//       colors: JSON.parse(row.colors || '[]')
//     }));
//   },
//   getProduct: async (id: number) => {
//     const result = await client`SELECT * FROM products WHERE id = ${id}`;
//     if (result.length === 0) return undefined;
//     const row = result[0];
//     return {
//       ...row,
//       sizes: JSON.parse(row.sizes || '[]'),
//       colors: JSON.parse(row.colors || '[]')
//     };
//   },
//   getFeaturedProducts: async () => {
//     const result = await client`SELECT * FROM products WHERE featured = true`;
//     return result.map(row => ({
//       ...row,
//       sizes: JSON.parse(row.sizes || '[]'),
//       colors: JSON.parse(row.colors || '[]')
//     }));
//   },
//   getProductsByCategory: async (category: string) => {
//     const result = await client`SELECT * FROM products WHERE category ILIKE ${category}`;
//     return result.map(row => ({
//       ...row,
//       sizes: JSON.parse(row.sizes || '[]'),
//       colors: JSON.parse(row.colors || '[]')
//     }));
//   },
//   getCategories: async () => {
//     return await client`SELECT * FROM categories`;
//   },
//   getCartItems: async (sessionId: string) => {
//     const result = await client`
//       SELECT ci.*, p.* 
//       FROM cart_items ci 
//       JOIN products p ON ci.product_id = p.id 
//       WHERE ci.session_id = ${sessionId}
//     `;
//     return result.map(row => ({
//       id: row.id,
//       productId: row.product_id,
//       size: row.size,
//       color: row.color,
//       quantity: row.quantity,
//       sessionId: row.session_id,
//       product: {
//         id: row.id,
//         name: row.name,
//         description: row.description,
//         price: row.price,
//         imageUrl: row.image_url,
//         category: row.category,
//         brand: row.brand,
//         featured: row.featured,
//         badge: row.badge,
//         sizes: JSON.parse(row.sizes || '[]'),
//         colors: JSON.parse(row.colors || '[]'),
//         inStock: row.in_stock
//       }
//     }));
//   },
//   addToCart: async (item) => {
//     const result = await client`
//       INSERT INTO cart_items (product_id, size, color, quantity, session_id) 
//       VALUES (${item.productId}, ${item.size}, ${item.color}, ${item.quantity}, ${item.sessionId})
//       RETURNING *
//     `;
//     return result[0];
//   },
//   updateCartItem: async (id: number, quantity: number) => {
//     await client`UPDATE cart_items SET quantity = ${quantity} WHERE id = ${id}`;
//     const result = await client`SELECT * FROM cart_items WHERE id = ${id}`;
//     return result[0];
//   },
//   removeFromCart: async (id: number) => {
//     await client`DELETE FROM cart_items WHERE id = ${id}`;
//     return true;
//   },
//   clearCart: async (sessionId: string) => {
//     await client`DELETE FROM cart_items WHERE session_id = ${sessionId}`;
//     return true;
//   },
// };
import postgres from "postgres";
// Database connection
const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_HoqV7FbYO9Qr@ep-lively-lake-a1i1dmhz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const client = postgres(databaseUrl, {
    ssl: 'require',
});
export const storage = {
    getProducts: async () => {
        const result = await client `SELECT * FROM products`;
        return result.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            imageUrl: row.image_url,
            category: row.category,
            brand: row.brand,
            featured: row.featured,
            badge: row.badge,
            sizes: JSON.parse(row.sizes || '[]'),
            colors: JSON.parse(row.colors || '[]'),
            inStock: row.in_stock
        }));
    },
    getProduct: async (id) => {
        const result = await client `SELECT * FROM products WHERE id = ${id}`;
        if (result.length === 0)
            return undefined;
        const row = result[0];
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            imageUrl: row.image_url,
            category: row.category,
            brand: row.brand,
            featured: row.featured,
            badge: row.badge,
            sizes: JSON.parse(row.sizes || '[]'),
            colors: JSON.parse(row.colors || '[]'),
            inStock: row.in_stock
        };
    },
    getFeaturedProducts: async () => {
        const result = await client `SELECT * FROM products WHERE featured = true`;
        return result.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            imageUrl: row.image_url,
            category: row.category,
            brand: row.brand,
            featured: row.featured,
            badge: row.badge,
            sizes: JSON.parse(row.sizes || '[]'),
            colors: JSON.parse(row.colors || '[]'),
            inStock: row.in_stock
        }));
    },
    getProductsByCategory: async (category) => {
        const result = await client `SELECT * FROM products WHERE category ILIKE ${category}`;
        return result.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            imageUrl: row.image_url,
            category: row.category,
            brand: row.brand,
            featured: row.featured,
            badge: row.badge,
            sizes: JSON.parse(row.sizes || '[]'),
            colors: JSON.parse(row.colors || '[]'),
            inStock: row.in_stock
        }));
    },
    getCategories: async () => {
        const result = await client `SELECT * FROM categories`;
        return result.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            imageUrl: row.image_url,
            slug: row.slug
        }));
    },
    getCartItems: async (sessionId) => {
        const result = await client `
      SELECT ci.id as cart_id, ci.*, p.* 
      FROM cart_items ci 
      JOIN products p ON ci.product_id = p.id 
      WHERE ci.session_id = ${sessionId}
    `;
        return result.map(row => ({
            id: row.cart_id,
            productId: row.product_id,
            size: row.size,
            color: row.color,
            quantity: row.quantity,
            sessionId: row.session_id,
            product: {
                id: row.product_id,
                name: row.name,
                description: row.description,
                price: row.price,
                imageUrl: row.image_url,
                category: row.category,
                brand: row.brand,
                featured: row.featured,
                badge: row.badge,
                sizes: JSON.parse(row.sizes || '[]'),
                colors: JSON.parse(row.colors || '[]'),
                inStock: row.in_stock
            }
        }));
    },
    addToCart: async (item) => {
        const result = await client `
      INSERT INTO cart_items (product_id, size, color, quantity, session_id) 
      VALUES (${item.productId}, ${item.size}, ${item.color}, ${item.quantity}, ${item.sessionId})
      RETURNING *
    `;
        const row = result[0];
        return {
            id: row.id,
            productId: row.product_id,
            size: row.size,
            color: row.color,
            quantity: row.quantity,
            sessionId: row.session_id
        };
    },
    updateCartItem: async (id, quantity) => {
        await client `UPDATE cart_items SET quantity = ${quantity} WHERE id = ${id}`;
        const result = await client `SELECT * FROM cart_items WHERE id = ${id}`;
        const row = result[0];
        if (!row)
            return undefined;
        return {
            id: row.id,
            productId: row.product_id,
            size: row.size,
            color: row.color,
            quantity: row.quantity,
            sessionId: row.session_id
        };
    },
    removeFromCart: async (id) => {
        await client `DELETE FROM cart_items WHERE id = ${id}`;
        return true;
    },
    clearCart: async (sessionId) => {
        await client `DELETE FROM cart_items WHERE session_id = ${sessionId}`;
        return true;
    },
};
