const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding K-Town database...");

    // Create food items
    await prisma.foodItem.createMany({
        data: [
            { name: "Classic Tteokbokki", description: "Spicy rice cakes in a rich gochujang sauce with fish cakes and a boiled egg.", price: 12.99, image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800", category: "Street Food", spicy: true, prepTime: 15, stock: 100 },
            { name: "K-Fried Chicken", description: "Ultra-crispy double-fried chicken glazed in soy garlic or honey spicy sauce.", price: 18.99, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800", category: "Main Dishes", spicy: false, prepTime: 20, stock: 80 },
            { name: "Bibimbap Bowl", description: "Mixed rice bowl with seasoned vegetables, beef, and a sunny-side-up egg.", price: 15.99, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800", category: "Healthy", spicy: false, prepTime: 15, stock: 90 },
            { name: "Kimchi Jigae", description: "A steaming hot, comforting stew made with aged kimchi and silken tofu.", price: 14.99, image: "https://images.unsplash.com/photo-1583032015879-e50d2320c022?auto=format&fit=crop&q=80&w=800", category: "Stews", spicy: true, prepTime: 20, stock: 70 },
            { name: "Japchae", description: "Sweet potato starch noodles stir-fried with vegetables and sesame oil.", price: 13.99, image: "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?auto=format&fit=crop&q=80&w=800", category: "Main Dishes", spicy: false, prepTime: 15, stock: 60 },
            { name: "Hotteok (Sweet Pancake)", description: "Crispy Korean sweet pancake filled with brown sugar, honey, and nuts.", price: 6.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", category: "Street Food", spicy: false, prepTime: 10, stock: 120 },
        ],
        skipDuplicates: true,
    });
    console.log("✅ Food items seeded");

    // Create products (merch)
    await prisma.product.createMany({
        data: [
            { name: "Blackpink Neon Hoodie", description: "Premium cotton hoodie with reflective neon pink branding.", price: 65.00, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800", category: "Apparel", stock: 50, exclusive: true },
            { name: "BT21 Plush Set (7pcs)", description: "Official limited edition plush set of all seven members.", price: 120.00, image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=800", category: "Collectibles", stock: 30, exclusive: false },
            { name: "K-Town Logo Cap", description: "Embroidered glassmorphic gradient logo on premium structured cap.", price: 35.00, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800", category: "Accessories", stock: 100, exclusive: false },
            { name: "Seoul Night Vinyl", description: "High-fidelity citypop compilation featuring Seoul top indie artists.", price: 45.00, image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800", category: "Music", stock: 25, exclusive: true },
            { name: "K-Drama Poster Set", description: "Premium art prints from iconic K-Drama scenes. Set of 5.", price: 29.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=800", category: "Collectibles", stock: 40, exclusive: false },
        ],
        skipDuplicates: true,
    });
    console.log("✅ Products seeded");

    // Create karaoke rooms
    await prisma.karaokeRoom.createMany({
        data: [
            { name: "Neon Seoul", capacity: "2-4", price: 25, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" },
            { name: "Cyberpunk Vibe", capacity: "5-8", price: 45, image: "https://images.unsplash.com/photo-1514525253344-f814d0c9e58a?auto=format&fit=crop&q=80&w=800" },
            { name: "Aesthetic K-Pop", capacity: "8-12", price: 65, image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800" },
        ],
        skipDuplicates: true,
    });
    console.log("✅ Karaoke rooms seeded");

    console.log("🎉 Seeding complete!");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
