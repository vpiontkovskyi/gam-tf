import { expect, Locator, Page } from "@playwright/test";
import config, { routes } from "playwright.config";

import { getDayPlusNDays, getMonthNumber, isDayInCurrentMonth } from "@helpers/helper_date";
import * as interfaces_base from "@interfaces/interfaces_base";

export class DraftPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators

  private get buttonNext(): Locator {
    return this.page.getByRole("button", { name: /^Next$/ });
  }

  private get dropdownContentType(): Locator {
    return this.page.locator("nz-select-top-control");
  }

  private get textboxContentType(): Locator {
    return this.page.getByRole("textbox");
  }

  private get textboxSize(): Locator {
    return this.page.getByRole("textbox");
  }

  private get buttonDeadlineDate(): Locator {
    return this.page.locator("nz-date-picker");
  }

  private get buttonDeadlineNext(): Locator {
    return this.page.getByRole("button", { name: "Next month (PageDown)" });
  }

  private get buttonDeadlineTime(): Locator {
    return this.page.locator("nz-time-picker");
  }

  private get textboxTopic(): Locator {
    return this.page.getByRole("textbox");
  }

  private get textboxTheme(): Locator {
    return this.page.getByRole("textbox");
  }

  private get textboxRequirements(): Locator {
    return this.page
      .locator("div")
      .filter({ hasText: /^\.\.\.$/ })
      .locator("div");
  }

  private get buttonConfirm(): Locator {
    return this.page.getByRole("button", { name: /^Confirm$/ }).nth(1);
  }

  async navigate(url = config.use.baseURL + routes.create_draft_endpoint) {
    if (this.page.url() !== url) await this.page.goto(url);
  }

  async completeService(service: string) {
    await this.buttonService(service).click();
  }

  async completeLanguage(language: string) {
    await this.buttonLanguage(language).click();
  }

  async completeSize(size: string) {
    await this.fillSize(size);
  }

  async completeTopic(topicText: string) {
    await this.fillTopic(topicText);
  }

  async completeRequirements(requirements: string) {
    await this.fillRequirements(requirements);
  }

  private buttonSummaryContentType(contentType: string): Locator {
    return this.page.getByRole("button", { name: `Content type ${contentType}` });
  }

  private buttonSummaryService(service: string): Locator {
    return this.page.getByRole("button", { name: `Service ${service}` });
  }

  private buttonSummaryLanguage(language: string): Locator {
    return this.page.getByRole("button", { name: `Language ${language}` });
  }

  private buttonSummarySize(size: string): Locator {
    return this.page.getByRole("button", { name: `Size ${size} slides` });
  }

  private buttonSummaryDeadline(period: number): Locator {
    return this.page.getByRole("button", { name: RegExp(`Deadline.*\\(In\\s+${period}\\s+days\\)`) });
  }

  private buttonSummaryTopic(topicText: string): Locator {
    return this.page.getByRole("button", { name: `Topic ${topicText}` });
  }

  private buttonSummaryTheme(theme: string): Locator {
    return this.page.getByRole("button", { name: `Theme ${theme}` });
  }

  private buttonSummaryRequirements(requirements: string): Locator {
    return this.page.getByRole("button", { name: `Content requirements ${requirements}` });
  }

  // Actions

  private buttonSummaryPrice(price: string): Locator {
    return this.page.getByText(`Estimated price: $${price}`);
  }

  async clickNext() {
    await this.buttonNext.click();
  }

  async clickDropdownContent() {
    await this.dropdownContentType.click();
  }

  async clickTextboxContent() {
    await this.textboxContentType.click();
  }

  async fillContentType(contentType: string) {
    await this.textboxContentType.fill(contentType);
  }

  async selectContentType(contentType: string) {
    await this.elementContentType(contentType).click();
  }

  async fillSize(size: string) {
    await this.textboxSize.fill(size);
  }

  async clickDeadlineDate() {
    await this.buttonDeadlineDate.click();
  }

  async clickDeadlineNextMonth() {
    await this.buttonDeadlineNext.click();
  }

  async clickSelectDeadlineDate(futureDay: number, futureMonth: number) {
    await this.buttonDeadlineDay(futureDay, futureMonth).click();
  }

  async clickDeadlineTime() {
    await this.buttonDeadlineTime.click();
  }

  async fillTopic(topicText: string) {
    await this.textboxTopic.fill(topicText);
  }

  async clickTheme() {
    await this.textboxTheme.click();
  }

  async fillTheme(theme: string) {
    await this.textboxTheme.fill(theme);
  }

  async selectThemeType(theme: string) {
    await this.elementTheme(theme).click();
  }

  async fillRequirements(requirements: string) {
    await this.textboxRequirements.fill(requirements);
  }

  async clickConfirm() {
    await this.buttonConfirm.click();
  }

  private elementContentType(contentType: string): Locator {
    return this.page.getByTitle(contentType, { exact: true });
  }

  private buttonService(service: string): Locator {
    return this.page.getByText(service, { exact: true });
  }

  private buttonLanguage(language: string): Locator {
    return this.page.locator("label").filter({ hasText: language });
  }

  private buttonDeadlineDay(futureDay: number, futureMonth: number): Locator {
    return this.page.getByTitle(`${futureMonth}/${futureDay}/`).locator("div");
  }

  private elementTheme(theme: string): Locator {
    return this.page.locator("subject-select-not-found div").filter({ hasText: theme }).nth(2);
  }

  // Asserts

  async verifyContentType() {
    await expect(this.textboxContentType).toBeVisible();
  }

  async verifySummaryContentType(contentType: string) {
    await expect(this.buttonSummaryContentType(contentType)).toBeVisible();
  }

  async verifySummaryService(service: string) {
    await expect(this.buttonSummaryService(service)).toBeVisible();
  }

  async verifySummaryLanguage(language: string) {
    await expect(this.buttonSummaryLanguage(language)).toBeVisible();
  }

  async verifySummarySize(size: string) {
    await expect(this.buttonSummarySize(size)).toBeVisible();
  }

  async verifySummaryDeadlineDateTime(period: number) {
    await expect(this.buttonSummaryDeadline(period)).toBeVisible();
  }

  async verifySummaryTopic(topicText: string) {
    await expect(this.buttonSummaryTopic(topicText)).toBeVisible();
  }

  async verifySummaryTheme(theme: string) {
    await expect(this.buttonSummaryTheme(theme)).toBeVisible();
  }

  async verifySummaryRequirements(requirements: string) {
    await expect(this.buttonSummaryRequirements(requirements)).toBeVisible();
  }

  async verifySummaryPrice(price: string) {
    await expect(this.buttonSummaryPrice(price)).toBeVisible();
  }

  // Clients

  async completeContent(contentType: string) {
    await this.clickDropdownContent();
    await this.clickTextboxContent();
    await this.fillContentType(contentType);
    await this.selectContentType(contentType);
  }

  async completeDeadlineDateTime(period: number) {
    const futureDay: number = getDayPlusNDays(period);
    const futureMonth: number = getMonthNumber(period);
    const isNextMonth: boolean = isDayInCurrentMonth(period);
    await this.clickDeadlineDate();
    if (isNextMonth) await this.clickDeadlineNextMonth();
    await this.clickSelectDeadlineDate(futureDay, futureMonth);
    await this.clickDeadlineTime();
  }

  async completeTheme(theme: string) {
    await this.clickTheme();
    await this.fillTheme(theme);
    await this.selectThemeType(theme);
  }

  async commitDraft(draftDetails: interfaces_base.draftDetails) {
    await this.navigate();
    await this.completeContent(draftDetails.contentType);
    await this.completeService(draftDetails.service);
    await this.completeLanguage(draftDetails.language);
    await this.completeSize(draftDetails.size);
    await this.clickNext();
    await this.completeDeadlineDateTime(draftDetails.period);
    await this.clickNext();
    await this.completeTopic(draftDetails.topicText);
    await this.clickNext();
    await this.completeTheme(draftDetails.theme);
    await this.clickNext();
    await this.completeRequirements(draftDetails.requirements);
    await this.clickNext();
    await this.verifySummaryContentType(draftDetails.contentType);
    await this.verifySummaryService(draftDetails.service);
    await this.verifySummaryLanguage(draftDetails.language);
    await this.verifySummarySize(draftDetails.size);
    await this.verifySummaryDeadlineDateTime(draftDetails.period);
    await this.verifySummaryTopic(draftDetails.topicText);
    await this.verifySummaryTheme(draftDetails.theme);
    await this.verifySummaryRequirements(draftDetails.requirements);
    await this.verifySummaryPrice(draftDetails.price);
    await this.clickConfirm();
  }
}
