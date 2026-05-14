"use server";

import { db } from "@/db";
import { products, productVariants, categories, reviews } from "@/db/schema";
import { eq, desc, asc, like, and, sql } from "drizzle-orm";

export async function getProducts(params?: {
  category?: string;
  search?: string;
  sort?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  const conditions = [];

  if (params?.search) {
    conditions.push(like(products.name, `%${params.search}%`));
  }

  if (params?.featured) {
    conditions.push(eq(products.featured, true));
  }

  // Build sort
  let orderBy;
  switch (params?.sort) {
    case "price-low":
      orderBy = asc(products.basePrice);
      break;
    case "price-high":
      orderBy = desc(products.basePrice);
      break;
    case "newest":
      orderBy = desc(products.createdAt);
      break;
    case "rating":
      orderBy = desc(products.avgRating);
      break;
    default:
      orderBy = desc(products.featured);
  }

  const result = await db
    .select()
    .from(products)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(orderBy)
    .limit(params?.limit || 20)
    .offset(params?.offset || 0);

  return result;
}

export async function getProductBySlug(slug: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      category: true,
      variants: true,
      images: true,
    },
  });

  return product;
}

export async function getFeaturedProducts(limit = 8) {
  return db
    .select()
    .from(products)
    .where(eq(products.featured, true))
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export async function getCategories() {
  return db
    .select()
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.position));
}

export async function getProductReviews(productId: string) {
  return db
    .select()
    .from(reviews)
    .where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)))
    .orderBy(desc(reviews.createdAt))
    .limit(20);
}

export async function getDashboardStats() {
  const totalProducts = await db
    .select({ count: sql<number>`count(*)` })
    .from(products);

  const totalCategories = await db
    .select({ count: sql<number>`count(*)` })
    .from(categories);

  return {
    totalProducts: totalProducts[0]?.count || 0,
    totalCategories: totalCategories[0]?.count || 0,
  };
}
