import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nexstore.com";

  // In a real application, you would fetch all active products, categories, etc.
  // from the database to dynamically generate these entries.

  const routes = [
    "",
    "/products",
    "/cart",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Mock product URLs
  const productRoutes = [
    "quantum-pro-wireless-headphones",
    "neovibe-smart-watch-ultra",
    "aether-premium-leather-jacket"
  ].map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...productRoutes];
}
