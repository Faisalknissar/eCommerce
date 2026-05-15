import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { AuthProvider } from "@/components/shared/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NexStore — Premium E-Commerce Platform",
    template: "%s | NexStore",
  },
  description:
    "Discover premium products across electronics, fashion, digital goods, and professional services. Experience next-generation online shopping with NexStore.",
  keywords: [
    "e-commerce",
    "online shopping",
    "premium products",
    "electronics",
    "fashion",
    "digital products",
  ],
  openGraph: {
    title: "NexStore — Premium E-Commerce Platform",
    description: "Experience next-generation online shopping",
    type: "website",
    locale: "en_IN",
    siteName: "NexStore",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexStore — Premium E-Commerce Platform",
    description: "Experience next-generation online shopping",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "var(--theme-bg-tertiary)",
                  color: "var(--theme-text-primary)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
