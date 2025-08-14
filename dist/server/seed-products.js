import postgres from "postgres";
// Database connection - using Neon PostgreSQL (direct connection)
const databaseUrl = "postgresql://neondb_owner:npg_HoqV7FbYO9Qr@ep-lively-lake-a1i1dmhz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
const client = postgres(databaseUrl, {
    ssl: 'require',
});
async function seed() {
    try {
        console.log("🌱 Starting database seeding...");
        // Create tables if they don't exist
        console.log("📁 Creating database tables...");
        await client `
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        slug VARCHAR(255) NOT NULL UNIQUE
      )
    `;
        await client `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(500),
        category VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        badge VARCHAR(100),
        sizes JSON NOT NULL,
        colors JSON NOT NULL,
        in_stock BOOLEAN DEFAULT TRUE
      )
    `;
        await client `
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        size VARCHAR(50) NOT NULL,
        color VARCHAR(50) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        session_id VARCHAR(255) NOT NULL
      )
    `;
        console.log("✅ Tables created successfully");
        // Insert categories
        console.log("📁 Inserting categories...");
        const categoryData = [
            {
                name: "Running",
                description: "High-performance running footwear for speed, comfort, and endurance",
                imageUrl: "/images/categories/running.jpg",
                slug: "running"
            },
            {
                name: "Lifestyle",
                description: "Comfortable everyday shoes for daily wear and casual style",
                imageUrl: "/images/categories/lifestyle.jpg",
                slug: "lifestyle"
            },
            {
                name: "Training",
                description: "High-performance training footwear for strength, stability, and explosive movements",
                imageUrl: "/images/categories/training.jpg",
                slug: "training"
            },
            {
                name: "Athletic",
                description: "Versatile athletic footwear for various sports and activities",
                imageUrl: "/images/categories/athletic.jpg",
                slug: "athletic"
            }
        ];
        for (const category of categoryData) {
            await client `
        INSERT INTO categories (name, description, image_url, slug) 
        VALUES (${category.name}, ${category.description}, ${category.imageUrl}, ${category.slug})
        ON CONFLICT (slug) DO NOTHING
      `;
            console.log(`✅ Inserted category: ${category.name}`);
        }
        // Insert products
        console.log("👟 Inserting products...");
        const productData = [
            // Original 8 products
            {
                name: "Nike Air Max 270",
                description: "Maximum comfort with Air Max technology for everyday wear",
                price: "129.99",
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Nike",
                featured: true,
                badge: "Popular",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Black", "White", "Red"],
                inStock: true
            },
            {
                name: "Adidas Ultraboost 22",
                description: "Premium running shoes with responsive Boost midsole",
                price: "179.99",
                imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Adidas",
                featured: true,
                badge: "New",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Blue", "White", "Grey"],
                inStock: true
            },
            {
                name: "Converse Chuck Taylor All Star",
                description: "Classic canvas sneakers perfect for casual wear",
                price: "59.99",
                imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Converse",
                featured: false,
                badge: "Classic",
                sizes: ["6", "7", "8", "9", "10", "11", "12"],
                colors: ["Black", "White", "Navy"],
                inStock: true
            },
            {
                name: "Vans Old Skool",
                description: "Iconic skate shoes with side stripe design",
                price: "64.99",
                imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Vans",
                featured: false,
                badge: "Iconic",
                sizes: ["6", "7", "8", "9", "10", "11", "12"],
                colors: ["Black", "White", "Red"],
                inStock: true
            },
            {
                name: "Clarks Desert Boot",
                description: "Timeless suede boots perfect for smart casual looks",
                price: "89.99",
                imageUrl: "https://images.unsplash.com/photo-1549298916-b41d114d2c36?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Clarks",
                featured: false,
                badge: "Timeless",
                sizes: ["7", "8", "9", "10", "11"],
                colors: ["Brown", "Tan", "Black"],
                inStock: true
            },
            {
                name: "New Balance 990v5",
                description: "Premium made-in-USA sneakers with superior comfort",
                price: "184.99",
                imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
                category: "Running",
                brand: "New Balance",
                featured: true,
                badge: "Premium",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Grey", "Navy", "Black"],
                inStock: true
            },
            {
                name: "Reebok Nano X3",
                description: "Built for the toughest workouts with superior durability",
                price: "130.00",
                imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
                category: "Training",
                brand: "Reebok",
                featured: false,
                badge: "Performance",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Black/White", "Grey/Blue", "Red/Black"],
                inStock: true
            },
            {
                name: "Nike Metcon 8",
                description: "Versatile training shoe for CrossFit and functional fitness",
                price: "140.00",
                imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
                category: "Training",
                brand: "Nike",
                featured: false,
                badge: "Versatile",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White/Black", "Grey/Red", "Blue/Orange"],
                inStock: true
            },
            // 15 NEW ADDITIONAL PRODUCTS
            {
                name: "Nike ZoomX Vaporfly",
                description: "Elite racing shoes with carbon fiber plate for maximum speed",
                price: "249.99",
                imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Nike",
                featured: true,
                badge: "Elite",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White/Red", "Black/Gold", "Blue/Orange"],
                inStock: true
            },
            {
                name: "Adidas Solarboost 4",
                description: "Energy-returning running shoes with Continental rubber outsole",
                price: "159.99",
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Adidas",
                featured: false,
                badge: "Energy",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Grey/Blue", "Black/White", "Green/Black"],
                inStock: true
            },
            {
                name: "Brooks Ghost 14",
                description: "Smooth, soft ride with DNA LOFT cushioning",
                price: "129.99",
                imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Brooks",
                featured: false,
                badge: "Comfort",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White/Blue", "Grey/Green", "Black/Red"],
                inStock: true
            },
            {
                name: "Air Jordan 1 Retro",
                description: "Iconic basketball sneakers with premium leather construction",
                price: "169.99",
                imageUrl: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Nike",
                featured: true,
                badge: "Iconic",
                sizes: ["6", "7", "8", "9", "10", "11", "12"],
                colors: ["Red/Black", "Blue/White", "Black/White"],
                inStock: true
            },
            {
                name: "Adidas Stan Smith",
                description: "Classic tennis-inspired sneakers with clean minimalist design",
                price: "79.99",
                imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Adidas",
                featured: false,
                badge: "Classic",
                sizes: ["6", "7", "8", "9", "10", "11", "12"],
                colors: ["White/Green", "White/Blue", "White/Red"],
                inStock: true
            },
            {
                name: "Common Projects Achilles",
                description: "Premium Italian leather sneakers with gold foil branding",
                price: "399.99",
                imageUrl: "https://images.unsplash.com/photo-1549298916-b41d114d2c36?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Common Projects",
                featured: true,
                badge: "Premium",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White", "Black", "Navy"],
                inStock: true
            },
            {
                name: "Nike Air Force 1",
                description: "Timeless basketball sneakers with Air-Sole unit cushioning",
                price: "109.99",
                imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Nike",
                featured: false,
                badge: "Timeless",
                sizes: ["6", "7", "8", "9", "10", "11", "12"],
                colors: ["White", "Black", "Red"],
                inStock: true
            },
            {
                name: "Under Armour HOVR",
                description: "High-performance training shoes with energy return technology",
                price: "119.99",
                imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
                category: "Training",
                brand: "Under Armour",
                featured: false,
                badge: "Performance",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Black/Red", "Grey/Blue", "White/Black"],
                inStock: true
            },
            {
                name: "Adidas Powerlift 5",
                description: "Weightlifting shoes with stable heel and flexible forefoot",
                price: "89.99",
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                category: "Training",
                brand: "Adidas",
                featured: false,
                badge: "Stable",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Black/White", "Red/Black", "Blue/White"],
                inStock: true
            },
            {
                name: "Nike Romaleos 4",
                description: "Elite weightlifting shoes with Flywire technology",
                price: "199.99",
                imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
                category: "Training",
                brand: "Nike",
                featured: true,
                badge: "Elite",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White/Red", "Black/Gold", "Blue/White"],
                inStock: true
            },
            {
                name: "Puma RS-X",
                description: "Retro-inspired sneakers with chunky sole design",
                price: "94.99",
                imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Puma",
                featured: false,
                badge: "Retro",
                sizes: ["6", "7", "8", "9", "10", "11", "12"],
                colors: ["White/Blue", "Black/Red", "Grey/Orange"],
                inStock: true
            },
            {
                name: "Salomon Speedcross 5",
                description: "Trail running shoes with aggressive grip for off-road terrain",
                price: "129.99",
                imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Salomon",
                featured: false,
                badge: "Trail",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Black/Red", "Blue/Orange", "Grey/Green"],
                inStock: true
            },
            {
                name: "Hoka Clifton 9",
                description: "Lightweight running shoes with plush cushioning",
                price: "139.99",
                imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Hoka",
                featured: false,
                badge: "Lightweight",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White/Blue", "Black/Grey", "Red/White"],
                inStock: true
            },
            {
                name: "Nike Zoom Fly 5",
                description: "Carbon fiber plate running shoes for tempo training",
                price: "159.99",
                imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Nike",
                featured: false,
                badge: "Carbon",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White/Blue", "Black/Red", "Grey/Orange"],
                inStock: true
            }
        ];
        for (const product of productData) {
            await client `
        INSERT INTO products (name, description, price, image_url, category, brand, featured, badge, sizes, colors, in_stock) 
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.imageUrl}, ${product.category}, ${product.brand}, ${product.featured}, ${product.badge}, ${JSON.stringify(product.sizes)}, ${JSON.stringify(product.colors)}, ${product.inStock})
      `;
            console.log(`✅ Inserted product: ${product.name}`);
        }
        console.log("🎉 Database seeding completed successfully!");
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        throw error;
    }
    finally {
        await client.end();
    }
}
seed().catch(console.error);
