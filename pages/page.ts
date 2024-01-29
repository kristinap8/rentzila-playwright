import { Page as PlaywrightPage } from 'playwright';
import { Locator, Dialog } from '@playwright/test';

export default class Page {
  public page: PlaywrightPage;

  /** 
   * @param {PlaywrightPage} page 
   */
  constructor(page: PlaywrightPage) {
    this.page = page;
  }

  async openUrl() {
    await this.page.goto('/', { waitUntil: 'load' });
  }

  async getElement(locator: string) {
    return this.page.locator(locator);
  }

  async getElementByText(text: string) {
    return this.page.getByText(text, { exact: true });
  }

  async getElementByLocatorAndText(locator: string, text: string, exact: boolean = true) {
    return (await this.getElement(locator)).getByText(text, { exact: exact });
  }

  async clickElementByLocatorAndText(locator: string, text: string, exact: boolean = true) {
    (await this.getElementByLocatorAndText(locator, text, exact)).click();
  }

  async getElementByIndex(locator: string, index: number) {
    return this.page.locator(locator).nth(index);
  }

  async getElementsArray(locator: string) {
    return this.page.locator(locator).all();
  }

  async getElementText(locator: string) {
    return this.page.locator(locator).textContent();
  }

  async clickElement(locator: string) {
    await (await this.getElement(locator)).click();
  }

  async clickElementByIndex(locator: string, index: number) {
    await (await this.getElementByIndex(locator, index)).click();
  }

  async pressEnter() {
    await this.page.keyboard.press('Enter');
  }

  async scrollToElement(locator: string) {
    await (await this.getElement(locator)).scrollIntoViewIfNeeded();
  }

  async pause(miliseconds: number) {
    await this.page.waitForTimeout(miliseconds);
  }

  async fillElement(locator: string, text: string) {
    await this.page.fill(locator, text);
  }

  async hoverElementByIndex(locator: string, ind: number) {
    await (await this.getElementByIndex(locator, ind)).hover();
  }

  async refresh() {
    await this.page.reload();
  }
}
