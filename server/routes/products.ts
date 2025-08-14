// // routes/products.ts
// import express from "express";
// import { db } from "../db"; // your DB instance
// import { products } from "../../shared/schema"; // your products table
// import { eq } from "drizzle-orm";


// const router = express.Router();

// // ✅ Get all products
// router.get("/products", async (req, res) => {
//   try {
//     const allProducts = await db.select().from(products);
//     res.json(allProducts);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // ✅ Get products by category
// router.get("/products/category/:category", async (req, res) => {
//   try {
//     const category = req.params.category;
//     const categoryProducts = await db
//       .select()
//       .from(products)
//       .where(eq(products.category, category));

//     res.json(categoryProducts);
//   } catch (error) {
//     console.error("Error fetching products by category:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// server/routes/products.ts
// import { Router } from "express";
// // import { pool } from "../db";
// // import pool from "../db.js"; // Default import
// import { pool } from "../db.js"; // Use named import



// const router = Router();

// // GET all products
// router.get("/", async (_req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // GET products by category
// router.get("/:category", async (req, res) => {
//   try {
//     const { category } = req.params;
//     const result = await pool.query(
//       "SELECT * FROM products WHERE LOWER(category) = LOWER($1)",
//       [category]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Error fetching products by category:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;

// server/routes/products.ts
import { Router } from "express";
// import { pool } from "../db"; // named import from db.js
import pool from '../db';

const router = Router();

// GET all products
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET products by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    // Ensure case-insensitive comparison
    const result = await pool.query(
      "SELECT * FROM products WHERE LOWER(category) = LOWER($1) ORDER BY id ASC",
      [category]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET featured products
router.get("/featured", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE featured = true ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
