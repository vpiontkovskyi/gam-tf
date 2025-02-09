import { Locator, Page } from "@playwright/test";
import * as interfaces_base from "@interfaces/interfaces_base";

export class DepositPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators

  private get checkboxIAgree(): Locator {
    return this.page.getByRole("checkbox", {
      name: "Yes, I understand and agree",
    });
  }

  private get buttonProceed(): Locator {
    return this.page.getByRole("button", { name: "Proceed" });
  }

  private get textboxCreditCardNumber(): Locator {
    return this.page
      .locator('iframe[name="solid-payment-form-iframe"]')
      .contentFrame()
      .getByRole("textbox", { name: "Credit Card Number" });
  }

  private get textboxExpirationDate(): Locator {
    return this.page
      .locator('iframe[name="solid-payment-form-iframe"]')
      .contentFrame()
      .getByRole("textbox", { name: "Expiration Date" });
  }

  private get textboxCVV(): Locator {
    return this.page
      .locator('iframe[name="solid-payment-form-iframe"]')
      .contentFrame()
      .getByRole("textbox", { name: "CVV" });
  }

  private get textboxFullName(): Locator {
    return this.page
      .locator('iframe[name="solid-payment-form-iframe"]')
      .contentFrame()
      .getByRole("textbox", { name: "Full name as on card" });
  }

  private get buttonProceedIframe(): Locator {
    return this.page.locator('iframe[name="solid-payment-form-iframe"]').contentFrame().getByTestId("submit-button");
  }

  private get messagePaymentFailed(): Locator {
    return this.page.getByText("Payment failed! Transaction");
  }

  private get buttonClose(): Locator {
    return this.page.getByRole("button", { name: "Close" });
  }

  // Actions

  async checkIAgree() {
    await this.checkboxIAgree.check();
  }

  async clickProceed() {
    await this.buttonProceed.click();
  }

  async fillCreditCardNumber(CCNumber: string) {
    await this.textboxCreditCardNumber.fill(CCNumber);
  }

  async fillExDate(exDate: string) {
    await this.textboxExpirationDate.fill(exDate);
  }

  async fillCVV(CVV: string) {
    await this.textboxCVV.fill(CVV);
  }

  async fillFullName(fullName: string) {
    await this.textboxFullName.fill(fullName);
  }

  async clickProceedIframe() {
    await this.buttonProceedIframe.click();
  }

  async clickClose() {
    await this.buttonClose.click();
  }

  // Clients

  async commitDeposit(cardDetails: interfaces_base.cardDetails) {
    await this.checkIAgree();
    await this.clickProceed();
    await this.fillCreditCardNumber(cardDetails.CCNumber);
    await this.fillExDate(cardDetails.exDate);
    await this.fillCVV(cardDetails.CVV);
    await this.fillFullName(cardDetails.fullName);
    await this.clickProceedIframe();
    await this.messagePaymentFailed.isVisible();
    await this.clickClose();
  }
}
