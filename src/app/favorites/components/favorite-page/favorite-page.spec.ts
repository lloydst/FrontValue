import { TestBed } from '@angular/core/testing';

import { FavoritePage } from './favorite-page';
import { createFavoriteMock } from '../../../testing/mocks/favorite.mock';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Favorite } from '../../../core/services/favorite';
import { Component } from '@angular/core';
import { FavoritePageHarness } from '../../../testing/harnesses/favorite-page.harness';
@Component({
    selector: 'cn-host',
    template: ` <cn-favorite-page /> `,
    imports: [FavoritePage],
})
export class FavoritePageTestComponent {}

describe('FavoritePage', () => {
    async function setupTest() {
        const favoriteMock = createFavoriteMock();

        await TestBed.configureTestingModule({
            imports: [FavoritePageTestComponent],
            providers: [{ provide: Favorite, useValue: favoriteMock }],
        }).compileComponents();

        const fixture = TestBed.createComponent(FavoritePageTestComponent);
        fixture.detectChanges();

        const loader = TestbedHarnessEnvironment.loader(fixture);
        const harness = await loader.getHarness(FavoritePageHarness);

        return { fixture, harness, favoriteMock };
    }

    it('should load favorites on init', async () => {
        const { favoriteMock } = await setupTest();

        expect(favoriteMock.getAll).toHaveBeenCalled();
    });

    it('should render favorite items', async () => {
        const { harness, favoriteMock } = await setupTest();

        favoriteMock.emitFavorites([
            {
                icon_url: 'https://example.com/icon.png',
                joke: 'Chuck Norris can divide by zero',
                id: '1',
            },
        ]);

        expect(await harness.getItemCount()).toBe(1);
    });

    it('should show empty state', async () => {
        const { harness, favoriteMock } = await setupTest();

        favoriteMock.emitFavorites([]);

        expect(await harness.getItemCount()).toBe(0);
        expect(await harness.getList().then((l) => l.isEmpty())).toBe(true);
    });

    it('should update when favorites change', async () => {
        const { harness, favoriteMock } = await setupTest();

        favoriteMock.emitFavorites([{ icon_url: '1.png', joke: 'Joke 1', id: '1' }]);

        expect(await harness.getItemCount()).toBe(1);

        favoriteMock.emitFavorites([
            { icon_url: '2.png', joke: 'Joke 2', id: '2' },
            { icon_url: '3.png', joke: 'Joke 3', id: '3' },
        ]);

        expect(await harness.getItemCount()).toBe(2);
    });
});
