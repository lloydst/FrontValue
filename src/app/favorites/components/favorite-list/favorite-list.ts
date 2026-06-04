import { Component, input } from '@angular/core';
import { FavoriteItem } from '../favorite-item/favorite-item';
import { Joke } from '../../../core/models/joke';

@Component({
    selector: 'cn-favorite-list',
    imports: [FavoriteItem],
    templateUrl: './favorite-list.html',
    styleUrl: './favorite-list.scss',
})
export class FavoriteList {
    jokes = input<Joke[]>();
}
