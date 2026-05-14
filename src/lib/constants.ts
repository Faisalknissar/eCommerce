export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "NexStore";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const DEFAULT_CURRENCY = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || "INR";
export const CURRENCY_SYMBOL = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

export const PRODUCT_TYPES = ["physical", "digital", "service"] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_PROVIDERS = ["stripe", "razorpay", "upi"] as const;
export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number];

export const PAYMENT_STATUSES = [
  "pending",
  "processing",
  "completed",
  "failed",
  "refunded",
] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const USER_ROLES = ["admin", "manager", "customer"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const CURRENCIES = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
] as const;

export const ITEMS_PER_PAGE = 12;
export const ADMIN_ITEMS_PER_PAGE = 20;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
] as const;

export const ADMIN_NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/products", label: "Products", icon: "Package" },
  { href: "/admin/orders", label: "Orders", icon: "ShoppingCart" },
  { href: "/admin/users", label: "Users", icon: "Users" },
  { href: "/admin/categories", label: "Categories", icon: "FolderTree" },
  { href: "/admin/coupons", label: "Coupons", icon: "Ticket" },
  { href: "/admin/reviews", label: "Reviews", icon: "Star" },
  { href: "/admin/themes", label: "Themes", icon: "Palette" },
  { href: "/admin/notifications", label: "Notifications", icon: "Bell" },
  { href: "/admin/audit-logs", label: "Audit Logs", icon: "ScrollText" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;

export const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 5242880; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];
