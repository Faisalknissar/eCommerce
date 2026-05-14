import { pgTable, text, integer, doublePrecision, boolean, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { generateId } from "@/lib/utils";

// ============================================================
// USERS & AUTH
// ============================================================

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(generateId),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash"),
  avatarUrl: text("avatar_url"),
  phone: text("phone"),
  roleId: text("role_id").references(() => roles.id),
  emailVerified: timestamp("email_verified", { mode: "date", precision: 3 }),
  image: text("image"),
  isActive: boolean("is_active").default(true),
  lastLoginAt: text("last_login_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text("deleted_at"),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, { fields: [users.roleId], references: [roles.id] }),
  orders: many(orders),
  reviews: many(reviews),
  addresses: many(addresses),
  wishlists: many(wishlists),
  carts: many(carts),
  notifications: many(notifications),
  auditLogs: many(auditLogs),
}));

export const roles = pgTable("roles", {
  id: text("id").primaryKey().$defaultFn(generateId),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
  permissions: many(permissions),
}));

export const permissions = pgTable("permissions", {
  id: text("id").primaryKey().$defaultFn(generateId),
  roleId: text("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  resource: text("resource").notNull(),
  action: text("action").notNull(), // create, read, update, delete
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const permissionsRelations = relations(permissions, ({ one }) => ({
  role: one(roles, { fields: [permissions.roleId], references: [roles.id] }),
}));

// NextAuth.js tables
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey().$defaultFn(generateId),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date", precision: 3 }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date", precision: 3 }).notNull(),
  },
  (vt) => ({
    pk: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// ============================================================
// PRODUCTS & CATALOG
// ============================================================

export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(generateId),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  parentId: text("parent_id"),
  position: integer("position").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, { fields: [categories.parentId], references: [categories.id] }),
  products: many(products),
}));

export const products = pgTable("products", {
  id: text("id").primaryKey().$defaultFn(generateId),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  basePrice: doublePrecision("base_price").notNull(),
  comparePrice: doublePrecision("compare_price"),
  costPrice: doublePrecision("cost_price"),
  categoryId: text("category_id").references(() => categories.id),
  productType: text("product_type").notNull().default("physical"), // physical, digital, service
  status: text("status").notNull().default("draft"), // draft, published, archived
  featured: boolean("featured").default(false),
  isActive: boolean("is_active").default(true),
  sku: text("sku"),
  barcode: text("barcode"),
  weight: doublePrecision("weight"),
  dimensions: text("dimensions"), // JSON string: { length, width, height }
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  tags: text("tags"), // JSON array string
  downloadUrl: text("download_url"), // For digital products
  downloadLimit: integer("download_limit"),
  serviceDuration: integer("service_duration"), // For services (minutes)
  totalStock: integer("total_stock").default(0),
  totalSold: integer("total_sold").default(0),
  avgRating: doublePrecision("avg_rating").default(0),
  reviewCount: integer("review_count").default(0),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text("deleted_at"),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  variants: many(productVariants),
  images: many(productImages),
  reviews: many(reviews),
  wishlists: many(wishlists),
}));

export const productVariants = pgTable("product_variants", {
  id: text("id").primaryKey().$defaultFn(generateId),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  sku: text("sku").notNull(),
  name: text("name"), // e.g., "Red / Large"
  price: doublePrecision("price").notNull(),
  comparePrice: doublePrecision("compare_price"),
  costPrice: doublePrecision("cost_price"),
  stock: integer("stock").notNull().default(0),
  lowStockThreshold: integer("low_stock_threshold").default(5),
  attributes: text("attributes"), // JSON: { color: "Red", size: "L" }
  imageUrl: text("image_url"),
  weight: doublePrecision("weight"),
  isActive: boolean("is_active").default(true),
  position: integer("position").default(0),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
}));

export const productImages = pgTable("product_images", {
  id: text("id").primaryKey().$defaultFn(generateId),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  position: integer("position").default(0),
  isPrimary: boolean("is_primary").default(false),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));

// ============================================================
// SHOPPING & ORDERS
// ============================================================

export const carts = pgTable("carts", {
  id: text("id").primaryKey().$defaultFn(generateId),
  userId: text("user_id").references(() => users.id),
  sessionId: text("session_id"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, { fields: [carts.userId], references: [users.id] }),
  items: many(cartItems),
}));

export const cartItems = pgTable("cart_items", {
  id: text("id").primaryKey().$defaultFn(generateId),
  cartId: text("cart_id").notNull().references(() => carts.id, { onDelete: "cascade" }),
  variantId: text("variant_id").notNull().references(() => productVariants.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
  variant: one(productVariants, { fields: [cartItems.variantId], references: [productVariants.id] }),
}));

