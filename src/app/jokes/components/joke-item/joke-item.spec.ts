import { Component } from '@angular/core';
import { JokeItem } from './joke-item';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { JokeItemHarness } from '../../../testing/harnesses/joke-item.harness';
import { Favorite } from '../../../core/services/favorite';
import { createFavoriteMock } from '../../../testing/mocks/favorite.mock';

@Component({
    selector: 'cn-host',
    standalone: true,
    imports: [JokeItem],
    template: ` <cn-joke-item [joke]="joke" (addToFavorites)="onAdd()" /> `,
})
export class JokeItemTestComponent {
    joke = {
        icon_url: 'https://example.com/icon.png',
        joke: 'Chuck Norris can divide by zero',
        id: '1',
    };

    added = false;

    onAdd() {
        this.added = true;
    }
}

describe('JokeItem', () => {
    async function setupTest() {
        const favoriteMock = createFavoriteMock();
        await TestBed.configureTestingModule({
            imports: [JokeItemTestComponent],
            providers: [
                {
                    provide: Favorite,
                    useValue: favoriteMock,
                },
            ],
        }).compileComponents();

        const fixture = TestBed.createComponent(JokeItemTestComponent);
        fixture.detectChanges();

        const loader = TestbedHarnessEnvironment.loader(fixture);
        const harness = await loader.getHarness(JokeItemHarness);

        return { fixture, harness, favoriteMock };
    }

    it('should render joke image', async () => {
        const { harness } = await setupTest();

        expect(await harness.getImageSrc()).toBe('https://example.com/icon.png');
    });

    it('should render joke text', async () => {
        const { harness } = await setupTest();

        expect(await harness.getText()).toBe('Chuck Norris can divide by zero');
    });

    it('should add joke to favorites when clicked', async () => {
        const { harness, favoriteMock } = await setupTest();

        await harness.clickFavorite();

        expect(favoriteMock.add).toHaveBeenCalledWith({
            icon_url: 'https://example.com/icon.png',
            joke: 'Chuck Norris can divide by zero',
            id: '1',
        });
    });
});
