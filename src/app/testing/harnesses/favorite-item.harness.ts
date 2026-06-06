import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

export class FavoriteItemHarness extends ComponentHarness {
    static hostSelector = 'cn-favorite-item';

    private getImage = this.locatorFor('img');
    private getJoke = this.locatorFor('span');

    private getDeleteButton = this.locatorFor(MatButtonHarness);

    async getImageSrc(): Promise<string | null> {
        const img = await this.getImage();
        return img.getAttribute('src');
    }

    async getText(): Promise<string> {
        const span = await this.getJoke();
        return span.text();
    }

    async clickDelete(): Promise<void> {
        const btn = await this.getDeleteButton();
        await btn.click();
    }
}
