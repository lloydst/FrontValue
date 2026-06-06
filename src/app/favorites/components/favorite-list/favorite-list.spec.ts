import { TestBed } from '@angular/core/testing';

import { FavoriteList } from './favorite-list';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { FavoritesListHarness } from '../../../testing/harnesses/favorite-list.harness';
import { Joke } from '../../../core/models/joke';
import { Favorite } from '../../../core/services/favorite';
import { createFavoriteMock } from '../../../testing/mocks/favorite.mock';

@Component({
    selector: 'cn-host',
    template: ` <cn-favorite-list [jokes]="jokes" /> `,
    imports: [FavoriteList],
})
export class FavoriteListTestComponent {
    jokes: Joke[] = [];
}

describe('FavoriteList', () => {
    async function setupTest(jokes: Joke[] = []) {
        const favoriteMock = createFavoriteMock();

        await TestBed.configureTestingModule({
            imports: [FavoriteListTestComponent],
            providers: [{ provide: Favorite, useValue: favoriteMock }],
        }).compileComponents();

        const fixture = TestBed.createComponent(FavoriteListTestComponent);

        fixture.componentInstance.jokes = jokes;

        fixture.detectChanges();

        const loader = TestbedHarnessEnvironment.loader(fixture);
        const harness = await loader.getHarness(FavoritesListHarness);

        return { fixture, harness };
    }

    it('should have one joke item', async () => {
        const { harness } = await setupTest([
            {
                icon_url: 'https://example.com/icon.png',
                joke: 'Chuck Norris can divide by zero',
                id: '1',
            },
        ]);
        expect(await harness.getItemCount()).toBe(1);
    });

    it('should show empty state', async () => {
        const { harness } = await setupTest([]);

        expect(await harness.getItemCount()).toBe(0);
        expect(await harness.isEmpty()).toBe(true);
    });

    it('should render multiple jokes', async () => {
        const { harness } = await setupTest([
            { icon_url: '1.png', joke: 'Joke 1', id: '1' },
            { icon_url: '2.png', joke: 'Joke 2', id: '2' },
        ]);

        expect(await harness.getItemCount()).toBe(2);
    });

    it('should render correct joke text in items', async () => {
        const { harness } = await setupTest([
            {
                icon_url: 'https://example.com/icon.png',
                joke: 'Chuck Norris can divide by zero',
                id: '1',
            },
            {
                icon_url: 'https://example.com/icon.png',
                joke: 'Peanut Butter has a Chuck Norris allergy...',
                id: '2',
            },
        ]);

        const items = await harness.getItemsHarnesses();
        const joke1 = await items[0].getText();
        const joke2 = await items[1].getText();
        expect(joke1).toBe('Chuck Norris can divide by zero');
        expect(joke2).toBe('Peanut Butter has a Chuck Norris allergy...');
    });
});
