// clear-products.js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: ".env" }); // Load DATABASE_URL from .env

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function clearProducts() {
  try {
    const res = await pool.query("TRUNCATE products RESTART IDENTITY CASCADE;");
    console.log("✅ All products deleted and IDs reset.");
  } catch (err) {
    console.error("❌ Error deleting products:", err);
  } finally {
    await pool.end();
  }
}

clearProducts();
