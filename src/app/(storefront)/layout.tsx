import { Navbar } from "@/components/storefront/navbar";
import { Footer } from "@/components/storefront/footer";
import { SearchOverlay } from "@/components/storefront/search-overlay";
import { CartDrawer } from "@/components/storefront/cart-drawer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchOverlay />
      <CartDrawer />
      {/* Fixed Header Spacer with 10px extra gap */}
      <div className="h-[74px] md:h-[90px] shrink-0" aria-hidden="true" />
      <main className="storefront-main flex-1">{children}</main>
      <Footer />
    </div>
  );
}
