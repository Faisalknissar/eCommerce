import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  // In a real app, fetch product by slug from the database here
  // const product = await getProductBySlug(slug);
  const formattedTitle = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return {
    title: formattedTitle,
    description: `Buy ${formattedTitle} at NexStore. Premium quality, best prices, and secure checkout.`,
    openGraph: {
      title: `${formattedTitle} | NexStore`,
      description: `Buy ${formattedTitle} at NexStore. Premium quality, best prices, and secure checkout.`,
      images: [
        {
          url: `/images/products/${slug}.webp`, // fallback or placeholder
          width: 800,
          height: 600,
          alt: formattedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedTitle} | NexStore`,
      description: `Buy ${formattedTitle} at NexStore. Premium quality, best prices, and secure checkout.`,
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
