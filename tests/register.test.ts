import { test } from "@playwright/test";
import { MainPage } from "@pages/page_main";
import { AuthorisePage } from "@pages/page_authorise";
import { getRandomEmail, getRandomPassword } from "@helpers/helper_random";
import * as config from "../routs.config";

let mainPage: MainPage;
let loginPage: AuthorisePage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  loginPage = new AuthorisePage(page);
  await mainPage.navigate();
});

test("Register without confirmation", async () => {
  console.log(config.test_user_email);
  console.log(config.test_user_password);
  await mainPage.clickSignUpButton();
  await loginPage.commitRegisterWithEmail(getRandomEmail(), getRandomPassword());
});
