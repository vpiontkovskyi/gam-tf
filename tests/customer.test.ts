import { test } from "@playwright/test";
import { AuthorisePage } from "@pages/page_authorise";
import { OrdersPage } from "@pages/page_orders";
import { DraftPage } from "@pages/page_draft";
import { DepositPage } from "@pages/page_deposit";
import { orderDetails, paymentDetails } from "@enum/user_data";
import * as process from "node:process";
import { getRandomValuesFromDict } from "@helpers/helper_random";
import * as fs from "fs";

let loginPage: AuthorisePage;
let ordersPage: OrdersPage;
let draftPage: DraftPage;
let depositPage: DepositPage;

test.beforeEach(async ({ page }) => {
  loginPage = new AuthorisePage(page);
  ordersPage = new OrdersPage(page);
  draftPage = new DraftPage(page);
  depositPage = new DepositPage(page);
  await loginPage.commitLoginWithEmail(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD);
});

test("Create correct order with failed payment wham delete", async () => {
  // TODO: Move to interfaces
  const cardDetails = getRandomValuesFromDict(paymentDetails) as {
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardHolder: string;
  };

  // TODO: Move to interfaces
  const requirementsDetails = getRandomValuesFromDict(orderDetails) as {
    title: string;
    category: string;
    language: string;
    pages: string;
    deadlineDays: number;
    orderDetails: string;
    taskName: string;
    theme: string;
    requirements: string;
    price: string;
  };

  await ordersPage.openNewOrder();
  await draftPage.commitDraft(
    requirementsDetails.title,
    requirementsDetails.category,
    requirementsDetails.language,
    requirementsDetails.pages,
    requirementsDetails.deadlineDays,
    requirementsDetails.taskName,
    requirementsDetails.theme,
    requirementsDetails.requirements,
    requirementsDetails.price,
  );
  await depositPage.commitDeposit(cardDetails.cardNumber, cardDetails.expiry, cardDetails.cvv, cardDetails.cardHolder);
  await ordersPage.commitDiscardDraft(requirementsDetails.taskName);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    const html = await page.content();
    fs.writeFileSync(`failed-${testInfo.title.replace(/\s+/g, "_")}.html`, html);
  }
});
