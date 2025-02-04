import { test } from "@playwright/test";
import { MainPage } from "@pages/page_main";
import { AuthorisePage } from "@pages/page_authorise";
import * as process from "node:process";

let mainPage: MainPage;
let loginPage: AuthorisePage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  loginPage = new AuthorisePage(page);
  await mainPage.navigate();
});

test("Login with correct credentials", async () => {
  await mainPage.clickLogInButton();
  await loginPage.commitLoginWithEmail(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
});
