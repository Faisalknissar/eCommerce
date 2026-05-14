import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "SG.placeholder");

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  const from = process.env.SMTP_FROM || "noreply@nexstore.com";

  try {
    // If SendGrid API Key exists, use SendGrid (Production path)
    if (process.env.SENDGRID_API_KEY) {
      const msg = {
        to,
        from,
        subject,
        text: text || subject,
        html,
      };
      
      const response = await sgMail.send(msg);
      console.log("Email sent via SendGrid:", response[0].headers["x-message-id"]);
      return { success: true, messageId: response[0].headers["x-message-id"] };
    } 
    // Otherwise fallback to Nodemailer (Development path)
    else {
      const transporter = getTransporter();
      const info = await transporter.sendMail({
        from: `"NexStore" <${from}>`,
        to,
        subject,
        html,
        text: text || subject,
      });

      console.log("Email sent via Nodemailer:", info.messageId);
      return { success: true, messageId: info.messageId };
    }
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}

// ---- Email Templates ----

export function orderConfirmationEmail(orderId: string, customerName: string, total: string) {
  return {
    subject: `Order Confirmed — ${orderId}`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #f2f2f2; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #8b5cf6, #00e5ff); border-radius: 12px; line-height: 48px; font-size: 24px; font-weight: 900; color: white;">N</div>
        </div>
        <h1 style="font-size: 24px; text-align: center; margin-bottom: 8px;">Order Confirmed! 🎉</h1>
        <p style="text-align: center; color: #b3b3b3; margin-bottom: 24px;">Hey ${customerName}, your order has been placed successfully.</p>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 14px; color: #737373;">Order ID</p>
          <p style="margin: 0; font-size: 18px; font-weight: 700; color: #8b5cf6;">${orderId}</p>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 14px; color: #737373;">Total Amount</p>
          <p style="margin: 0; font-size: 24px; font-weight: 700;">${total}</p>
        </div>
        <p style="text-align: center; color: #737373; font-size: 12px;">If you have questions, reply to this email or contact us at hello@nexstore.com</p>
      </div>
    `,
  };
}

export function welcomeEmail(customerName: string) {
  return {
    subject: `Welcome to NexStore, ${customerName}! 🛍️`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a14; color: #f2f2f2; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #8b5cf6, #00e5ff); border-radius: 12px; line-height: 48px; font-size: 24px; font-weight: 900; color: white;">N</div>
        </div>
        <h1 style="font-size: 24px; text-align: center; margin-bottom: 8px;">Welcome to NexStore!</h1>
        <p style="text-align: center; color: #b3b3b3; margin-bottom: 24px;">Hey ${customerName}, we're thrilled to have you on board. Start exploring our curated collection of premium products.</p>
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/products" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Start Shopping →
          </a>
        </div>
        <p style="text-align: center; color: #737373; font-size: 12px;">Use code <strong style="color: #00e5ff;">WELCOME10</strong> for 10% off your first order!</p>
      </div>
    `,
  };
}
