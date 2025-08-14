// server/remove-duplicate-products.ts
import postgres from "postgres";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_HoqV7FbYO9Qr@ep-lively-lake-a1i1dmhz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const client = postgres(databaseUrl, { ssl: "require" });

(async () => {
  try {
    // Delete duplicates based on 'name', keeping the lowest id
    await client`
      DELETE FROM products
      WHERE id NOT IN (
        SELECT MIN(id)
        FROM products
        GROUP BY name
      )
    `;

    console.log("✅ Duplicate products removed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error removing duplicates:", err);
    process.exit(1);
  }
})();
