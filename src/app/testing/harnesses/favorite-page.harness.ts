import { ComponentHarness } from '@angular/cdk/testing';
import { FavoritesListHarness } from './favorite-list.harness';

export class FavoritePageHarness extends ComponentHarness {
    static hostSelector = 'cn-favorite-page';

    private list = this.locatorFor(FavoritesListHarness);

    async getList() {
        return this.list();
    }

    async getItemCount() {
        const list = await this.list();
        return list.getItemCount();
    }
}
