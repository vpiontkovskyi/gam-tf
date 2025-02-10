import { test } from "@playwright/test";
import { AuthorisePage } from "@pages/page_authorise";
import { OrdersPage } from "@pages/page_orders";
import { DraftPage } from "@pages/page_draft";
import { DepositPage } from "@pages/page_deposit";
import { cardDetails, draftDetails } from "@enum/user_data";
import * as process from "node:process";

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
  await ordersPage.openNewOrder();
  await draftPage.commitDraft(draftDetails);
  await depositPage.commitDeposit(cardDetails);
  await ordersPage.commitDiscardDraft(draftDetails.topicText);
});
