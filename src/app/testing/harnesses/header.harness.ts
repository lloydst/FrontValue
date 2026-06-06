import { ComponentHarness } from '@angular/cdk/testing';

export class HeaderHarness extends ComponentHarness {
    static hostSelector = 'cn-header';

    private getHomeLink = this.locatorFor('a[routerLink="/"]');
    private getFavoritesLink = this.locatorFor('a[routerLink="/favorites"]');

    async clickHome(): Promise<void> {
        const link = await this.getHomeLink();
        await link.click();
    }

    async clickFavorites(): Promise<void> {
        const link = await this.getFavoritesLink();
        await link.click();
    }

    async isHomeActive(): Promise<boolean> {
        const link = await this.getHomeLink();
        return link.hasClass('active-link');
    }

    async isFavoritesActive(): Promise<boolean> {
        const link = await this.getFavoritesLink();
        return link.hasClass('active-link');
    }
}
