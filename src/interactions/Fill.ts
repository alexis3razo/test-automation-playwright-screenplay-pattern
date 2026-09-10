import { Actor } from '../actors/Actor';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

export class Fill {
  static field(selector: string, value: string) {
    return {
      async performAs(actor: Actor): Promise<void> {
        const { page } = actor.abilityTo<BrowseTheWeb>(BrowseTheWeb);
        await page.locator(selector).fill(value);
      },
    };
  }
}