import { PageElement, By } from '@serenity-js/web';

export class LoginElements {
    static failureMessage = () => 
        PageElement.located(By.role('alert')).describedAs('Failure message');
}