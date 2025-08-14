import { Router } from "express";
import { pool } from ".db.ts"; // named import from db.js

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
