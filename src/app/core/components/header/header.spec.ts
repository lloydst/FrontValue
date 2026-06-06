import { TestBed } from '@angular/core/testing';
import { Header } from './header';
import { HeaderHarness } from '../../../testing/harnesses/header.harness';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { createFavoriteMock } from '../../../testing/mocks/favorite.mock';
import { Favorite } from '../../services/favorite';

@Component({
    selector: 'cn-host',
    template: ` <cn-header /><router-outlet />`,
    imports: [Header, RouterOutlet],
})
export class HeaderTestComponent {}

@Component({
    template: `<p>Home</p>`,
})
export class HomeTestComponent {}

@Component({
    template: `<p>Favorites</p>`,
})
export class FavoritesTestComponent {}

describe('Header', () => {
    let harness: HeaderHarness;
    let router: Router;
    beforeEach(async () => {
        const favoriteMock = createFavoriteMock();
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [HeaderTestComponent, HomeTestComponent, FavoritesTestComponent],
            providers: [provideRouter(routes), { provide: Favorite, useValue: favoriteMock }],
        }).compileComponents();

        const fixture = TestBed.createComponent(HeaderTestComponent);
        router = TestBed.inject(Router);

        const loader = TestbedHarnessEnvironment.loader(fixture);
        harness = await loader.getHarness(HeaderHarness);

        fixture.detectChanges();
    });

    it('should create header harness', async () => {
        expect(harness).toBeTruthy();
    });

    it('should activate home link when clicked', async () => {
        await harness.clickHome();
        await router.navigateByUrl('/');

        expect(await harness.isHomeActive()).toBe(true);
        expect(await harness.isFavoritesActive()).toBe(false);
    });

    it('should activate favorites link when clicked', async () => {
        await harness.clickFavorites();
        await router.navigateByUrl('/favorites');

        expect(await harness.isFavoritesActive()).toBe(true);
        expect(await harness.isHomeActive()).toBe(false);
    });
});
