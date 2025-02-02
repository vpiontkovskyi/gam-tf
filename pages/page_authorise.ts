import { expect, Locator, Page } from "@playwright/test";

import { MenuBasePage } from "@pages/page_menu_base";
import { OrdersPage } from "@pages/page_orders";
import * as config from "../routs.config";

export class AuthorisePage {
  private page: Page;
  private menuBasePage: MenuBasePage;
  private ordersPage: OrdersPage;

  constructor(page: Page) {
    this.page = page;
    this.menuBasePage = new MenuBasePage(page);
    this.ordersPage = new OrdersPage(page);
  }

  // Locators

  get tabLogIn(): Locator {
    return this.page.getByRole("tab", { name: "Log in" });
  }

  get tabSignUp(): Locator {
    return this.page.getByRole("tab", { name: "Sign up" });
  }

  get buttonSignInWithEmail(): Locator {
    return this.page.getByRole("button", { name: "Sign in with email" });
  }

  get buttonSignUpWithEmail(): Locator {
    return this.page.getByRole("button", { name: "Sign up with email" });
  }

  get textboxEmail(): Locator {
    return this.page.getByRole("textbox", { name: "Enter your email" });
  }

  get textBoxPassword(): Locator {
    return this.page.getByRole("textbox", { name: "Enter your password" });
  }

  get buttonContinue(): Locator {
    return this.page.getByRole("button", { name: "Continue" });
  }

  get textTermsAndConditionsLogIn(): Locator {
    return this.page.getByText("By logging in, you agree to our Terms and Conditions Privacy Policy Refund");
  }

  get textTermsAndConditionsSignUp(): Locator {
    return this.page.getByText("By creating an account, you agree to the Terms and Conditions Privacy Policy");
  }

  // Actions

  async navigate(url: string = config.app_url + config.login_endpoint) {
    if (this.page.url() !== url) await this.page.goto(url);
  }

  async clickTabLogIn() {
    await this.tabLogIn.click();
  }

  async clickTabSignUp() {
    await this.tabSignUp.click();
  }

  async clickButtonSignInWithEmail() {
    await this.buttonSignInWithEmail.click();
  }

  async clickButtonSignUpWithEmail() {
    await this.buttonSignUpWithEmail.click();
  }

  async typeEmail(email: string) {
    await this.textboxEmail.fill(email);
  }

  async typePassword(password: string) {
    await this.textBoxPassword.fill(password);
  }

  async clickButtonContinue() {
    await this.buttonContinue.click();
  }

  async verifyTermsAndConditionsLogIn() {
    await expect(this.textTermsAndConditionsLogIn).toBeVisible();
  }

  async verifyTermsAndConditionsSignUp() {
    await expect(this.textTermsAndConditionsSignUp).toBeVisible();
  }

  // Clients

  async commitLoginWithEmail(email: string, password: string) {
    await this.navigate();

    // FIXME: This is hotfix
    if (await this.buttonContinue.isVisible()) {
      await this.clickButtonContinue();
    }

    await this.verifyTermsAndConditionsLogIn();
    await this.clickTabLogIn();
    await this.clickButtonSignInWithEmail();
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickButtonContinue();
    await this.menuBasePage.verifyOrders();
    await this.menuBasePage.verifyNewOrder();
  }

  async commitRegisterWithEmail(email: string, password: string) {
    await this.navigate();

    // FIXME: This is hotfix
    if (await this.buttonContinue.isVisible()) {
      await this.clickButtonContinue();
    }

    await this.verifyTermsAndConditionsLogIn();
    await this.clickTabSignUp();
    await this.verifyTermsAndConditionsSignUp();
    await this.clickButtonSignUpWithEmail();
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickButtonContinue();
    await this.menuBasePage.verifyOrders();
    await this.menuBasePage.verifyNewOrder();
  }
}
