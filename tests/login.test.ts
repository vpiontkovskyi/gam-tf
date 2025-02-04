import { test } from "@playwright/test";
import { MainPage } from "@pages/page_main";
import { AuthorisePage } from "@pages/page_authorise";
import * as config from "../routs.config";
import * as fs from "fs";

let mainPage: MainPage;
let loginPage: AuthorisePage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  loginPage = new AuthorisePage(page);
  await mainPage.navigate();
});

test("Login with correct password", async () => {
  await mainPage.clickLogInButton();
  await loginPage.commitLoginWithEmail(config.test_user_email, config.test_user_password);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    const html = await page.content();
    fs.writeFileSync(`failed-${testInfo.title.replace(/\s+/g, "_")}.html`, html);
  }
});
