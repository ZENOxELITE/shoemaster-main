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
                imageUrl: "https://unsplash.com/photos/silhouette-of-man-jumping-on-rocky-mountain-during-sunset-I1EWTM5mFEM?w=500&h=500&fit=crop",
                slug: "running"
            },
            {
                name: "Lifestyle",
                description: "Comfortable everyday shoes for daily wear and casual style",
                imageUrl: "https://unsplash.com/photos/woman-doing-yoga-meditation-on-brown-parquet-flooring-NTyBbu66_SI?w=500&h=500&fit=crop",
                slug: "lifestyle"
            },
            {
                name: "Training",
                description: "High-performance training footwear for strength, stability, and explosive movements",
                imageUrl: "https://unsplash.com/photos/two-person-inside-gym-exercising-buWcS7G1_28?w=500&h=500&fit=crop",
                slug: "training"
            },
            {
                name: "Athletic",
                description: "Versatile athletic footwear for various sports and activities",
                imageUrl: "https://unsplash.com/photos/person-in-yellow-shoes-on-grass-NqJKZwPuca4?w=500&h=500&fit=crop",
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
            
            // 15 NEW ADDITIONAL PRODUCTS
           
            {
                name: "Adidas Solarboost 4",
                description: "Energy-returning running shoes with Continental rubber outsole",
                price: "6000",
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
                price: "4000",
                imageUrl: "https://images.unsplash.com/photo-1549298916-f52d724204b4?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Brooks",
                featured: false,
                badge: "Comfort",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White/Blue", "Grey/Green", "Black/Red"],
                inStock: true
            },
            {
                name: "Common Projects Achilles",
                description: "Premium Italian leather sneakers with gold foil branding",
                price: "3000",
                imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Common Projects",
                featured: true,
                badge: "Premium",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White", "Black", "Navy"],
                inStock: true
            },
            {
                name: "Nike Romaleos 4",
                description: "Elite weightlifting shoes with Flywire technology",
                price: "7000",
                imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop",
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
                price: "9000",
                imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop", 
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
                price: "12000",
                imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop", 
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
                price: "3000",
                imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop", 
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
                price: "15000",
                imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop", 
                category: "Running",
                brand: "Nike",
                featured: false,
                badge: "Carbon",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["White/Blue", "Black/Red", "Grey/Orange"],
                inStock: true
            },
            // ------------------------------------------------------------------------------------------------------------------------------------
            // 15 NEW ADDITIONAL PRODUCTS
            // ------------------------------------------------------------------------------------------------------------------------------------
           
            {
              name: "Nike Metcon 7",
              description: "Stable training shoes for heavy lifting",
              price: "2000",
              imageUrl: "https://unsplash.com/photos/pair-of-white-nike-high-top-shoes-SxAXphIPWeg?w=500&h=500&fit=crop",
              category: "Training",
              brand: "Nike",
              featured: false,
              badge: "Gym",
              sizes: ["7", "8", "9", "10", "11"],
              colors: ["Black", "White", "Red"],
              inStock: true
            },
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
                name: "Adidas Powerlift 5",
                description: "Weightlifting shoes with stable heel and flexible forefoot",
                price: "8900",
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
                name: "Asics Gel-Kayano 28",
                description: "Stable running shoes with premium cushioning",
                price: "15900",
                imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Asics",
                featured: false,
                badge: "Stable",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Blue", "Yellow", "White"],
                inStock: true
              },
              {
                name: "Adidas Superstar",
                description: "Classic shell-toe design for casual wear",
                price: "8400",
                imageUrl: "https://images.unsplash.com/photo-1593287073863-c992914cb3e3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Adidas",
                featured: false,
                badge: "Classic",
                sizes: ["6", "7", "8", "9", "10", "11"],
                colors: ["White", "Black"],
                inStock: true
              },
              {
                name: "Hoka One One Clifton 8",
                description: "Plush cushioning for maximum comfort on long runs",
                price: "14900",
                    imageUrl: "https://images.unsplash.com/photo-1621972190937-ec94b77fa7b8?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Hoka",
                featured: false,
                badge: "Cushioned",
                sizes: ["7", "8", "9", "10", "11"],
                colors: ["Blue", "White", "Orange"],
                inStock: true
              },
              {
                name: "Columbia Newton Ridge",
                description: "Waterproof hiking boots for all-weather adventures",
                price: "9900",
                imageUrl: "https://images.unsplash.com/photo-1603052875034-4e2fcbfc6b5f?w=500&h=500&fit=crop",
                category: "Hiking",
                brand: "Columbia",
                featured: false,
                badge: "Waterproof",
                sizes: ["7", "8", "9", "10", "11"],
                colors: ["Black", "Brown"],
                inStock: true
              },
              {
                name: "Adidas NMD R1",
                description: "Street-ready sneakers with Boost comfort",
                price: "13900",
                imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Adidas",
                featured: false,
                badge: "Street",
                sizes: ["7", "8", "9", "10", "11"],
                colors: ["Black", "White", "Grey"],
                inStock: true
              },
             {
                name: "Reebok Nano X3",
                description: "Built for the toughest workouts with superior durability",
                price: "13000",
                imageUrl: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop",
                category: "Training",
                brand: "Reebok",
                featured: false,
                badge: "Performance",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Black/White", "Grey/Blue", "Red/Black"],
                inStock: true
            },
            {
                name: "Adidas Ultraboost 22",
                description: "Premium running shoes with responsive Boost midsole",
                price: "17900",
                imageUrl: "https://images.unsplash.com/photo-1549298916-f52d724204b4?w=500&h=500&fit=crop",
                category: "Running",
                brand: "Adidas",
                featured: true,
                badge: "New",
                sizes: ["7", "8", "9", "10", "11", "12"],
                colors: ["Blue", "White", "Grey"],
                inStock: true
            },
            {
                name: "Air Jordan 1 Retro",
                description: "Iconic basketball sneakers with premium leather construction",
                price: "16900",
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
                price: "7300",
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
                name: "Nike Air Force 1",
                description: "Timeless basketball sneakers with Air-Sole unit cushioning",
                price: "7500",
                imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
                category: "Lifestyle",
                brand: "Nike",
                featured: false,
                badge: "Timeless",
                sizes: ["6", "7", "8", "9", "10", "11", "12"],
                colors: ["White", "Black", "Red"],
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
