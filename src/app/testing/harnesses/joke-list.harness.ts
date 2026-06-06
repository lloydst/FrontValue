import { ComponentHarness } from '@angular/cdk/testing';
import { JokeItemHarness } from './joke-item.harness';

export class JokeListHarness extends ComponentHarness {
    static hostSelector = 'cn-joke-list';

    private items = this.locatorForAll(JokeItemHarness);
    private emptyState = this.locatorForOptional('p');

    async getItemCount(): Promise<number> {
        return (await this.items()).length;
    }

    async getItems(): Promise<JokeItemHarness[]> {
        return this.items();
    }

    async isEmpty(): Promise<boolean> {
        return (await this.emptyState()) !== null;
    }

    async getEmptyText(): Promise<string | null> {
        const el = await this.emptyState();
        return el ? el.text() : null;
    }

    async deleteFirst(): Promise<void> {
        const items = await this.items();
        await items[0].clickFavorite(); // or click delete if you have it
    }
}
