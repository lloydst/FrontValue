import { Component } from '@angular/core';
import { FavoriteList } from '../favorite-list/favorite-list';

@Component({
  selector: 'cn-favorite-page',
  imports: [FavoriteList],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.scss',
})
export class FavoritePage {}
