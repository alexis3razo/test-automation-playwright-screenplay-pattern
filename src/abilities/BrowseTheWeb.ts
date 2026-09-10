import { Page } from '@playwright/test';

export class BrowseTheWeb {
  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  constructor(public readonly page: Page) {}
}