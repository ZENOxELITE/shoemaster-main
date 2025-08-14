import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import dotenv from "dotenv";
import path from "path";
import productsRoute from "./routes/products.js";
// Load environment variables
dotenv.config();
const databaseUrl = process.env.DATABASE_URL;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", productsRoute);
// Middleware for logging API requests
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse = undefined;
    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
    };
    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
            }
            if (logLine.length > 80) {
                logLine = logLine.slice(0, 79) + "…";
            }
            log(logLine);
        }
    });
    next();
});
(async () => {
    const server = await registerRoutes(app);
    // Error handling middleware
    app.use((err, _req, res, _next) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(status).json({ message });
        console.error("Server error:", err);
    });
    // Serve static files in production
    if (app.get("env") === "production") {
        // Serve the built React app
        app.use(express.static(path.join(process.cwd(), "dist/client")));
        // Handle client-side routing
        app.get("*", (req, res) => {
            res.sendFile(path.join(process.cwd(), "dist/client/index.html"));
        });
    }
    else {
        // Development: setup Vite
        await setupVite(app, server);
    }
    // Start server
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
        log(`🚀 Server running on port ${port} in ${app.get("env")} mode`);
    });
})();

router.get("/products/category/:slug", async (req, res) => {
    const slug = req.params.slug.toLowerCase();
    const products = await db.query(`
      SELECT * FROM products WHERE LOWER(category) = $1
    `, [slug]);
    res.json(products);
  });
  