import { ComponentHarness } from '@angular/cdk/testing';

export class JokeItemHarness extends ComponentHarness {
    static hostSelector = 'cn-joke-item';

    private getImage = this.locatorFor('img');
    private _getText = this.locatorFor('span');
    private getButton = this.locatorFor('button');

    async getImageSrc(): Promise<string | null> {
        const img = await this.getImage();
        return img.getAttribute('src');
    }

    async getText(): Promise<string> {
        const span = await this._getText();
        return span.text();
    }

    async clickFavorite(): Promise<void> {
        const btn = await this.getButton();
        await btn.click();
    }
}
