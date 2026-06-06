import { TestBed } from '@angular/core/testing';
import { JokesPage } from './jokes-page';
import { Component } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { JokePageHarness } from '../../testing/harnesses/joke-page.harness';

@Component({
    selector: 'cn-host',
    standalone: true,
    imports: [JokesPage],
    template: `<cn-jokes-page />`,
})
export class JokePageTestComponent {}

describe('JokesPage', () => {
    async function setupTest() {
        await TestBed.configureTestingModule({
            imports: [JokePageTestComponent],
        }).compileComponents();

        const fixture = TestBed.createComponent(JokePageTestComponent);
        fixture.detectChanges();

        const loader = TestbedHarnessEnvironment.loader(fixture);
        const harness = await loader.getHarness(JokePageHarness);

        return { fixture, harness };
    }

    it('should render page', async () => {
        const { harness } = await setupTest();

        expect(harness).toBeTruthy();
    });
});
