import { expect, Locator, Page } from "@playwright/test";
import { getDayPlusNDays, getMonthNumber, isDayInCurrentMonth } from "@helpers/helper_date";
import * as config from "../routs.config";

export class DraftPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators

  private get buttonNext(): Locator {
    return this.page.getByRole("button", { name: /^Next$/ });
  }

  private get buttonSave(): Locator {
    return this.page.getByRole("button", { name: "Save" });
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

  private get buttonSizePlus(): Locator {
    return this.page.locator("nz-form-control").getByRole("button").nth(1);
  }

  private get buttonSizeMinus(): Locator {
    return this.page.locator("nz-form-control").getByRole("button").first();
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

  async navigate(url = config.app_url + config.create_draft_endpoint) {
    if (this.page.url() !== url) await this.page.goto(url);
  }

  async clickNext() {
    await this.buttonNext.click();
  }

  async clickSave() {
    await this.buttonSave.click();
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

  async clickPlusSize() {
    await this.buttonSizePlus.click();
  }

  async clickMinusSize() {
    await this.buttonSizeMinus.click();
  }

  async fillSize(size: string) {
    await this.textboxSize.fill(size);
  }

  async getSize() {
    return this.textboxSize.inputValue();
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

  // Actions

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

  async completeContent(contentType: string) {
    await this.clickDropdownContent();
    await this.clickTextboxContent();
    await this.fillContentType(contentType);
    await this.selectContentType(contentType);
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

  async completeDeadlineDateTime(period: number) {
    const futureDay: number = getDayPlusNDays(period);
    const futureMonth: number = getMonthNumber(period);
    const isNextMonth: boolean = isDayInCurrentMonth(period);
    await this.clickDeadlineDate();
    if (isNextMonth) await this.clickDeadlineNextMonth();
    await this.clickSelectDeadlineDate(futureDay, futureMonth);
    await this.clickDeadlineTime();
  }

  async completeTopic(topicText: string) {
    await this.fillTopic(topicText);
  }

  async completeTheme(theme: string) {
    await this.clickTheme();
    await this.fillTheme(theme);
    await this.selectThemeType(theme);
  }

  async completeRequirements(requirements: string) {
    await this.fillRequirements(requirements);
  }

  async commitDraft(
    contentType: string,
    service: string,
    language: string,
    size: string,
    period: number,
    topicText: string,
    theme: string,
    requirements: string,
    price: string,
  ) {
    await this.navigate();
    await this.completeContent(contentType);
    await this.completeService(service);
    await this.completeLanguage(language);
    await this.completeSize(size);
    await this.clickNext();
    await this.completeDeadlineDateTime(period);
    await this.clickNext();
    await this.completeTopic(topicText);
    await this.clickNext();
    await this.completeTheme(theme);
    await this.clickNext();
    await this.completeRequirements(requirements);
    await this.clickNext();
    await this.verifySummaryContentType(contentType);
    await this.verifySummaryService(service);
    await this.verifySummaryLanguage(language);
    await this.verifySummarySize(size);
    await this.verifySummaryDeadlineDateTime(period);
    await this.verifySummaryTopic(topicText);
    await this.verifySummaryTheme(theme);
    await this.verifySummaryRequirements(requirements);
    await this.verifySummaryPrice(price);
    await this.clickConfirm();
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

  // Clients

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

  private buttonSummaryPrice(price: string): Locator {
    return this.page.getByText(`Estimated price: $${price}`);
  }
}
