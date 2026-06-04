import { Component, inject, input } from '@angular/core';
import { Joke } from '../../../core/models/joke';
import { Favorite } from '../../../core/services/favorite';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'cn-favorite-item',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './favorite-item.html',
    styleUrl: './favorite-item.scss',
})
export class FavoriteItem {
    joke = input.required<Joke>();
    private favorite = inject(Favorite);

    removeFromFavorites() {
        this.favorite.remove(this.joke().id);
    }
}
