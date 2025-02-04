import { test } from "@playwright/test";
import { MainPage } from "@pages/page_main";
import { AuthorisePage } from "@pages/page_authorise";
import { getRandomEmail, getRandomPassword } from "@helpers/helper_random";
import * as fs from "fs";

let mainPage: MainPage;
let loginPage: AuthorisePage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  loginPage = new AuthorisePage(page);
  await mainPage.navigate();
});

test("Register without confirmation", async () => {
  await mainPage.clickSignUpButton();
  await loginPage.commitRegisterWithEmail(getRandomEmail(), getRandomPassword());
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    const html = await page.content();
    fs.writeFileSync(`failed-${testInfo.title.replace(/\s+/g, "_")}.html`, html);
  }
});
