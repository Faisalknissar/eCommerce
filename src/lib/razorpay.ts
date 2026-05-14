import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn("Razorpay credentials not set. Razorpay payments will not work.");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function createRazorpayOrder(params: {
  amount: number;
  currency?: string;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const order = await razorpay.orders.create({
    amount: params.amount * 100, // Razorpay uses paise
    currency: params.currency || "INR",
    receipt: params.receipt,
    notes: params.notes || {},
  });

  return order;
}

export async function verifyRazorpayPayment(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const crypto = await import("crypto");
  const generated = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  return generated === params.signature;
}

export async function fetchRazorpayPayment(paymentId: string) {
  return razorpay.payments.fetch(paymentId);
}

export { razorpay };
