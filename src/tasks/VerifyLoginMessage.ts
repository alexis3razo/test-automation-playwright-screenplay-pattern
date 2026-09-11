import { Interaction } from '@serenity-js/core';
import { equals, Ensure } from '@serenity-js/assertions';
import { Text } from '@serenity-js/web';
import { LoginElements } from '../ui/LoginElements';

export class VerifyLoginMessage {
    
    static displays(expectedMessage: string): Interaction {
        return Ensure.that(
                Text.of(
                    LoginElements.failureMessage()), equals(expectedMessage)
        );
    }
}