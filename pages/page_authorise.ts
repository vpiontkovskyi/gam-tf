import { expect, Locator, Page } from "@playwright/test";
import config, { routes } from "playwright.config";

import { MenuBasePage } from "@pages/page_menu_base";
import { OrdersPage } from "@pages/page_orders";

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

  private get textAwareUK(): Locator {
    return this.page.getByText("Before proceeding, please be");
  }

  private get buttonAwareUKContinue(): Locator {
    return this.page.locator("#cdk-overlay-0").getByRole("button", { name: "Continue" });
  }

  private get tabLogIn(): Locator {
    return this.page.getByRole("tab", { name: "Log in" });
  }

  private get tabSignUp(): Locator {
    return this.page.getByRole("tab", { name: "Sign up" });
  }

  private get buttonSignInWithEmail(): Locator {
    return this.page.getByRole("button", { name: "Sign in with email" });
  }

  private get buttonSignUpWithEmail(): Locator {
    return this.page.getByRole("button", { name: "Sign up with email" });
  }

  private get textboxEmail(): Locator {
    return this.page.getByRole("textbox", { name: "Enter your email" });
  }

  private get textBoxPassword(): Locator {
    return this.page.getByRole("textbox", { name: "Enter your password" });
  }

  private get buttonContinue(): Locator {
    return this.page.getByRole("button", { name: "Continue" });
  }

  private get textTermsAndConditionsLogIn(): Locator {
    return this.page.getByText("By logging in, you agree to our Terms and Conditions Privacy Policy Refund");
  }

  private get textTermsAndConditionsSignUp(): Locator {
    return this.page.getByText("By creating an account, you agree to the Terms and Conditions Privacy Policy");
  }

  // Actions

  async navigate(url: string = config.use.baseURL + routes.login_endpoint) {
    if (this.page.url() !== url) await this.page.goto(url);
    if (await this.textAwareUK.isVisible({ timeout: 1000 })) await this.buttonAwareUKContinue.click({ timeout: 1000 });
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

  // Asserts

  async verifyTermsAndConditionsLogIn() {
    await expect(this.textTermsAndConditionsLogIn).toBeVisible();
  }

  async verifyTermsAndConditionsSignUp() {
    await expect(this.textTermsAndConditionsSignUp).toBeVisible();
  }

  // Clients

  async commitLoginWithEmail(email: string, password: string) {
    await this.navigate();
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
