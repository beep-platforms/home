import { test, expect } from "@playwright/test";

// Pre-cutover smoke (w3-2 Track 5). Loads the built SPA served by the
// production nginx image and asserts (a) it renders, (b) it ships the
// security headers nginx.conf adds, and (c) the hero actually paints.
// A header regression here blocks the GHCR publish (see .github/workflows/smoke.yml).

const BASE_URL = process.env.SMOKE_BASE_URL ?? "http://localhost:8080";

test("home renders and ships security headers", async ({ page }) => {
  const resp = await page.goto(`${BASE_URL}/`);
  expect(resp, "no response from the site").not.toBeNull();
  expect(resp!.status()).toBe(200);

  const headers = resp!.headers();
  // The three hardening headers nginx.conf sets with `always`.
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  // CSP must lock default-src to self.
  expect(headers["content-security-policy"]).toContain("default-src 'self'");

  // Hero renders the owner's name (data/profile.ts -> Hero).
  await expect(page.getByText("Arrington").first()).toBeVisible();
});
