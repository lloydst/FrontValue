import { Component } from '@angular/core';
import { FavoriteItem } from '../favorite-item/favorite-item';

@Component({
  selector: 'cn-favorite-list',
  imports: [FavoriteItem],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss',
})
export class FavoriteList {}
