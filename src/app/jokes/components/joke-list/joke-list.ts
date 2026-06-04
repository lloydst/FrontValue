import { Component, inject } from '@angular/core';
import { JokeItem } from '../joke-item/joke-item';
import { ChuckNorrisApi } from '../../../core/services/chuck-norris-api';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'cn-joke-list',
  imports: [JokeItem, AsyncPipe],
  templateUrl: './joke-list.html',
  styleUrl: './joke-list.scss',
})
export class JokeList {
  private api = inject(ChuckNorrisApi);
  jokes =Promise.all( Array.from({ length: 10 }, async () => await this.api.fetchJoke()));
}
