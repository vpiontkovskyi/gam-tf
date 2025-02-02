import { expect, Locator, Page } from "@playwright/test";
import { MenuBasePage } from "@pages/page_menu_base";
import { DraftPage } from "@pages/page_draft";
import * as config from "../routs.config";

export class OrdersPage extends MenuBasePage {
  public page: Page;
  private draftPage: DraftPage;
  private menuBasePage: MenuBasePage;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.draftPage = new DraftPage(page);
    this.menuBasePage = new MenuBasePage(page);
  }

  // Locators

  private get tabOrdersActive(): Locator {
    return this.page.getByRole("link", { name: "Active" });
  }

  private get tabOrdersDrafts(): Locator {
    return this.page.getByRole("link", { name: "Drafts" });
  }

  private get tabOrdersClosed(): Locator {
    return this.page.getByRole("link", { name: "Closed" });
  }

  private get buttonOrderCardMenuDiscard(): Locator {
    return this.page.getByText("Discard draft");
  }

  private get blockDontHaveOrders(): Locator {
    return this.page.getByText("You have no Active Orders Place order");
  }

  private get buttonDiscardDraftPopupCancel(): Locator {
    return this.page.getByRole("button", { name: "Cancel" });
  }

  private get buttonDiscardDraftPopupDelete(): Locator {
    return this.page.getByRole("button", { name: "Delete" });
  }

  async navigate(url = config.app_url + config.orders_endpoint) {
    if (this.page.url() !== url) {
      // FIXME: remove timeout
      await this.page.waitForTimeout(1000);
      await this.page.goto(url);
      await this.menuBasePage.verifyOrders();
      await this.menuBasePage.verifyNewOrder();
    }
  }

  async clickOrdersActive() {
    await this.tabOrdersActive.click();
  }

  // Actions

  async clickOrdersDrafts() {
    await this.tabOrdersDrafts.click();
  }

  async clickOrdersClosed() {
    await this.tabOrdersClosed.click();
  }

  async clickOrderCard(topic: string) {
    await this.panelOrderCard(topic).click();
  }

  async hoverOrderCardMenu(topic: string) {
    await this.panelOrderCardMenu(topic).hover();
  }

  async clickOrderCardMenuDiscard() {
    await this.buttonOrderCardMenuDiscard.click();
  }

  async clickDiscardDraftPopupCancel() {
    await this.buttonDiscardDraftPopupCancel.click();
  }

  async clickDiscardDraftPopupDelete() {
    await this.buttonDiscardDraftPopupDelete.click();
  }

  async verifyDontHaveOrdersPanel() {
    await expect(this.blockDontHaveOrders).toBeVisible();
  }

  async verifyOrderPanel(topic: string) {
    await expect(this.panelOrderCard(topic)).toBeVisible();
  }

  async verifyOrderCardMenuDiscard() {
    await expect(this.buttonOrderCardMenuDiscard).toBeVisible();
  }

  async verifyDiscardDraftPopupCancel() {
    await expect(this.buttonDiscardDraftPopupCancel).toBeVisible();
  }

  async verifyDiscardDraftPopupDelete() {
    await expect(this.buttonDiscardDraftPopupDelete).toBeVisible();
  }

  async openNewOrder() {
    await this.navigate();
    await this.verifyOrders();
    await this.verifyNewOrder();
    await this.clickNewOrder();
    await this.draftPage.verifyContentType();
  }

  async navigateToActive(topic: string) {
    await this.navigate();
    await this.verifyOrders();
    await this.verifyNewOrder();
    await this.clickOrdersActive();

    // TODO: Make this simple
    let is_loaded: boolean = false;
    try {
      await this.verifyDontHaveOrdersPanel();
      is_loaded = true;
    } catch (e) {}
    try {
      await this.verifyOrderPanel(topic);
      is_loaded = true;
    } finally {
      expect(is_loaded).toBe(true);
    }
  }

  // Clients

  async navigateToDrafts(topic: string) {
    await this.navigate();
    await this.verifyOrders();
    await this.verifyNewOrder();
    await this.clickOrdersDrafts();

    // TODO: Make this simple
    let is_loaded: boolean = false;
    try {
      await this.verifyDontHaveOrdersPanel();
      is_loaded = true;
    } catch (e) {}
    try {
      await this.verifyOrderPanel(topic);
      is_loaded = true;
    } finally {
      expect(is_loaded).toBe(true);
    }
  }

  async navigateToClosed(topic: string) {
    await this.navigate();
    await this.verifyOrders();
    await this.verifyNewOrder();
    await this.clickOrdersClosed();

    // TODO: Make this simple
    let is_loaded: boolean = false;
    try {
      await this.verifyDontHaveOrdersPanel();
      is_loaded = true;
    } catch (e) {}
    try {
      await this.verifyOrderPanel(topic);
      is_loaded = true;
    } finally {
      expect(is_loaded).toBe(true);
    }
  }

  async commitDiscardDraft(topic: string) {
    await this.navigateToDrafts(topic);
    await this.hoverOrderCardMenu(topic);
    await this.verifyOrderCardMenuDiscard();
    await this.clickOrderCardMenuDiscard();
    await this.verifyDiscardDraftPopupCancel();
    await this.verifyDiscardDraftPopupDelete();
    await this.clickDiscardDraftPopupDelete();
  }

  private panelOrderCard(topic: string): Locator {
    return this.page.getByRole("link", { name: topic });
  }

  // Clients

  private panelOrderCardMenu(topic: string): Locator {
    return this.page.getByRole("link", { name: topic }).getByRole("button");
  }
}
