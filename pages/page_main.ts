import { Locator, Page } from "@playwright/test";
import { AuthorisePage } from "@pages/page_authorise";
import * as config from "../routs.config";

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

  private get buttonOrderNow(): Locator {
    return this.page.locator("section").filter({ hasText: "Achieve your growth goals" }).getByRole("link");
  }

  // Actions

  async navigate(url: string = config.base_url) {
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
