import { ComponentHarness } from '@angular/cdk/testing';
import { JokeListHarness } from './joke-list.harness';

export class JokePageHarness extends ComponentHarness {
    static hostSelector = 'cn-jokes-page';

    private jokeList = this.locatorForOptional(JokeListHarness);
    private timerToggle = this.locatorForOptional('cn-timer-toggle');

    async hasJokeList(): Promise<boolean> {
        return (await this.jokeList()) !== null;
    }

    async hasTimerToggle(): Promise<boolean> {
        return (await this.timerToggle()) !== null;
    }

    async getJokeList() {
        return this.jokeList();
    }
}
