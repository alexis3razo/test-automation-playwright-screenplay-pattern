export class Actor {
  private abilities = new Map<string, any>();

  static named(name: string): Actor {
    return new Actor(name);
  }

  private constructor(public readonly name: string) {}

  whoCan(...abilities: any[]): Actor {
    abilities.forEach(a => this.abilities.set(a.constructor.name, a));
    return this;
  }

  abilityTo<T>(abilityClass: { name: string }): T {
    return this.abilities.get(abilityClass.name);
  }

  async attemptsTo(...tasks: { performAs(actor: Actor): Promise<void> }[]): Promise<void> {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }

  async asks<T>(question: { answeredBy(actor: Actor): Promise<T> }): Promise<T> {
    return question.answeredBy(this);
  }
}