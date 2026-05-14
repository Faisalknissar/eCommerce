import { test, expect } from "@playwright/test";

test.describe("Checkout Flow", () => {
  test("should add a product to cart", async ({ page }) => {
    await page.goto("/products");
    // Wait for products to load
    await expect(page.locator("text=Quantum Pro Wireless Headphones")).toBeVisible();
    
    // Click on the first product
    await page.click("text=Quantum Pro Wireless Headphones");
    
    // Add to cart
    await page.click("text=Add to Cart");
    
    // Check cart count or drawer
    await expect(page.locator("text=Cart")).toBeVisible();
    await expect(page.locator("text=Quantum Pro Wireless Headphones")).toBeVisible();
  });
});
