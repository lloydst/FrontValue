import { Component, input } from '@angular/core';
import { Joke } from '../../../core/models/joke';

@Component({
  selector: 'cn-joke-item',
  imports: [],
  templateUrl: './joke-item.html',
  styleUrl: './joke-item.scss',
})
export class JokeItem {
  joke = input.required<Joke>()
  addToFavorites() { 
    // to be implemented
  }
}
