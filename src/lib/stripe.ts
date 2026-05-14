import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY is not set. Stripe payments will not work.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

export async function createStripeCheckoutSession(params: {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  orderId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  currency?: string;
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: params.items.map((item) => ({
      price_data: {
        currency: params.currency || "inr",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: item.price * 100, // Stripe uses smallest currency unit (paise)
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.customerEmail,
    metadata: {
      orderId: params.orderId,
    },
  });

  return session;
}

export async function retrieveStripeSession(sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId);
}

export async function constructStripeWebhookEvent(
  body: string,
  signature: string
) {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET || ""
  );
}
