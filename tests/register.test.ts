import { test } from "@playwright/test";
import { MainPage } from "@pages/page_main";
import { AuthorisePage } from "@pages/page_authorise";
import { getRandomEmail, getRandomPassword } from "@helpers/helper_random";

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
