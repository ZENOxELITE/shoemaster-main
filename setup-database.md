# 🗄️ Database Setup Guide

## **Option 1: Free Cloud Database (Recommended for Quick Start)**

### **Step 1: Get a Free Database**
1. Go to [Neon](https://neon.tech) (free PostgreSQL hosting)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string

### **Step 2: Update Connection**
Replace the connection string in `server/storage.ts` and `server/seed-products.ts`:

```typescript
const databaseUrl = process.env.DATABASE_URL || "YOUR_NEON_CONNECTION_STRING_HERE";
```

### **Step 3: Seed the Database**
```bash
npm run db:seed
```

## **Option 2: Local PostgreSQL**

### **Step 1: Install PostgreSQL**
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### **Step 2: Create Database**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE shoemaster;

# Exit
\q
```

### **Step 3: Seed the Database**
```bash
npm run db:seed
```

## **Option 3: Use SQLite (Simplest for Development)**

If you want to avoid PostgreSQL setup, I can convert the app to use SQLite instead.

---

## **Quick Test**

After setting up the database and running `npm run db:seed`, you should see:
- ✅ Tables created successfully
- ✅ Categories inserted
- ✅ Products inserted

Then your category pages will show the actual products instead of "No products found"!
