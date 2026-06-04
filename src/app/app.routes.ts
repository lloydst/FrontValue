import { Routes } from '@angular/router';
import { JokesPage } from './jokes/jokes-page/jokes-page';
import { FavoritePage } from './favorites/components/favorite-page/favorite-page';

export const routes: Routes = [
    { path: '', component: JokesPage },
    { path: 'favorites', component: FavoritePage },
];
