import { test } from "@playwright/test";
import { MainPage } from "@pages/page_main";
import { AuthorisePage } from "@pages/page_authorise";
import * as config from "../routs.config";

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
