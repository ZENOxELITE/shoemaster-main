// // // server/routes/products.js
// // import { Router } from "express";
// // import { pool, db } from "../db.js";

// // const router = Router();

// // const mapRow = (row) => ({
// //   id: row.id,
// //   name: row.name,
// //   description: row.description,
// //   price: row.price,            // already DECIMAL -> sent as string
// //   imageUrl: row.image_url,
// //   category: row.category,
// //   brand: row.brand,
// //   featured: row.featured,
// //   badge: row.badge,
// //   sizes: row.sizes,            // JSON[]
// //   colors: row.colors,          // JSON[]
// //   inStock: row.in_stock,
// // });

// // router.get("/products/:id", async (req, res, next) => {
// //   try {
// //     const { id } = req.params;
// //     const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
// //     if (!rows.length) return res.status(404).json({ message: "Product not found" });
// //     return res.json(mapRow(rows[0]));
// //   } catch (err) {
// //     next(err);
// //   }
// // });

// // export default router;
// import { Router } from "express";
// import { pool } from "../db.js";

// const router = Router();

// const mapRow = (row) => ({
//   id: row.id,
//   name: row.name,
//   description: row.description,
//   price: row.price,
//   imageUrl: row.image_url,
//   category: row.category_name, // joined category name
//   brand: row.brand,
//   featured: row.featured,
//   badge: row.badge,
//   sizes: row.sizes,
//   colors: row.colors,
//   inStock: row.in_stock,
// }));

// // GET all products
// router.get("/products", async (_req, res) => {
//   try {
//     const { rows } = await pool.query(
//       `SELECT p.*, c.name AS category_name
//        FROM products p
//        LEFT JOIN categories c ON p.category = c.id
//        ORDER BY p.id ASC`
//     );
//     res.json(rows.map(mapRow));
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // GET product by ID
// router.get("/products/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { rows } = await pool.query(
//       `SELECT p.*, c.name AS category_name
//        FROM products p
//        LEFT JOIN categories c ON p.category = c.id
//        WHERE p.id = $1`,
//       [id]
//     );
//     if (!rows.length) return res.status(404).json({ message: "Product not found" });
//     res.json(mapRow(rows[0]));
//   } catch (err) {
//     next(err);
//   }
// });

// // GET products by category name
// router.get("/products/category/:categoryName", async (req, res) => {
//   try {
//     const { categoryName } = req.params;
//     const { rows } = await pool.query(
//       `SELECT p.*, c.name AS category_name
//        FROM products p
//        JOIN categories c ON p.category = c.id
//        WHERE LOWER(c.name) = LOWER($1)
//        ORDER BY p.id ASC`,
//       [categoryName]
//     );
//     res.json(rows.map(mapRow));
//   } catch (err) {
//     console.error("Error fetching products by category:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // GET featured products
// router.get("/products/featured", async (_req, res) => {
//   try {
//     const { rows } = await pool.query(
//       `SELECT p.*, c.name AS category_name
//        FROM products p
//        LEFT JOIN categories c ON p.category = c.id
//        WHERE p.featured = true
//        ORDER BY p.id ASC`
//     );
//     res.json(rows.map(mapRow));
//   } catch (err) {
//     console.error("Error fetching featured products:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// server/routes/products.js
import express from "express";
import { db } from "../db";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await db.select().from("products");
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get products by category (category passed as query string)
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;

    const products = await db
      .select()
      .from("products")
      .where("category", "=", categoryName); // Drizzle handles types

    res.json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get featured products
router.get("/featured", async (req, res) => {
  try {
    const products = await db
      .select()
      .from("products")
      .where("featured", "=", true);

    res.json(products);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id); // ensures integer
    const product = await db.select().from("products").where("id", "=", id).limit(1);
    if (!product.length) return res.status(404).json({ error: "Product not found" });
    res.json(product[0]);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
