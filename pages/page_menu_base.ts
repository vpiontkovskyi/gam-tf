import { expect, Locator, Page } from "@playwright/test";

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

  async clickNewOrder() {
    await this.buttonNewOrder.click();
  }

  // Asserts

  async verifyOrders() {
    await expect(this.tabOrders).toBeVisible();
  }

  async verifyNewOrder() {
    await expect(this.buttonNewOrder).toBeVisible();
  }

  async verifyMenuLoaded() {
    const isButtonNewOrder = await this.tabOrders
      .waitFor({ timeout: 2000 })
      .then(() => true)
      .catch(() => false);
    const isTabOrders = await this.tabOrders
      .waitFor({ timeout: 2000 })
      .then(() => true)
      .catch(() => false);
    expect(isButtonNewOrder || isTabOrders).toBe(true);
  }
}
