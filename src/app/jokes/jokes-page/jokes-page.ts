import { Component } from '@angular/core';
import { JokeList } from '../components/joke-list/joke-list';

@Component({
    selector: 'cn-jokes-page',
    imports: [JokeList],
    templateUrl: './jokes-page.html',
    styleUrl: './jokes-page.scss',
})
export class JokesPage {}
