import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteItemHarness } from '../../../testing/harnesses/favorite-item.harness';
import { FavoriteItem } from './favorite-item';
import { Favorite } from '../../../core/services/favorite';
import { createFavoriteMock } from '../../../testing/mocks/favorite.mock';

@Component({
    selector: 'cn-host',
    template: ` <cn-favorite-item [joke]="joke" /> `,
    imports: [FavoriteItem],
})
export class FavoriteItemTestComponent {
    joke = {
        icon_url: 'https://example.com/icon.png',
        joke: 'Chuck Norris can divide by zero',
        id: '1',
    };
}

describe('FavoriteItem', () => {
    async function setupTest() {
        const favoriteMock = createFavoriteMock();
        await TestBed.configureTestingModule({
            imports: [MatButtonModule, MatIconModule, FavoriteItemTestComponent],
            providers: [
                {
                    provide: Favorite,
                    useValue: favoriteMock,
                },
            ],
        }).compileComponents();

        const fixture = TestBed.createComponent(FavoriteItemTestComponent);
        fixture.detectChanges();

        const loader = TestbedHarnessEnvironment.loader(fixture);
        const harness = await loader.getHarness(FavoriteItemHarness);

        return { fixture, harness, favoriteMock };
    }

    it('should render joke image', async () => {
        const { harness } = await setupTest();
        const src = await harness.getImageSrc();
        expect(src).toBe('https://example.com/icon.png');
    });

    it('should render joke text', async () => {
        const { harness } = await setupTest();
        const text = await harness.getText();
        expect(text).toBe('Chuck Norris can divide by zero');
    });

    it('should trigger removeFromFavorites', async () => {
        const { harness, favoriteMock } = await setupTest();

        await harness.clickDelete();

        expect(favoriteMock.remove).toHaveBeenCalledWith('1');
    });
});
