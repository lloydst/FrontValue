import { Component, inject, input, output } from '@angular/core';
import { Joke } from '../../../core/models/joke';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Favorite } from '../../../core/services/favorite';

@Component({
    selector: 'cn-joke-item',
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './joke-item.html',
    styleUrl: './joke-item.scss',
})
export class JokeItem {
    private favorite = inject(Favorite);
    joke = input.required<Joke>();
    jokeDeleted = output<string>();
    addToFavorites() {
        this.favorite.add(this.joke());
        this.jokeDeleted.emit(this.joke().id);
    }
}
