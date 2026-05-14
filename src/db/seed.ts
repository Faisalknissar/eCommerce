import { db } from "./index";
import {
  roles,
  permissions,
  users,
  categories,
  products,
  productVariants,
  productImages,
  themes,
  settings,
  coupons,
} from "./schema";
import bcrypt from "bcryptjs";
import { generateId } from "@/lib/utils";

async function seed() {
  console.log("🌱 Seeding database (PostgreSQL)...\n");

  // ---- Roles ----
  console.log("Creating roles...");
  const adminRoleId = generateId();
  const managerRoleId = generateId();
  const customerRoleId = generateId();

  await db.insert(roles).values([
    { id: adminRoleId, name: "admin", description: "Full system access" },
    { id: managerRoleId, name: "manager", description: "Manage products, orders, and customers" },
    { id: customerRoleId, name: "customer", description: "Regular customer" },
  ]);

  // ---- Permissions ----
  console.log("Creating permissions...");
  const resources = ["products", "orders", "users", "categories", "coupons", "reviews", "themes", "settings", "notifications", "audit_logs"];
  const actions = ["create", "read", "update", "delete"];

  const adminPermissions = resources.flatMap((resource) =>
    actions.map((action) => ({
      id: generateId(),
      roleId: adminRoleId,
      resource,
      action,
    }))
  );

  const managerPermissions = ["products", "orders", "categories", "coupons", "reviews"].flatMap(
    (resource) =>
      actions.map((action) => ({
        id: generateId(),
        roleId: managerRoleId,
        resource,
        action,
      }))
  );

  const customerPermissions = [
    { id: generateId(), roleId: customerRoleId, resource: "products", action: "read" },
    { id: generateId(), roleId: customerRoleId, resource: "orders", action: "create" },
    { id: generateId(), roleId: customerRoleId, resource: "orders", action: "read" },
    { id: generateId(), roleId: customerRoleId, resource: "reviews", action: "create" },
    { id: generateId(), roleId: customerRoleId, resource: "reviews", action: "read" },
  ];

  await db.insert(permissions).values([...adminPermissions, ...managerPermissions, ...customerPermissions]);

  // ---- Admin User ----
  console.log("Creating admin user...");
  const adminPasswordHash = await bcrypt.hash("Admin@123", 12);
  const adminUserId = generateId();

  await db.insert(users).values({
    id: adminUserId,
    email: "admin@nexstore.com",
    name: "NexStore Admin",
    passwordHash: adminPasswordHash,
    roleId: adminRoleId,
    emailVerified: new Date(),
    isActive: true,
  });

  // ---- Demo Customer ----
  console.log("Creating demo customer...");
  const customerPasswordHash = await bcrypt.hash("Customer@123", 12);
  await db.insert(users).values({
    id: generateId(),
    email: "customer@demo.com",
    name: "Demo Customer",
    passwordHash: customerPasswordHash,
    roleId: customerRoleId,
    emailVerified: new Date(),
    isActive: true,
  });

  // ---- Categories ----
  console.log("Creating categories...");
  const categoryData = [
    { name: "Electronics", slug: "electronics", description: "Latest gadgets and electronics", position: 1 },
    { name: "Fashion", slug: "fashion", description: "Trendy clothing and accessories", position: 2 },
    { name: "Home & Living", slug: "home-living", description: "Everything for your home", position: 3 },
    { name: "Digital Products", slug: "digital-products", description: "Software, courses, and digital downloads", position: 4 },
    { name: "Services", slug: "services", description: "Professional services and consultations", position: 5 },
    { name: "Books", slug: "books", description: "Physical and digital books", position: 6 },
    { name: "Sports & Fitness", slug: "sports-fitness", description: "Sports gear and fitness equipment", position: 7 },
    { name: "Beauty & Health", slug: "beauty-health", description: "Beauty products and health essentials", position: 8 },
  ];

  const categoryIds: Record<string, string> = {};
  for (const cat of categoryData) {
    const id = generateId();
    categoryIds[cat.slug] = id;
    await db.insert(categories).values({ id, ...cat, isActive: true });
  }

  // ---- Products ----
  console.log("Creating sample products...");
  const sampleProducts = [
    {
      name: "Quantum Pro Wireless Headphones",
      slug: "quantum-pro-wireless-headphones",
      description: "Experience immersive audio with our flagship noise-cancelling wireless headphones. Featuring 40mm custom drivers, adaptive ANC, and 30-hour battery life.",
      shortDescription: "Premium noise-cancelling wireless headphones",
      basePrice: 12999,
      comparePrice: 18999,
      categoryId: categoryIds["electronics"],
      productType: "physical" as const,
      status: "published" as const,
      featured: true,
      sku: "QP-WH-001",
      tags: JSON.stringify(["headphones", "wireless", "noise-cancelling"]),
    },
    {
      name: "NeoVibe Smart Watch Ultra",
      slug: "neovibe-smart-watch-ultra",
      description: "The ultimate smartwatch with titanium case, always-on AMOLED display, health monitoring, GPS, and 5-day battery life.",
      shortDescription: "Premium titanium smartwatch with health tracking",
      basePrice: 24999,
      comparePrice: 34999,
      categoryId: categoryIds["electronics"],
      productType: "physical" as const,
      status: "published" as const,
      featured: true,
      sku: "NV-SW-001",
      tags: JSON.stringify(["smartwatch", "fitness", "health"]),
    },
    {
      name: "Aether Premium Leather Jacket",
      slug: "aether-premium-leather-jacket",
      description: "Handcrafted genuine leather jacket with premium Italian leather, satin lining, and custom hardware. A timeless piece for your wardrobe.",
      shortDescription: "Handcrafted Italian leather jacket",
      basePrice: 15999,
      comparePrice: 22999,
      categoryId: categoryIds["fashion"],
      productType: "physical" as const,
      status: "published" as const,
      featured: true,
      sku: "AT-LJ-001",
      tags: JSON.stringify(["leather", "jacket", "premium"]),
    },
    {
      name: "Lumina Smart Home Hub Pro",
      slug: "lumina-smart-home-hub-pro",
      description: "Control your entire smart home with voice commands. Compatible with 500+ smart devices, Thread, Matter, and Zigbee protocols.",
      shortDescription: "Universal smart home control hub",
      basePrice: 8999,
      comparePrice: 12999,
      categoryId: categoryIds["electronics"],
      productType: "physical" as const,
      status: "published" as const,
      featured: false,
      sku: "LM-SH-001",
      tags: JSON.stringify(["smart-home", "iot", "hub"]),
    },
    {
      name: "Full-Stack Development Masterclass",
      slug: "full-stack-development-masterclass",
      description: "Complete course covering React, Next.js, Node.js, TypeScript, and cloud deployment. 120+ hours of content with lifetime access.",
      shortDescription: "Comprehensive web development course",
      basePrice: 4999,
      comparePrice: 12999,
      categoryId: categoryIds["digital-products"],
      productType: "digital" as const,
      status: "published" as const,
      featured: true,
      sku: "FS-MC-001",
      downloadUrl: "/downloads/fs-masterclass",
      tags: JSON.stringify(["course", "development", "programming"]),
    },
    {
      name: "UI/UX Design Consultation",
      slug: "ui-ux-design-consultation",
      description: "One-on-one expert UI/UX design consultation. Get professional feedback on your designs, usability audit, and actionable recommendations.",
      shortDescription: "Expert design consultation session",
      basePrice: 2999,
      categoryId: categoryIds["services"],
      productType: "service" as const,
      status: "published" as const,
      featured: false,
      sku: "UX-CS-001",
      serviceDuration: 60,
      tags: JSON.stringify(["design", "consultation", "ux"]),
    },
    {
      name: "Zen Minimalist Desk Lamp",
      slug: "zen-minimalist-desk-lamp",
      description: "Elegant desk lamp with adjustable color temperature, wireless charging base, and touch controls. Perfect for modern workspaces.",
      shortDescription: "Elegant desk lamp with wireless charging",
      basePrice: 3499,
      comparePrice: 4999,
      categoryId: categoryIds["home-living"],
      productType: "physical" as const,
      status: "published" as const,
      featured: false,
      sku: "ZN-DL-001",
      tags: JSON.stringify(["lamp", "desk", "minimalist"]),
    },
    {
      name: "ProFlex Yoga Mat Premium",
      slug: "proflex-yoga-mat-premium",
      description: "Non-slip premium yoga mat with alignment guides, natural rubber base, and microfiber surface. 6mm thickness for optimal comfort.",
      shortDescription: "Premium non-slip yoga mat",
      basePrice: 2499,
      comparePrice: 3499,
      categoryId: categoryIds["sports-fitness"],
      productType: "physical" as const,
      status: "published" as const,
      featured: false,
      sku: "PF-YM-001",
      tags: JSON.stringify(["yoga", "fitness", "mat"]),
    },
  ];

  for (const product of sampleProducts) {
    const productId = generateId();
    await db.insert(products).values({
      id: productId,
      ...product,
      totalStock: product.productType === "physical" ? 100 : 0,
      isActive: true,
    });

    // Create default variant
    await db.insert(productVariants).values({
      id: generateId(),
      productId,
      sku: product.sku || "DEFAULT",
      name: "Default",
      price: product.basePrice,
      comparePrice: product.comparePrice,
      stock: product.productType === "physical" ? 100 : 999,
      isActive: true,
    });

    // Add placeholder image reference
    await db.insert(productImages).values({
      id: generateId(),
      productId,
      url: `/images/products/${product.slug}.png`,
      altText: product.name,
      position: 0,
      isPrimary: true,
    });
  }

  // ---- Default Theme ----
  console.log("Creating default theme...");
  await db.insert(themes).values({
    id: generateId(),
    name: "NexStore Dark",
    isActive: true,
    colors: JSON.stringify({
      bgPrimary: "hsl(222, 47%, 5%)",
      bgSecondary: "hsl(222, 40%, 8%)",
      bgTertiary: "hsl(222, 35%, 12%)",
      accentPrimary: "hsl(262, 100%, 65%)",
      accentSecondary: "hsl(180, 100%, 50%)",
      accentTertiary: "hsl(330, 100%, 60%)",
      textPrimary: "hsl(0, 0%, 95%)",
      textSecondary: "hsl(0, 0%, 70%)",
      textMuted: "hsl(0, 0%, 45%)",
      success: "hsl(142, 76%, 45%)",
      warning: "hsl(38, 92%, 50%)",
      danger: "hsl(0, 84%, 60%)",
    }),
    fonts: JSON.stringify({
      heading: "Outfit",
      body: "Inter",
      mono: "JetBrains Mono",
    }),
    borderRadius: "0.625rem",
    buttonStyle: "gradient",
    layoutStyle: "default",
    darkMode: true,
  });

  // ---- Settings ----
  console.log("Creating settings...");
  const settingsData = [
    { key: "store_name", value: "NexStore", group: "general", description: "Store name" },
    { key: "store_description", value: "Premium E-Commerce Platform", group: "general", description: "Store description" },
    { key: "store_email", value: "hello@nexstore.com", group: "general", description: "Store email" },
    { key: "store_phone", value: "+91 9876543210", group: "general", description: "Store phone" },
    { key: "default_currency", value: "INR", group: "general", description: "Default currency" },
    { key: "tax_rate", value: "18", group: "general", description: "GST tax rate (%)" },
    { key: "free_shipping_threshold", value: "999", group: "shipping", description: "Free shipping threshold (INR)" },
    { key: "default_shipping_cost", value: "99", group: "shipping", description: "Default shipping cost (INR)" },
    { key: "stripe_enabled", value: "true", group: "payment", description: "Enable Stripe payments" },
    { key: "razorpay_enabled", value: "true", group: "payment", description: "Enable Razorpay payments" },
    { key: "upi_enabled", value: "true", group: "payment", description: "Enable UPI payments" },
    { key: "smtp_enabled", value: "true", group: "email", description: "Enable SMTP emails" },
    { key: "order_confirmation_email", value: "true", group: "email", description: "Send order confirmation emails" },
  ];

  for (const setting of settingsData) {
    await db.insert(settings).values({ id: generateId(), ...setting });
  }

  // ---- Sample Coupon ----
  console.log("Creating sample coupons...");
  await db.insert(coupons).values([
    {
      id: generateId(),
      code: "WELCOME10",
      description: "10% off on first order",
      type: "percentage",
      value: 10,
      minOrderAmount: 500,
      maxDiscountAmount: 1000,
      maxUses: 1000,
      usedCount: 0,
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: generateId(),
      code: "FLAT500",
      description: "Flat ₹500 off on orders above ₹3000",
      type: "fixed",
      value: 500,
      minOrderAmount: 3000,
      maxUses: 500,
      usedCount: 0,
      isActive: true,
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  console.log("\n✅ Database seeded successfully!");
  console.log("Admin login: admin@nexstore.com / Admin@123");
  console.log("Customer login: customer@demo.com / Customer@123");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
