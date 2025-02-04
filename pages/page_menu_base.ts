import { Locator, Page } from "@playwright/test";

export class MenuBasePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators

  private get tabOrders(): Locator {
    return this.page.getByRole("link", { name: "My orders" });
  }

  private get buttonNewOrder(): Locator {
    return this.page.getByRole("link", { name: "New order" });
  }

  // Actions

  async verifyOrders() {
    await this.tabOrders.isVisible();
  }

  async clickNewOrder() {
    await this.buttonNewOrder.click();
  }

  async verifyNewOrder() {
    await this.buttonNewOrder.isVisible({ timeout: 1000 });
  }
}
