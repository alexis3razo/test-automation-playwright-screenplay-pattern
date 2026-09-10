import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class CartBadge {
  static count() {
    return {
      async answeredBy(actor: Actor): Promise<string> {
        const { page } = actor.abilityTo<BrowseTheWeb>(BrowseTheWeb);
        return (await page.locator('.shopping_cart_badge').textContent()) ?? '0';
      },
    };
  }
}