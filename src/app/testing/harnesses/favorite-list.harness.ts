import { ComponentHarness } from '@angular/cdk/testing';
import { FavoriteItemHarness } from './favorite-item.harness';

export class FavoritesListHarness extends ComponentHarness {
    static hostSelector = 'cn-favorite-list';

    private getItems = this.locatorForAll(FavoriteItemHarness);

    private getEmptyState = this.locatorForOptional('p');

    async getItemCount(): Promise<number> {
        const items = await this.getItems();
        return items.length;
    }

    async getItemsHarnesses(): Promise<FavoriteItemHarness[]> {
        return this.getItems();
    }

    async isEmpty(): Promise<boolean> {
        const empty = await this.getEmptyState();
        return empty !== null;
    }

    async getEmptyText(): Promise<string | null> {
        const el = await this.getEmptyState();
        return el ? el.text() : null;
    }
}
