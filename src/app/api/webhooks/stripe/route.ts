import { NextRequest, NextResponse } from "next/server";
import { constructStripeWebhookEvent } from "@/lib/stripe";
import { db } from "@/db";
import { orders, payments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") as string;

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = await constructStripeWebhookEvent(body, signature);
  } catch (err: any) {
    console.error(`⚠️ Stripe Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Retrieve order ID from metadata
        const orderId = session.metadata?.orderId;
        
        if (orderId) {
          // Update Payment Status
          await db
            .update(payments)
            .set({ 
              status: "paid",
              providerId: session.payment_intent as string,
              paidAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
            .where(eq(payments.orderId, orderId));
            
          // Update Order Status
          await db
            .update(orders)
            .set({ 
              status: "confirmed",
              updatedAt: new Date().toISOString(),
            })
            .where(eq(orders.id, orderId));
            
          console.log(`✅ Order ${orderId} confirmed via Stripe`);
          
          // Here you could trigger email notifications
        }
        break;
      }
      
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;
        
        if (orderId) {
          await db
            .update(payments)
            .set({ 
              status: "failed",
              failedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
            .where(eq(payments.orderId, orderId));
            
          console.log(`❌ Payment failed for order ${orderId}`);
        }
        break;
      }

      default:
        // Unhandled event type
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
