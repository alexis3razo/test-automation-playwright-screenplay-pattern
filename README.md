# Playwright Screenplay Pattern

This project is a beginner-friendly example of the Screenplay pattern implemented with Playwright and the SauceDemo demo application. It is designed to help you understand how to structure automated tests around actors, abilities, tasks, interactions, and questions instead of relying on page objects alone.

## Why this project exists

The Screenplay pattern encourages expressive test code that reads almost like a business scenario:

- An actor has abilities
- An actor performs tasks
- Tasks are composed of interactions
- Questions ask the system for information
- Assertions validate outcomes in a readable, intention-based way

This makes tests easier to understand, maintain, and extend as your suite grows.

## What is Screenplay?

Screenplay is a user-centered testing pattern often used in BDD-like automation. Instead of writing code that says "click this element and fill that input", you model user behaviour and intent.

A simple mental model is:

- Actor: the person or role performing an action
- Ability: what the actor is able to do in the system
- Task: a meaningful activity the actor performs
- Interaction: the low-level browser action behind the task
- Question: a way to ask the system for information

## Project overview

This repository demonstrates a minimal login flow with SauceDemo:

- A user named Alexis opens the application
- Alexis logs in with valid credentials
- The test verifies that the user is redirected to the inventory page

The project intentionally keeps the implementation small, so it is easier to follow the pattern and learn the concepts.

## Project structure

```text
src/
├── abilities/
│   └── BrowseTheWeb.ts
├── actors/
│   └── Actor.ts
├── interactions/
│   ├── Click.ts
│   └── Fill.ts
├── questions/
│   └── CartBadge.ts
├── tasks/
│   └── Login.ts
├── tests/
│   └── login.spec.ts
├── ui/
├── utils/
├── ...
└──
```

### Main building blocks

#### Actor
The Actor is the entity performing actions. It stores abilities and exposes methods such as `attemptsTo()` and `asks()`.

```ts
const alexis = Actor.named('Alexis').whoCan(BrowseTheWeb.using(page));
```

The actor is not tied to a single page object or selector. It has capabilities and performs meaningful actions.

#### Ability
An ability gives the actor a way to interact with the system. In this project, the ability is `BrowseTheWeb`.

```ts
export class BrowseTheWeb {
  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  constructor(public readonly page: Page) {}
}
```

This wraps Playwright's page object, so the actor can perform browser actions in a controlled and readable way.

#### Task
A task represents a user goal or scenario step, such as logging in.

```ts
export class Login {
  static withCredentials(username: string, password: string) {
    return new Login(username, password);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Fill.field('#user-name', this.username),
      Fill.field('#password', this.password),
      Click.on('#login-button')
    );
  }
}
```

This is a good example of composition: the login task is made from smaller, reusable interactions.

#### Interaction
Interactions are the low-level browser instructions.

```ts
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
```

The same pattern is used for clicking elements.

#### Question
Questions retrieve information from the application and are usually used in assertions.

```ts
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
```

This keeps reading and validation logic separate from the action flow.

## Example test flow

The test in [src/tests/login.spec.ts](src/tests/login.spec.ts) shows the full flow:

```ts
test('un usuario estándar puede iniciar sesión', async ({ page }) => {
  const alexis = Actor.named('Alexis').whoCan(BrowseTheWeb.using(page));

  await page.goto('/');
  await alexis.attemptsTo(Login.withCredentials('standard_user', 'secret_sauce'));

  await expect(page).toHaveURL(/inventory.html/);
});
```

This reads naturally: "Alexis attempts to log in with valid credentials." The implementation is still Playwright under the hood, but the test is expressed from the user's perspective.

## Why this pattern is useful for learning

When you are learning automation, Screenplay helps you organize your tests around intent instead of raw selectors.

It teaches you to think in terms of:

- behaviour
- reusability
- separation of responsibilities
- readable scenarios
- better structure for larger test suites

This project is intentionally simple, but the structure scales very well to real-world apps with many pages, flows, and assertions.

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run the tests

Run all tests:

```bash
npm test
```

Run in headed mode for visual debugging:

```bash
npm run test:headed
```

Debug a test interactively:

```bash
npm run test:debug
```

## Learning tips

If you are new to Screenplay, start by understanding these ideas:

1. Keep actors focused on roles and capabilities.
2. Put browser details inside abilities and interactions.
3. Keep tasks meaningful and scenario-driven.
4. Use questions for data retrieval and assertions.
5. Prefer composing small actions instead of building giant page methods.

## Suggested next steps

As you progress, you can extend this project by adding:

- more tasks such as adding items to the cart or checking out
- more questions such as verifying product names or cart totals
- a dedicated page or UI layer only if it adds clarity
- custom assertion helpers to reduce duplication
- a complete data-driven test suite

## Final note

This project is a clean starting point for learning the Screenplay pattern in Playwright. It is intentionally compact so you can focus on the design model instead of getting lost in framework complexity.

If you want to go further, try building an additional task like `AddItemToCart` or a question like `ProductTitle` and observe how the pattern keeps your tests readable as the application grows.
