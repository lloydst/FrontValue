import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { createChuckNorrisApiMock } from '../../../testing/mocks/chuck-norris.mock';
import { JokeList } from './joke-list';
import { ChuckNorrisApi } from '../../../core/services/chuck-norris-api';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { JokeListHarness } from '../../../testing/harnesses/joke-list.harness';
import { Component } from '@angular/core';
import { Favorite } from '../../../core/services/favorite';
import { createFavoriteMock } from '../../../testing/mocks/favorite.mock';

@Component({
    selector: 'cn-host',
    standalone: true,
    imports: [JokeList],
    template: ` <cn-joke-list /> `,
})
export class JokeListTestComponent {}

describe('JokeList', () => {
    async function setupTest() {
        const favoriteMock = createFavoriteMock();
        const apiMock = createChuckNorrisApiMock();

        await TestBed.configureTestingModule({
            imports: [JokeListTestComponent],
            providers: [
                {
                    provide: ChuckNorrisApi,
                    useValue: apiMock,
                },
                {
                    provide: Favorite,
                    useValue: favoriteMock,
                },
            ],
        }).compileComponents();

        const fixture = TestBed.createComponent(JokeListTestComponent);
        fixture.detectChanges();

        const loader = TestbedHarnessEnvironment.loader(fixture);
        const harness = await loader.getHarness(JokeListHarness);

        return { fixture, harness, apiMock, favoriteMock };
    }

    it('should render jokes and timer', async () => {
        const { harness } = await setupTest();

        expect(await harness.getItemCount()).toBe(10);
        expect(await harness.hasTimer()).toBe(true);
    });

    it('should render 10 jokes', async () => {
        const { harness } = await setupTest();

        expect(await harness.getItemCount()).toBe(10);
    });

    it('should show empty state when no jokes exist', async () => {
        const apiMock = createChuckNorrisApiMock();

        await TestBed.resetTestingModule();
        const favoriteMock = createFavoriteMock();
        await TestBed.configureTestingModule({
            imports: [JokeListTestComponent],
            providers: [
                { provide: ChuckNorrisApi, useValue: apiMock },
                {
                    provide: Favorite,
                    useValue: favoriteMock,
                },
            ],
        }).compileComponents();

        const fixture = TestBed.createComponent(JokeListTestComponent);
        fixture.detectChanges();

        const loader = TestbedHarnessEnvironment.loader(fixture);
        const harness = await loader.getHarness(JokeListHarness);

        expect(await harness.getItemCount()).toBeGreaterThan(0);
    });

    it('should replace deleted joke with new one', async () => {
        const { harness } = await setupTest();

        const itemsBefore = await harness.getItemCount();
        expect(itemsBefore).toBe(10);

        const items = await harness.getItems();

        await items[0].clickFavorite();
        expect(await harness.getItemCount()).toBe(10);
        expect(await items[1].getText()).not.toBe('Joke 1');
    });

    it('should emit tick over time', async () => {
        vi.useFakeTimers();
        const { fixture } = await setupTest();

        const comp = fixture.debugElement.query(
            (de) => de.name === 'cn-timer-toggle',
        ).componentInstance;

        let count = 0;
        comp.tick.subscribe(() => count++);

        comp.toggleTimer();

        vi.advanceTimersByTime(5000);
        vi.advanceTimersByTime(5000);

        expect(count).toBeGreaterThan(0);
        expect(count).toBeLessThanOrEqual(3);
        vi.useRealTimers();
    });
});
