import { Locator, Page } from "@playwright/test";
import { routes } from "playwright.config";

import { AuthorisePage } from "@pages/page_authorise";

export class MainPage {
  private page: Page;
  private authorisePage: AuthorisePage;

  constructor(page: Page) {
    this.page = page;
    this.authorisePage = new AuthorisePage(page);
  }

  // Locators

  private get buttonLogIn(): Locator {
    return this.page.getByRole("link", { name: "Log In" });
  }

  private get buttonSignUp(): Locator {
    return this.page.getByRole("link", { name: "Sign Up" });
  }

  // Actions

  async navigate(url: string = routes.main_url) {
    if (this.page.url() !== url) {
      await this.page.goto(url);
    }
  }

  async clickLogInButton() {
    await this.buttonLogIn.click();
    await this.authorisePage.verifyTermsAndConditionsLogIn();
  }

  async clickSignUpButton() {
    await this.buttonSignUp.click();
    await this.authorisePage.verifyTermsAndConditionsSignUp();
  }
}
