"use server";

import { db } from "@/db";
import { orders, orderItems, payments } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function createOrder(data: {
  items: Array<{
    productId: string;
    variantId: string;
    productName: string;
    variantName: string;
    price: number;
    quantity: number;
    productType: string;
  }>;
  shippingAddress: Record<string, string>;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  // Create order
  const [order] = await db
    .insert(orders)
    .values({
      orderNumber: orderId,
      userId: session.user.id,
      subtotal: data.subtotal,
      shippingCost: data.shippingFee,
      tax: data.taxAmount,
      discount: data.discountAmount,
      total: data.totalAmount,
      couponId: data.couponCode,
      currency: "INR",
      status: "pending",
      shippingAddressSnapshot: JSON.stringify(data.shippingAddress),
    })
    .returning();

  // Create order items
  for (const item of data.items) {
    await db.insert(orderItems).values({
      orderId: order.id,
      productId: item.productId,
      variantId: item.variantId,
      productName: item.productName,
      variantName: item.variantName,
      unitPrice: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
      productType: item.productType,
    });
  }

  // Create payment record
  await db.insert(payments).values({
    orderId: order.id,
    amount: data.totalAmount,
    currency: "INR",
    provider: data.paymentMethod,
    status: "pending",
  });

  return { orderId: order.id, orderNumber: orderId };
}

export async function getUserOrders() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, session.user.id))
    .orderBy(desc(orders.createdAt))
    .limit(50);
}

export async function getOrderById(orderId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.userId, session.user.id)),
    with: {
      items: true,
    },
  });

  return order;
}

export async function getAdminOrders(params?: {
  status?: string;
  limit?: number;
  offset?: number;
}) {
  const session = await auth();
  const userRole = (session?.user as Record<string, unknown>)?.role as string | undefined;

  if (!session?.user || (userRole !== "admin" && userRole !== "manager")) {
    throw new Error("Unauthorized");
  }

  const conditions = [];
  if (params?.status) {
    conditions.push(eq(orders.status, params.status));
  }

  return db
    .select()
    .from(orders)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(orders.createdAt))
    .limit(params?.limit || 50)
    .offset(params?.offset || 0);
}

export async function updateOrderStatus(orderId: string, status: string) {
  const session = await auth();
  const userRole = (session?.user as Record<string, unknown>)?.role as string | undefined;

  if (!session?.user || (userRole !== "admin" && userRole !== "manager")) {
    throw new Error("Unauthorized");
  }

  await db
    .update(orders)
    .set({
      status,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(orders.id, orderId));

  return { success: true };
}
