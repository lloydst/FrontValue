import { ComponentHarness } from '@angular/cdk/testing';

export class TimerToggleHarness extends ComponentHarness {
    static hostSelector = 'cn-timer-toggle';

    private button = this.locatorFor('button');

    async clickToggle(): Promise<void> {
        await (await this.button()).click();
    }
}
