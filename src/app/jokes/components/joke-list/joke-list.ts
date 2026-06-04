import { Component } from '@angular/core';
import { JokeItem } from '../joke-item/joke-item';

@Component({
  selector: 'cn-joke-list',
  imports: [JokeItem],
  templateUrl: './joke-list.html',
  styleUrl: './joke-list.scss',
})
export class JokeList {}