export const wishlists = pgTable("wishlists", {
  id: text("id").primaryKey().$defaultFn(generateId),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const wishlistsRelations = relations(wishlists, ({ one }) => ({
  user: one(users, { fields: [wishlists.userId], references: [users.id] }),
  product: one(products, { fields: [wishlists.productId], references: [products.id] }),
}));

export const orders = pgTable("orders", {
  id: text("id").primaryKey().$defaultFn(generateId),
  orderNumber: text("order_number").notNull().unique(),
  userId: text("user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("pending"),
  subtotal: doublePrecision("subtotal").notNull(),
  tax: doublePrecision("tax").notNull().default(0),
  shippingCost: doublePrecision("shipping_cost").notNull().default(0),
  discount: doublePrecision("discount").notNull().default(0),
  total: doublePrecision("total").notNull(),
  currency: text("currency").notNull().default("INR"),
  couponId: text("coupon_id").references(() => coupons.id),
  addressId: text("address_id").references(() => addresses.id),
  shippingAddressSnapshot: text("shipping_address_snapshot"), // JSON snapshot
  notes: text("notes"),
  trackingNumber: text("tracking_number"),
  shippedAt: text("shipped_at"),
  deliveredAt: text("delivered_at"),
  cancelledAt: text("cancelled_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  coupon: one(coupons, { fields: [orders.couponId], references: [coupons.id] }),
  address: one(addresses, { fields: [orders.addressId], references: [addresses.id] }),
  items: many(orderItems),
  payments: many(payments),
}));

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey().$defaultFn(generateId),
  orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id),
  variantId: text("variant_id").references(() => productVariants.id),
  productName: text("product_name").notNull(), // Snapshot
  variantName: text("variant_name"), // Snapshot
  sku: text("sku"),
  quantity: integer("quantity").notNull(),
  unitPrice: doublePrecision("unit_price").notNull(),
  total: doublePrecision("total").notNull(),
  productType: text("product_type").notNull().default("physical"),
  downloadUrl: text("download_url"), // For digital products
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
  variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }),
}));

// ============================================================
// PAYMENTS
// ============================================================

export const payments = pgTable("payments", {
  id: text("id").primaryKey().$defaultFn(generateId),
  orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(), // stripe, razorpay, upi
  providerId: text("provider_id"), // External payment ID
  amount: doublePrecision("amount").notNull(),
  currency: text("currency").notNull().default("INR"),
  status: text("status").notNull().default("pending"),
  method: text("method"), // card, upi, netbanking, wallet
  metadata: text("metadata"), // JSON
  paidAt: text("paid_at"),
  failedAt: text("failed_at"),
  refundedAt: text("refunded_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, { fields: [payments.orderId], references: [orders.id] }),
}));

// ============================================================
// COUPONS
// ============================================================

export const coupons = pgTable("coupons", {
  id: text("id").primaryKey().$defaultFn(generateId),
  code: text("code").notNull().unique(),
  description: text("description"),
  type: text("type").notNull(), // percentage, fixed
  value: doublePrecision("value").notNull(),
  minOrderAmount: doublePrecision("min_order_amount"),
  maxDiscountAmount: doublePrecision("max_discount_amount"),
  maxUses: integer("max_uses"),
  usedCount: integer("used_count").default(0),
  isActive: boolean("is_active").default(true),
  startsAt: text("starts_at"),
  expiresAt: text("expires_at"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const couponsRelations = relations(coupons, ({ many }) => ({
  orders: many(orders),
}));

// ============================================================
// REVIEWS
// ============================================================

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey().$defaultFn(generateId),
  userId: text("user_id").notNull().references(() => users.id),
  productId: text("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  title: text("title"),
  body: text("body"),
  isApproved: boolean("is_approved").default(false),
  isVerified: boolean("is_verified").default(false), // Verified purchase
  adminReply: text("admin_reply"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  product: one(products, { fields: [reviews.productId], references: [products.id] }),
}));

// ============================================================
// ADDRESSES
// ============================================================

export const addresses = pgTable("addresses", {
  id: text("id").primaryKey().$defaultFn(generateId),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  label: text("label"), // Home, Office, etc.
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  line1: text("line1").notNull(),
  line2: text("line2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull().default("IN"),
  isDefault: boolean("is_default").default(false),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, { fields: [addresses.userId], references: [users.id] }),
}));

// ============================================================
// THEMES
// ============================================================

export const themes = pgTable("themes", {
  id: text("id").primaryKey().$defaultFn(generateId),
  name: text("name").notNull(),
  isActive: boolean("is_active").default(false),
  colors: text("colors").notNull(), // JSON: { primary, secondary, accent, bg, text, etc. }
  fonts: text("fonts").notNull(), // JSON: { heading, body, mono }
  borderRadius: text("border_radius").notNull().default("0.625rem"),
  buttonStyle: text("button_style").notNull().default("solid"), // solid, outline, gradient
  layoutStyle: text("layout_style").notNull().default("default"), // default, compact, spacious
  darkMode: boolean("dark_mode").default(true),
  customCss: text("custom_css"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

// ============================================================
// NOTIFICATIONS
// ============================================================

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey().$defaultFn(generateId),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // order, promotion, system, review
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  data: text("data"), // JSON: extra context
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

// ============================================================
// AUDIT LOGS
// ============================================================

export const auditLogs = pgTable("audit_logs", {
  id: text("id").primaryKey().$defaultFn(generateId),
  userId: text("user_id").references(() => users.id),
  action: text("action").notNull(), // created, updated, deleted, login, logout
  resource: text("resource").notNull(), // product, order, user, etc.
  resourceId: text("resource_id"),
  oldData: text("old_data"), // JSON
  newData: text("new_data"), // JSON
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, { fields: [auditLogs.userId], references: [users.id] }),
}));

// ============================================================
// SETTINGS
// ============================================================

export const settings = pgTable("settings", {
  id: text("id").primaryKey().$defaultFn(generateId),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  group: text("group").notNull().default("general"), // general, payment, email, shipping
  description: text("description"),
  updatedAt: text("updated_at").notNull().$defaultFn(() => new Date().toISOString()),
});

// ============================================================
// Type Exports
// ============================================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
export type Permission = typeof permissions.$inferSelect;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;
export type ProductImage = typeof productImages.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Cart = typeof carts.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Wishlist = typeof wishlists.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Coupon = typeof coupons.$inferSelect;
export type NewCoupon = typeof coupons.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;
export type Theme = typeof themes.$inferSelect;
export type NewTheme = typeof themes.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
export type Setting = typeof settings.$inferSelect;
