import { Component, computed, input } from '@angular/core';
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
    sortedJokes = computed(() => {
        const jokesArray = this.jokes();
        return jokesArray
            ? [...jokesArray].sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
            : [];
    });
}
