import { Component, inject } from '@angular/core';
import { FavoriteList } from '../favorite-list/favorite-list';
import { Favorite } from '../../../core/services/favorite';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'cn-favorite-page',
    imports: [FavoriteList, AsyncPipe],
    templateUrl: './favorite-page.html',
    styleUrl: './favorite-page.scss',
})
export class FavoritePage {
    favorite = inject(Favorite);
    jokes = this.favorite.favorites$;
    constructor() {
        this.favorite
            .getAll()
            .then((jokes) => {
                return jokes;
            })
            .catch((error) => {
                console.error('Error fetching favorites on page load:', error);
            });
    }
}
