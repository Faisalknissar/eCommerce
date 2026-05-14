import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should navigate to login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/Login/);
  });

  test("should show error on invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "WrongPass123");
    await page.click('button[type="submit"]');
    
    // The error message might be in a toast or alert
    await expect(page.locator("text=Invalid credentials").or(page.locator("text=error"))).toBeVisible();
  });
});
