import { defineConfig, devices } from "@playwright/test";

// Pre-cutover smoke config (w3-2 Track 5). The site under test is served by
// the production nginx image started separately (docker run -p 8080:8080),
// so there is no `webServer` block here — CI owns the container lifecycle.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: process.env.SMOKE_BASE_URL ?? "http://localhost:8080",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
