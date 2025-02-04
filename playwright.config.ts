import { defineConfig, devices } from "@playwright/test";
import * as process from "node:process";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export const routes = {
  main_url: process.env.MAIN_URL,
  login_endpoint: "/auth/login",
  orders_endpoint: "/customer/orders/open",
  draft_endpoint: "/customer/draft",
  create_draft_endpoint: "/customer/draft/new",
};

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "retain-on-failure",
    headless: false,
    screenshot: "only-on-failure",
    geolocation: { latitude: 40.7834, longitude: -73.9662 },
    locale: "en-UK",
    permissions: ["geolocation"],
    baseURL: process.env.BASE_URL,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    //
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
