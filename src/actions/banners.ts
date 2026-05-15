"use server";

import { db } from "@/db";
import { banners } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBanners() {
  try {
    return await db.query.banners.findMany({
      orderBy: [asc(banners.position)],
    });
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return [];
  }
}

export async function createBanner(data: {
  title?: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  buttonText?: string;
  position?: number;
}) {
  try {
    await db.insert(banners).values({
      ...data,
      isActive: true,
    });
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create banner:", error);
    return { success: false, error: "Failed to create banner" };
  }
}

export async function updateBanner(id: string, data: Partial<{
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
  buttonText: string;
  position: number;
  isActive: boolean;
}>) {
  try {
    await db.update(banners).set({
      ...data,
      updatedAt: new Date().toISOString(),
    }).where(eq(banners.id, id));
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update banner:", error);
    return { success: false, error: "Failed to update banner" };
  }
}

export async function deleteBanner(id: string) {
  try {
    await db.delete(banners).where(eq(banners.id, id));
    revalidatePath("/admin/banners");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete banner:", error);
    return { success: false, error: "Failed to delete banner" };
  }
}
