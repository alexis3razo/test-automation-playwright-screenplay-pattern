import { Actor } from '../actors/Actor';
import { Click } from '../interactions/Click';
import { Fill } from '../interactions/Fill';

export class Login {
  static withCredentials(username: string, password: string) {
    return new Login(username, password);
  }

  private constructor(
    private readonly username: string,
    private readonly password: string
  ) {}

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Fill.field('#user-name', this.username),
      Fill.field('#password', this.password),
      Click.on('#login-button')
    );
  }
}